const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/save/user", function (request, response) {
  const fileContent = JSON.stringify(request.body);
  console.log(fileContent);
  console.log(request.body);
  // response.status(201);
  // response.send("Thank you for using my server! 🤖");

  writeData("./myFile.txt", fileContent)
    .then(() => {
      response.status(200);
      response.send("This is my text");
      // console.log("Form data:", formData);
      console.log("File successully appended");
    })
    .catch(() => {
      response.status(500);
      response.send("Sorry unable to precess request");
      console.log("Wait ... we got a problem");
    });
});

app.get("/read/user", function (request, response) {
  readData("./myFile.txt")
    .then((data) => {
      response.status(200);
      response.send(data);
      console.log("Response from the server:");
    })
    .catch(() => {
      response.status(500);
      response.send("Sorry, unable to process request");
    });
});

app.listen(3000);

function writeData(filename, data) {
  return new Promise((resolve, reject) => {
    fs.appendFile(filename, data, (error) => {
      resolve();
      if (error) {
        reject(error);
      }
    });
  });
}

function readData(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, "utf-8", (error, data) => {
      resolve(data);
      if (error) {
        reject(error);
      }
    });
  });
}