const notFound = (req, res, next) => {
  res.status(404).send("Route Dos Not Exist");
};

module.exports = notFound;
