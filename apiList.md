# Dev Tinder API's

# authRouter
- POST /signup
- POST /login
- POST /logout

# profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

# connectionRequestsRouter
- POST /request/send/intrested/:userId
- POST /request/send/ignored/:userID
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

# userRouter
- GET /user/connections
- GET /user/requests
- GET /user/feed

- status ignore, intrested, accepted, rejected 
