# Reelo Assignment

A node.js application to generate Question Paper

- Sample seed data is already generated and the code to genereate it is inside seed folder (no need to run as already generated)
- Sample seed data location: `./data/questions.json`, total questions: `180`, easy: 60, medium: 60, hard: 60
- Controller for generating question paper json: `./controllers/papergen.js`, returns an object with questions array inside it
  - Hashmap is being used to fit the number of questions according to the target marks for that difficulty similar to "Find a subarray whose sum is equal to a certain input value"
- To generate Paper PDF pdfgen has been added: `./utils/pdfgen.js`

## Extra deps used

- `lodash`: For utility functions like groupby, orderby, sort, etc
- `pdfkit`: For generating PDF

## Usage Instructions

- Install yarn: `npm i -g yarn`
- Install dependecies: `yarn`
- Generate Paper: `yarn generate`
- To generate for a new total Marks and difficulty distribution add the params in `generate()` function in `./index.js` file and rerun the generate command

## Output
- Question Paper PDF: `./QuestionPaper.pdf`
- Question Paper JSON: `./paper.json`