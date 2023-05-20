<h1 align="center">
  Backend
</h1>

## Requirements

- NodeJS
- MongoDB Database
- TMDB API Key [(register here)](https://www.themoviedb.org/signup)
- Stripe API Key [(register here)](https://dashboard.stripe.com/register)

## Setup

```bash
# Navigate into repository
$ cd backend

# Install dependencies
$ npm i

# Rename .env.sample to .env file and fill out the environment variables

# Start backend api
$ npm run start
```

# API Routes

| Method(s)       | Path                           | Description                                 | Protection    |
| --------------- | ------------------------------ | ------------------------------------------- | ------------- |
| `GET`           | /                              | Test connection to backend                  | PUBLIC        |
| `GET`           | /search/movie                  | TMDB movie query                            | PUBLIC        |
| `GET`           | /movies                        | Returns all movies                          | PUBLIC        |
| `POST`          | /movies                        | Adds new movie                              | ADMIN         |
| `GET`           | /movies/:title                 | Returns specific movie                      | PUBLIC        |
| `PUT`           | /movies/:id                    | Updates specific movie                      | ADMIN         |
| `DELETE`        | /movies/:title                 | deletes specific movie                      | ADMIN         |
| `GET`           | /cinemas                       | Returns all cinemas                         | PUBLIC        |
| `POST`          | /cinemas                       | Adds new cinema                             | ADMIN         |
| `GET`           | /cinemas/:title                | Returns specific cinema                     | PUBLIC        |
| `PUT`, `DELETE` | /cinemas/:title                | Updates / deletes specific cinema           | ADMIN         |
| `GET`           | /seattypes                     | Returns all seattypes                       | PUBLIC        |
| `POST`          | /seattypes                     | Adds new seattype                           | ADMIN         |
| `PUT`, `DELETE` | /seattypes/:id                 | Updates / deletes seattype                  | ADMIN         |
| `GET`           | /screenings?title              | Returns screenings associated to a movie    | PUBLIC        |
| `GET`           | /screenings/ticketshop/:id     | Returns specific screening                  | PUBLIC        |
| `GET`           | /screenings/schedule           | Returns all scheduled screenings            | PUBLIC        |
| `POST`          | /screenings/schedule           | Adds new scheduled screening                | ADMIN         |
| `DELETE`        | /screenings/schedule/:id       | Deletes specific scheduled screening        | ADMIN         |
| `POST`          | /authentication/login          | Login                                       | PUBLIC        |
| `POST`          | /authentication/register       | Register new account                        | PUBLIC        |
| `POST`          | /authentication/logout         | Logout                                      | PUBLIC        |
| `PUT`           | /authentication/update         | Updates account information                 | LOGGEDIN      |
| `GET`           | /authentication/protected      | Demo page to test loggedin status           | LOGGEDIN      |
| `GET`           | /authentication/admin          | Demo page to test admin status              | ADMIN         |
| `GET`           | /payment/config                | Returns public stripe key                   | PUBLIC        |
| `POST`          | /payment/create-payment-intent | Creates payment-intent for stripe payment   | PUBLIC        |
| `POST`          | /payment/webhook               | Handles Stripe Response                     | STRIPE-SIG    |
| `GET`           | /tickets                       | Returns all tickets of current user         | LOGGEDIN      |
| `GET`, `PATCH`  | /tickets/validate/:id          | Returns / validates specific ticket         | ADMIN / STAFF |
| `GET`, `POST`   | /users/staff                   | Returns all staff accounts / adds new staff | ADMIN         |
| `DELETE`        | /users/staff/:id               | Deletes specific staff account              | ADMIN         |
