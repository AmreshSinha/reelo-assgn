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
 * @param {object} distribution
 * @param {"difficulty" | "subject" | "topic"} distributionBy
 * @returns {object[]} finalQuestions
 */
function generate(
  totalMarks = 100,
  distribution = { easy: 20, medium: 50, hard: 30 },
  distributionBy = "difficulty"
) {
  const questions = questionsJSON.questions;

  const questionsByDistribution = _.groupBy(questions, distributionBy);
  const finalQuestions = [];
  Object.entries(questionsByDistribution).forEach(([key, value]) => {
    const subQuestionsArray = subQuestions(
      value,
      (totalMarks * distribution[key]) / 100
    );
    finalQuestions.push(...subQuestionsArray);
  });

  return finalQuestions;
}
exports.generate = generate;
