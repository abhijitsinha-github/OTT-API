import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: 225,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      maxlength: 50,
      lowercase: true,
    },
    genre: {
      type: [String],
      required: true,
      lowercase: true,
    },
    release_year: {
      type: Number,
      required: true,
      min: 1900,
    },
    duration: {
      type: Number,
      required: true,
    },
    cast: {
      type: [String],
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 10,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    trailer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// MIDDLEWARES
contentSchema.pre("save", function (next) {
  if (this.isModified("genre")) {
    this.genre = this.genre[0].split(",");
    this.genre = this.genre.map((str) => str.toLowerCase());
  }
  if (this.isModified("cast")) {
    this.cast = this.cast[0].split(",");
  }

  next();
});

contentSchema.post("findOneAndUpdate", function (doc, next) {
  if (doc.genre) {
    doc.genre = doc.genre[0].split(",");
    doc.genre = doc.genre.map((str) => str.toLowerCase());
  }
  if (doc.cast) {
    doc.cast = doc.cast[0].split(",");
  }
  next();
});

export const Content = mongoose.model("Content", contentSchema);
