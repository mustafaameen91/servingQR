const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/api/certificates/:file", function (request, response) {
   let file = request.params.file;
   var extension = file.split(".").pop();
   var tempFile = `./certificates/${file}`;
   fs.readFile(tempFile, function (err, data) {
      console.log(extension);
      switch (extension) {
         case "jpg":
            contentType = "image/jpg";
            isImage = 1;
            break;
         case "png":
            contentType = "image/png";
            isImage = 1;
            break;
         case "jpeg":
            contentType = "image/jpeg";
            isImage = 1;
            break;
         case "pdf":
            contentType = "application/pdf";
            isImage = 2;
            break;
      }
      response.contentType(contentType);
      response.send(data);
   });
});

app.post(`/api/uploadQR`, (req, res) => {
   console.log(req.body.fileName);
   let base64Data = req.body.pdf;

   fs.writeFile(
      `./certificates/${req.body.fileName}`,
      base64Data,
      "base64",
      function (err) {
         if (err) {
            res.status(500).send({
               message:
                  err.message ||
                  "Some error occurred while creating the certificate.",
            });
         } else {
            res.send({ message: "saved file" });
         }
      }
   );
});

app.listen(3350, () => {
   console.log("Server is running on port 3350.");
});
