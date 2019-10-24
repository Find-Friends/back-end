const db = require("../data/dbConfig.js");

//database helper functions
const insert = user => {
  return db("users").insert(user);
};

const getAll = id => {
  return db("users")
    .select(
      "users.id",
      "users.firstName",
      "users.lastName",
      "users.age",
      "users.gender",
      "users.description",
      "users.location"
    )
    .whereNot(id);
};

const getBy = prop => {
  return db("users")
    .where(prop)
    .first();
};

const getFriends = id => {
  return db("friends")
    .where({
      requestID: id,
      accepted: 1
    })
    .join("users", "id", "=", "currentID")
    .select(
      "users.id",
      "users.firstName",
      "users.lastName",
      "users.age",
      "users.gender",
      "users.description",
      "users.location",
      "friends.email"
    );
};

const getRequests = id => {
  return db("friends")
    .where({
      requestID: id,
      accepted: 0
    })
    .join("users", "id", "=", "currentID")
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
    );
};

const getSentRequests = id => {
  return db("friends")
    .where({
      currentID: id,
      accepted: 0
    })
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
    );
};

const insertFriend = (id, requestID, message, email) => {
  return db("friends").insert({ currentID: id, requestID, message, email });
};

const acceptRequest = async (id, requestID) => {
  const first = await db("friends")
    .where({ currentID: id, requestID })
    .update({ accepted: 1 });

  const second = await db("friends").where({
    currentID: requestID,
    requestID: id
  });

  if (!second.length) {
    insertFriend({ requestID, id, message: "", email: "" });
  }
  return db("friends")
    .where({ currentID: requestID, requestID: id })
    .update({ accepted: 1 });
};

const removeRequest = (id, requestID) => {
  return db("friends")
    .where({ currentID: id, requestID })
    .del();
};

const update = (id, changes) => {
  return db("users")
    .where(id)
    .update({ ...changes, interests: JSON.stringify(changes.interests) })
    .then(res => {
      if (res === 1) {
        return getBy(id);
      } else {
        return undefined;
      }
    });
};

const deleteUser = id => {
  return getBy(id).then(res => {
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
  acceptRequest,
  removeRequest,
  getSentRequests
};
