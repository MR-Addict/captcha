const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

const app = express();
const PythonShell = require("python-shell").PythonShell;

// enable files upload
app.use(
  fileUpload({
    createParentPath: true,
    limits: { fileSize: 5 * 1024 * 1024 },
    abortOnLimit: true,
  })
);

//add other middleware
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", async (req, res) => {
  try {
    // local mode
    if (req.body.type == "local") {
      // no files
      if (!req.files) {
        const response = { status: false, message: "No file uploaded" };
        console.log(response);
        res.send(response);
      } else {
        // contain captcha file
        if (req.files.captcha) {
          const captcha = req.files.captcha;
          captcha.mv("uploads/captcha.jpg");
          PythonShell.run(
            "captcha.py",
            { args: ["-t", "local", "-d", "uploads/captcha.jpg"] },
            function (err, results) {
              if (err) {
                const response = { status: false, message: "Solving failed" };
                console.log(response);
                res.send(response);
              } else {
                const response = { status: true, message: results[0] };
                console.log(response);
                res.send(response);
              }
            }
          );
        }
        // captcha key error
        else {
          const response = { status: false, message: "Upload file key should be captcha" };
          console.log(response);
          res.send(response);
        }
      }
    }
    // online mode
    else if (req.body.type == "online") {
      const captcha_url = req.body.captcha;
      PythonShell.run("captcha.py", { args: ["-t", "online", "-d", captcha_url] }, function (err, results) {
        // decode error
        if (err) {
          const response = { status: false, message: "Solving failed" };
          console.log(response);
          res.send(response);
        }
        // success
        else {
          const response = { status: true, message: results[0] };
          console.log(response);
          res.send(response);
        }
      });
    }
    // other type
    else {
      const response = { status: false, message: "Type error" };
      console.log(response);
      res.send(response);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

//start app
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Captcha app listening on http://localhost:${port}`));
