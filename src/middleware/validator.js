module.exports = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validate(req.body);
      next();
    } catch (err) {
      res.status(401).json({ error: err.errors });
    }
  };
};
