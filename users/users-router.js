const router = require("express").Router();
const Users = require("../users/users-model.js");

/*---------Get user Info---------*/

//Get user information
// Required: id --> returns user object
// incorrect id --> 404 No use with that ID
// Works at 11:56am
router.get("/:id", (req, res) => {
  Users.getBy({ id: req.params.id })
    .then(user => {
      if (user) {
        res.status(200).json(user);
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
router.get("/:id/all", checkID, (req, res) => {
  //make sure user exists
  Users.getAll({ id: req.params.id })
    .then(users => {
      if (users.length) {
        res.status(200).json({
          users
        });
      } else {
        res.status(404).json({
          message: "There are no users in the database for some reason!"
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "An error has occurred on the server.", error: err });
    });
}); //works without middleware

// Update user information
// Required: id, changes --> returns user object
// incorrect changes --> 500
// Works at 11:56am
/*---------Update User Info---------*/
router.put("/:id", checkID, (req, res) => {
  const changes = req.body;
  const id = req.params;

  Users.update(id, changes)
    .then(user => {
      res.status(200).json({ message: "Updated user", user });
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Database error (Check your body!)", error: err });
    });
});

//accepted friends = accepted: true
router.get("/:id/friends", checkID, (req, res) => {
  const { id } = req.params;

  Users.getFriends(id)
    .then(friends => {
      if (friends.length) {
        res.status(200).json({ friends });
      } else {
        res.status(400).json({ message: "You need to make some friends!" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Database Error", error: err });
    });
});

router.get("/:id/requests", (req, res) => {
  const { id } = req.params;

  Users.getRequests(id)
    .then(friends => {
      if (friends.length) {
        res.status(200).json({ friends });
      } else {
        res.status(400).json({ message: "You need to make some friends!" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Database Error", error: err });
    });
});

//finding a friend
//body has message and email
router.post("/:id/:requestID", checkID, (req, res) => {
  const { message, email } = req.body;
  const { id, requestID } = req.params;

  if (!message && !email) {
    res.status(404).json({ message: "Message and Email required!" });
  }

  Users.insertFriend(id, requestID, message, email)
    .then(response => {
      if (response.length) {
        res.status(200).json({ message: "Request successful!" });
      } else {
        res.status(400).json({ message: "Request unsuccessful!" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Database Error", error: err });
    });
});

//accept the request
//needs your id and then req.body needs friend id, changes accepted to true
router.put("/:id/:requestID", checkID, (req, res) => {
  const { id, requestID } = req.params;

  Users.acceptRequest(id, requestID)
    .then(response => {
      console.log(response);
      if (response) {
        res.status(200).json({ message: "Request successful!" });
      } else {
        res.status(404).json({ message: "Request Unsuccessful!" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Database Error", error: err });
    });
});

/*---------Delete User/Account---------*/
router.delete("/:id", checkID, (req, res) => {
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

function checkID(req, res, next) {
  Users.getBy({ id: req.params.id })
    .then(user => {
      if (user) {
        next();
      } else {
        res.status(404).json({ message: "No user with that ID!" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Database error", error: err });
    });
}

module.exports = router;
