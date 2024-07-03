const _ = require("lodash");

/**
 * Util for verifying the questions generated
 * @param {object[]} questions 
 * @returns object
 */
function verify(questions) {
  const questionsByDifficulty = _.groupBy(questions, "difficulty");
  
  const result = {}

  Object.keys(questionsByDifficulty).forEach(element => {
    result[element] = {
        totalQuestions: 0,
        marks: 0,
        marksArray: [],
    }
  })

  Object.entries(questionsByDifficulty).forEach(
    ([difficulty, questions]) => {
        result[difficulty].totalQuestions = questions.length;
        result[difficulty].marks = questions.reduce((acc, q) => acc + q.marks, 0);
        result[difficulty].marksArray = questions.map((q) => q.marks);
    }
  );

  return result;
}

exports.verify = verify;
