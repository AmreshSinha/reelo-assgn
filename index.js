const papergen = require("./controllers/papergen");
const pdfgen = require("./utils/pdfgen");
const questionsverif = require("./utils/questionsverif");

const paperObj = {
  // generate() params ->
  // totalMarks: number,
  // difficultyDistribution: { Easy: number, Medium: number, Hard: number },
  // takes in default value if params not passed
  paper: papergen.generate(),
  // paper: papergen.generate(200, { Easy: 20, Medium: 50, Hard: 30 }),
};

pdfgen.generatePDF(paperObj.paper);

Object.entries(questionsverif.verify(paperObj.paper)).map((questions, i) => {
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
