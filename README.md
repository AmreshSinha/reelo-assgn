# Reelo Assignment

A node.js application to generate Question Paper

## Features
- Efforts have been made to ensure modularity and adherence to good conventions.
- Extensible generator with support has beed added. For instance, `distributionBy` can take `subject`, `topic` and `difficulty`. Correspondingly the distribution needs to be changed. Examples have been added inside `index.js`.
- Default params: `[100, { easy: 20, medium: 50, hard: 30 }, "difficulty"]`
- Generates Question Paper PDF as well as JSON for integrating into an API if needed
  - PDF generator util: `./utils/pdfgen.js`
- Sample seed data is already generated and the code to generate it is inside `./seed` folder (no need to run as it's already generated). `opentdb` API has been used.
  - Sample seed data location: `./data/questions.json`
  - Total questions: `180`
  - easy: 60, medium: 60, hard: 60
  - Subject: `Science` and `General Knowledge`
  - Topic: `Computers` and `Miscellaneous`
- Question Paper generator Controller: `./controllers/papergen.js`, returns an object with questions array inside it
- Hashmap is being used to fit the number of questions according to the target marks for that difficulty similar to "Find a subarray whose sum is equal to a certain input value" problem

## Extra deps used

- `lodash`: For utility functions like groupby, orderby, sort, etc
- `pdfkit`: For generating PDF

## Usage Instructions

- Install yarn: `npm i -g yarn`
- Install dependecies: `yarn`
- Generate Paper: `yarn generate`
- To generate for a new total Marks and difficulty distribution add the params in `generate()` function in `./index.js` file and rerun the generate command. Examples have beend added below the `params` var initialisation.
  ```javascript
    ...
     * @param {"difficulty" | "subject" | "topic"} distributionBy (optional)
     */
    const params = [100, { easy: 20, medium: 50, hard: 30 }, "difficulty"]
    // const params = [150, { easy: 20, medium: 50, hard: 30 }, "difficulty"]
    // const params = [100, { Science: 40, "General Knowledge": 60 }, "subject"]
    ...
  };
  ```

## Output

- Question Paper PDF: `./QuestionPaper.pdf`
- Question Paper JSON: `./paper.json`
