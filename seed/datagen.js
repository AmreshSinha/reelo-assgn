const fs = require("fs");
const path = require("path");

/**
 * 30 Easy, 30 Medium and 30 Hard questions each of
 * Science: Computer & General Knowledge
 * totalling the total set to 180 questions (60 easy, 60 medium, 60 hard)
 */
const apiUrls = [
  "https://opentdb.com/api.php?amount=30&category=18&difficulty=easy",
  "https://opentdb.com/api.php?amount=30&category=18&difficulty=medium",
  "https://opentdb.com/api.php?amount=30&category=18&difficulty=hard",
  "https://opentdb.com/api.php?amount=30&category=9&difficulty=easy",
  "https://opentdb.com/api.php?amount=30&category=9&difficulty=medium",
  "https://opentdb.com/api.php?amount=30&category=9&difficulty=hard",
];

/**
 * Get Random Number between min and max (both inclusive)
 * @param {number} min Lower bound of the range
 * @param {number} max Upper bound of the range
 * @returns number
 */
function genRandIncl(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Used for creating delay during API calls to avoid rate limiting
 * @param {number} ms
 * @returns
 */
const delay = (ms = 5500) => new Promise((r) => setTimeout(r, ms));

/**
 * Fetch calls in a loop over the url array provided with a delay
 * @param {string[]} items
 * @returns
 */
const getData = async (items) => {
  let results = [];
  for (let index = 0; index < items.length; index++) {
    await delay();
    const res = await fetch(items[index]);
    console.log("fetched " + items[index]);
    const data = await res.json();

    results = results.concat(data.results);
  }
  return results;
};

/**
 * Seed data generator function
 * @returns Promise
 */
async function datagen() {
  const data = await getData(apiUrls);

  const quesArr = data.map((ques, index) => {
    return {
      id: index,
      question: ques.question,
      subject: ques.category.includes(":")
        ? ques.category.split(":")[0]
        : ques.category,
      topic: ques.category.includes(":")
        ? ques.category.split(":")[1].slice(1)
        : "Miscellaneous",
      difficulty: ques.difficulty,
      marks:
        ques.difficulty === "easy"
          ? genRandIncl(1, 3)
          : ques.difficulty === "medium"
          ? genRandIncl(4, 6)
          : genRandIncl(7, 10),
    };
  });
  return quesArr;
}

datagen().then((data) => {
  var questionsObj = {
    questions: data,
  };

  fs.writeFile(
    path.join(__dirname, "..", "data", "questions.json"),
    JSON.stringify(questionsObj),
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("File has been created");
    }
  );
});
