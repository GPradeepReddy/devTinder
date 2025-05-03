# Dev Tinder API's

# authRouter
- POST /signup
- POST /login
- POST /logout

# profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password // forgot password API

# connectionRequestsRouter
- POST /request/send/:status/:userId
- POST /request/review/:status/:requestId


# userRouter
- GET /user/connections
- GET /user/requests
- GET /user/feed

- status: ignored, interested, accepted, rejected 
