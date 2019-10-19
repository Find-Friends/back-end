const router = require("express").Router();

router.post("/register", (req, res) => {
  const creds = req.body;
});

router.post("/login", (req, res) => {
  const creds = req.body;
});

module.exports = router;
