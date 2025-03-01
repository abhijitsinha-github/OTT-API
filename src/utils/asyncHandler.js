// ERROR HANDLER FOR ASYNC FUNCTIONS
const asyncHandler = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((error) => next(error));
  };
};

export { asyncHandler };
