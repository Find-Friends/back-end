# Express API

## Product Vision

Notion Document[https://www.notion.so/Product-Vision-f8263f3173144c66b8acaf3ef6dbb188]

## Endpoints

### /api/auth/register

### SQL (Planning)

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

### Migrations

Made two tables from Planning

### Seed Data

[{id: 1, username: "james", password}]

#### Extra

get all by id
-make it so if you've requested someone they don't show up etc

### Friends

see all potential friends
-get /:id/all

## see accepted friends

## see requested friends

post/insert yourself to someone else's friends
