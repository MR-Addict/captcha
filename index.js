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

//custom variables
const max_image_size = 1 * 1024 * 1024;
const upload_image_path = "uploads/captcha.jpg";

//add other middleware
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", async (req, res) => {
  try {
    // local mode
    if (req.files && req.files.captcha != null && req.body.type != null && req.body.type == "local") {
      // contain captcha file
      const captcha = req.files.captcha;
      if (captcha.size > max_image_size) {
        const response = { status: false, message: "Image size too big!" };
        console.log(response);
        res.send(response);
      } else {
        captcha.mv(upload_image_path);
        // run python shell
        PythonShell.run("captcha.py", { args: ["-t", "local", "-d", upload_image_path] }, function (err, results) {
          // execute python failed
          if (err || !results) {
            const response = { status: false, message: "Failed" };
            console.log(response);
            res.send(response);
          }
          // execute python success
          else {
            const response = { status: true, message: results[0] };
            console.log(response);
            res.send(response);
          }
        });
      }
    }
    // online mode
    else if (req.body.captcha != null && req.body.type != null && req.body.type == "online") {
      const captcha = req.body.captcha;
      PythonShell.run("captcha.py", { args: ["-t", "online", "-d", captcha] }, function (err, results) {
        // fail
        if (err) {
          const response = { status: false, message: "Failed" };
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
      const response = { status: false, message: "Bad request" };
      console.log(response);
      res.send(response);
    }
  } catch (err) {
    const response = { status: false, message: "Error" };
    console.log(response);
    res.status(500).send(response);
  }
});

//start app
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Captcha app listening on http://localhost:${port}`));
