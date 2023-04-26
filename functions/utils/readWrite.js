const fs = require("fs");

exports.readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject(`I could not find that file 🥲`);
      resolve(data);
    });
  });
};

exports.writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Could not write file 🥲");
      resolve("Success");
    });
  });
};
