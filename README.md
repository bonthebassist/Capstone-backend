# Capstone-backend
# Chuta - Instrumental Tutor Self-Management system
Backend app created for my Capstone Project using Nodejs and Expressjs. Frontend application set up to consume the API's this backend offers.
A backend application that has API and microservices that an instrumental tutor can utilise.

Some features are:
- User & Tasks (CRUD operations)                 
- User authentication            
- Basic authentication (bcrypt for salt and hash, jwt tokens)
- Ready for frontend to consume it's api services
How to run
If you want to run this locally:
- Clone this backend project to your local.
- You will need to set up a mongoDB server whether on the cloud or locally.
- You will need to create a .env file with 3 variables 
  - API_PORT=4000 
  - MONGO_URI= (this should look something like mongodb://localhost:27017/chutaDB) 
  - TOKEN_KEY=(Long string of numbers and letters)
- In the project directory, run 
 npm install
 then,
 npm start

- Clone the front end project to your local here: https://github.com/dvd25/bonthebassist/Capstone-Frontend.
- Follow the instructions in the front end repository readme file.
