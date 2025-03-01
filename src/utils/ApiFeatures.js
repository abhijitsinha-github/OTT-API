import { Content } from "../models/content.model.js";

// API FEATURES LIKE FILTER, SORT & PAGINATION
const ApiFeatures = async (req) => {
  const { query } = req;

  const filter = {
    ...(query.title && { title: query.title.split("-").join(" ") }),
    ...(query.type && { type: query.type.split("-").join(" ") }),
    ...(query.genre && { genre: query.genre.split(",").join(" ") }),
    ...(query.release_year && { release_year: parseInt(query.release_year) }),
    ...(query.rating && { rating: { $gte: parseFloat(query.rating) } }),
  };

  const sort = query.sort || undefined;

  const fields = query.fields || "-__v";

  const page = parseInt(query.page) || undefined;
  const limit = parseInt(query.limit) || undefined;
  const skip = page && limit ? (page - 1) * limit : undefined;

  const maxContent = await Content.countDocuments();
  if (skip >= maxContent) {
    throw new Error("Page not Found!");
  }

  return { filter, sort, fields, limit, skip };
};

export { ApiFeatures };
