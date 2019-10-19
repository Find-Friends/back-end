module.exports = {
  jwtSecret:
    process.env.JWT_SECRET || "please provide a better secret in production"
};
