const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

const app = express();
const PythonShell = require("python-shell").PythonShell;

// enable files upload
app.use(
  fileUpload({
    createParentPath: true,
  })
);

//add other middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", async (req, res) => {
  try {
    if (!req.files) {
      console.log("No file uploaded");
      res.send({ status: false, message: "No file uploaded" });
    } else {
      if (req.files.captcha) {
        const captcha = req.files.captcha;
        captcha.mv("uploads/captcha.jpg");
        PythonShell.run("captcha.py", null, function (err, results) {
          if (err) {
            console.log(err);
            res.send({ status: false, message: "Solving failed" });
          } else {
            const response = { status: true, message: results[0] };
            console.log(response);
            res.send(response);
          }
        });
      } else {
        const response = { status: false, message: "Upload file key should be captcha" };
        console.log(response);
        res.send(response);
      }
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

//start app
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Captcha APP listening on http://localhost:${port}`));
