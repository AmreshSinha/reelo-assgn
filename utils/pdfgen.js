const PDFDocument = require("pdfkit");
const _ = require("lodash");
const fs = require("fs");
const path = require("path");

/**
 * Generates PDF from questions, groups by difficulty from easy to hard
 * @param {object[]} questions
 */
function generatePDF(questions, distributionBy = "difficulty") {
  const doc = new PDFDocument();
  doc.pipe(
    fs.createWriteStream(path.join(__dirname, "..", "QuestionPaper.pdf"))
  );
  doc.fontSize(25).text("Question Paper", {
    align: "center",
  });

  doc.moveDown();

  const groupedPaper = _.groupBy(questions, distributionBy);
  const distributionByKeys = Object.keys(groupedPaper);

  distributionByKeys.forEach((difficulty) => {
    doc.moveDown();
    doc.fontSize(20).text(difficulty, {
      align: "center",
    });
    doc.moveDown();

    groupedPaper[difficulty].forEach((question, index) => {
      doc
        .fontSize(15)
        .text(`${index + 1}. ${question.question} (${question.marks})`, {
          align: "left",
        });
      doc.moveDown();
    });
  });

  doc.end();
}

exports.generatePDF = generatePDF;
