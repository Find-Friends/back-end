# Express API

## Product Vision

Notion Document[https://www.notion.so/Product-Vision-f8263f3173144c66b8acaf3ef6dbb188]

## Endpoints

### SQL

### Notes

User Table
-id
(extra info)

Friends Table
-requestID (Foreign Key)
-currentID (user id of friend, primary key)
-currentRequestID (Primary Key) [Enforcing Uniqueness]
-accepted: false
-message: string
-email: string

User = {
id: 3,
friends: [{
accepted: false,
userID: 2
}]
}

User = {
id: 1,
friends: []
}

//click on user with id 3 to be my friend

User = {
id: 3,
friends: [{
id: 1,
accepted: false,
other info
}]
}
