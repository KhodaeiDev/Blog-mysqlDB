module.exports = async (req, res, next) => {
  console.log(req.user.role);
  try {
    const role = req.user.role;
    if (role === "admin") {
      next();
    } else {
      return res.status(404).json("This route is accessible only to admins ");
    }
  } catch (err) {
    return res.status(404).json("This route is accessible only to admins ");
  }
};
