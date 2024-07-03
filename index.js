const papergen = require("./controllers/papergen");
const pdfgen = require("./utils/pdfgen");
const questionsverif = require("./utils/questionsverif");

/**
 * [totalMarks, distribution, distributionBy]
 * @param {number} totalMarks (optional)
 * @param {object} distribution (optional)
 * @param {"difficulty" | "subject" | "topic"} distributionBy (optional)
 */
const params = [100, { easy: 20, medium: 50, hard: 30 }, "difficulty"]
// const params = [150, { easy: 20, medium: 50, hard: 30 }, "difficulty"]
// const params = [100, { Science: 40, "General Knowledge": 60 }, "subject"]

const paperObj = {
  paper: papergen.generate(...params)
};

pdfgen.generatePDF(paperObj.paper, params[2] || "difficulty");

Object.entries(questionsverif.verify(paperObj.paper, params[2] || "difficulty")).map((questions, i) => {
  console.log(
    `Difficulty: ${questions[0]}, Total Questions: ${questions[1].totalQuestions}`
  );
  console.log(
    `Total Marks: ${questions[1].marks}, Marks Array: ${questions[1].marksArray}`
  );
});

console.log(
  `\nTotal Marks: ${paperObj.paper.reduce((acc, q) => acc + q.marks, 0)}`
);

console.log("\nQuestion Paper JSON and PDF generated!");
