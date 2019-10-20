# Express API

## Product Vision

Notion Document[https://www.notion.so/Product-Vision-f8263f3173144c66b8acaf3ef6dbb188]

## Endpoints

## POST /api/auth/register

To register, make a post request to `/api/auth/register` with the following payload:

```
{
	"username": "georgia",
	"password": "test",
	"firstName": "Georgia",
	"lastName": "Walker"
}
```

Responds with the following the following data:

```
{
  "id": 12,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxMiwidXNlcm5hbWUiOiJnZW9yZ2lhIiwiaWF0IjoxNTcxNjExODE1LCJleHAiOjE1NzE2OTgyMTV9.3AbA-p8c3ynu-KsKCAPFprMVb7NAGJg6iEzfJO3GnNI"
}
```

## POST /api/auth/login

To login, make a post request to `/api/auth/login` with the following payload:

```
{
	"username": "georgia",
	"password": "test"
}
```

Responds with the following the following data:

```
{
  "message": "Correct Credentials!",
  "id": 12,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxMiwidXNlcm5hbWUiOiJnZW9yZ2lhIiwiaWF0IjoxNTcxNjExODI2LCJleHAiOjE1NzE2OTgyMjZ9.gQ8XCLCRfoM4EuNF5kS_mwin8PJQklJKzFbINf4JE_s"
}
```

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
