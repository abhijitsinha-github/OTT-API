import multer from "multer";
import path from "path";
import { ApiError } from "../utils/ApiError.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${req.body.title.split(" ").join("-").toLowerCase()}-${
        file.fieldname
      }-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    if (file.fieldname === "thumbnail") {
      if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
      ) {
        cb(null, true);
      } else {
        cb(
          new ApiError(`${file.fieldname} must be an image file`, null, 400),
          false
        );
      }
    }
    if (file.fieldname === "trailer") {
      if (file.mimetype === "video/mp4" || file.mimetype === "video/mpeg") {
        cb(null, true);
      } else {
        cb(
          new ApiError(`${file.fieldname} must be a video file`, null, 400),
          false
        );
      }
    }
  },
}).fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "trailer", maxCount: 1 },
]);

const contentFile = (req, res, next) => {
  upload(req, res, (error) => {
    if (error) {
      return next(error);
    }
    if (req.files) {
      if (req.files.thumbnail) {
        req.body.thumbnail = req.files.thumbnail[0].path;
      }
      if (req.files.trailer) {
        req.body.trailer = req.files.trailer[0].path;
      }
    }
    next();
  });
};

export { contentFile };
