const multer = require("multer");
const mkdirp = require("mkdirp");
const fs = require("fs");

const imageDir = () => {
  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  let day = new Date().getDate();

  return `./public/uploads/images/${year}/${month}/${day}`;
};

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dir = imageDir();

    mkdirp(dir).then((made) => {
      cb(null, dir);
    });
  },
  filename: (req, file, cb) => {
    let filePath = imageDir() + "/" + file.originalname;
    if (!fs.existsSync(filePath)) cb(null, file.originalname);
    else cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadImage = multer({
  storage: imageStorage,
});

module.exports = uploadImage;
