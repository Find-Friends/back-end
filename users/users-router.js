const router = require("express").Router();
const Users = require("../users/users-model.js");
const restricted = require("../auth/restricted-middleware.js"); //Works without middleware

/*---------Get user Info---------*/

//Get user information
// Required: id --> returns user object
// incorrect id --> 404 No use with that ID
// Works at 11:56am
router.get("/:id", restricted, (req, res) => {
  Users.getBy({ id: req.params.id })
    .then(user => {
      if (user) {
        res.status(200).json({
          user
        });
      } else {
        res.status(404).json({ message: "No user with that ID!" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Database error", error: err });
    });
}); //works without middleware

// all users except myself
// required is id --> all users objects
// incorrect id --> 404
router.get("/:id/all", restricted, (req, res) => {
  //make sure user exists
  const { id } = req.params;
  Users.getBy({ id: req.params.id })
    .then(user => {
      if (user) {
        Users.getAll({ id: req.params.id }).then(users => {
          if (users.length) {
            res.status(200).json({
              users
            });
          } else {
            res.status(404).json({
              message: "There are no users in the database for some reason!"
            });
          }
        });
      } else {
        res.status(404).json({ message: "No user with that ID!" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "An error has occurred on the server.", error: err });
    });
}); //works without middleware

//Get user information
// Required: id --> returns user object
// incorrect id --> 404 No use with that ID
// Works at 11:56am
/*---------Update User Info---------*/ router.put(
  "/:id",
  restricted,
  (req, res) => {
    const changes = req.body;
    const id = req.params;

    Users.update(id, changes)
      .then(user => {
        console.log(user);
        res.status(200).json({ message: "Updated user", data: user });
      })
      .catch(err => {
        res.status(500).json({ message: "Database error", error: err });
      });
  }
);

/*---------Delete User/Account---------*/
router.delete("/:id", restricted, (req, res) => {
  const id = req.params;

  Users.deleteUser(id)
    .then(user => {
      user
        ? res.status(200).json({ message: "Deleted user" })
        : res.status(404).json({ message: "User does not exist!" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Database error", error: err });
    });
});

module.exports = router;
