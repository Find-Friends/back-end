const db = require("../data/dbConfig.js");

//database helper functions
const insert = user => {
  return db("users").insert(user);
};

const getAll = id => {
  return db("users").whereNot(id);
};

const getBy = prop => {
  return db("users")
    .where(prop)
    .first();
};

const getFriends = id => {
  return db("friends")
    .join("users", "id", "=", "requestID")
    .select(
      "users.id",
      "users.firstName",
      "users.lastName",
      "users.age",
      "users.gender",
      "users.description",
      "users.location",
      "friends.email"
    )
    .where({
      currentID: id,
      accepted: 1
    });
};

const getRequests = id => {
  return db("friends")
    .join("users", "id", "=", "requestID")
    .select(
      "users.id",
      "users.firstName",
      "users.lastName",
      "users.age",
      "users.gender",
      "users.description",
      "users.location",
      "friends.email",
      "friends.message"
    )
    .where({
      currentID: id,
      accepted: 0
    });
};

const insertFriend = (id, requestID, message, email) => {
  return db("friends").insert({ currentID: id, requestID, message, email });
};

const acceptRequest = (id, requestID) => {
  return db("friends")
    .where({ currentID: id, requestID })
    .update({ accepted: 1 });
};

const update = (id, changes) => {
  return db("users")
    .where(id)
    .update(changes)
    .then(res => {
      console.log("res", res, id);
      if (res === 1) {
        return getBy(id);
      } else {
        return undefined;
      }
    });
};

const deleteUser = id => {
  return getBy(id).then(res => {
    console.log(res);
    if (res) {
      return db("users")
        .where(id)
        .del();
    }
  });
};

module.exports = {
  getAll,
  insert,
  getBy,
  update,
  deleteUser,
  getFriends,
  getRequests,
  insertFriend,
  acceptRequest
};
