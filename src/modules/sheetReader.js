import sheetProcessor from "./sheetProcessor.js";

const sheetReader = (options, callback) => {
  sheetProcessor(options, results => {
    callback(results);
  });
};

export default sheetReader;
