const questionsJSON = require("../data/questions.json");
const _ = require("lodash");

/**
 * Finds questions whose sum of marks is equal to target marks
 *
 * (Hashmap way to find subarray with a given sum)
 * @param {object[]} questions
 * @param {number} marks
 * @returns
 */
function subQuestions(questions, marks) {
  let cur_sum = 0;
  let start = 0;
  let end = -1;
  let hashMap = new Map();

  for (let i = 0; i < questions.length; i++) {
    cur_sum += questions[i].marks;
    if (cur_sum === marks) {
      start = 0;
      end = i;
      break;
    }

    if (hashMap.has(cur_sum - marks)) {
      start = hashMap.get(cur_sum - marks) + 1;
      end = i;
      break;
    }

    hashMap.set(cur_sum, i);
  }

  if (end === -1) {
    return [];
  } else {
    return questions.slice(start, end + 1);
  }
}

/**
 * Generate questions for the paper with a given distribution
 * @param {number} totalMarks
 * @param {object} difficultyDistribution
 * @returns {object[]} finalQuestions
 */
function generate(
  totalMarks = 100,
  difficultyDistribution = { Easy: 20, Medium: 50, Hard: 30 }
) {
  const questions = questionsJSON.questions;
  const easyQuestions = _.filter(questions, { difficulty: "easy" });
  const mediumQuestions = _.filter(questions, { difficulty: "medium" });
  const hardQuestions = _.filter(questions, { difficulty: "hard" });

  const finalQuestions = [];
  return finalQuestions.concat(
    subQuestions(
      easyQuestions,
      (totalMarks * difficultyDistribution.Easy) / 100
    ),
    subQuestions(
      mediumQuestions,
      (totalMarks * difficultyDistribution.Medium) / 100
    ),
    subQuestions(
      hardQuestions,
      (totalMarks * difficultyDistribution.Hard) / 100
    )
  );
}
exports.generate = generate;
