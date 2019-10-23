# Express API

## Postman Documentation

[API Documentation](https://documenter.getpostman.com/view/968596/SVtbRmDJ?version=latest)

## Product Vision

[Notion Document](https://www.notion.so/Product-Vision-f8263f3173144c66b8acaf3ef6dbb188)

## Dependencies

bcryptjs, cors, dotenv, express, helmet, jsonwebtoken, knex, pg, sqlite3
Development Dependencies: nodemon, cross-env, jest, supertest

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
