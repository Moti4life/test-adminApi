###

nodejs backend basic user api

used Mongoose/mongoDb

###

install packages

npm i express dotenv mongoose

###

configure env

- create config folder in root
- create env file "dev.env" with code below

MONGODB_URL=mongodb:"//127.0.0.1/test-adminAPI"
PORT=3400

###

-run
mongod

-on separate terminal run
node app.js or nodemon

###

use postman 
indicate x-www-form-urlencoded for body

-get all users
GET 127.0.0.1:3400/

-new user
POST 127.0.0.1:3400/users
in Body fill in the required Key / value
    fname
    lname
    address
    postcode
    phone
    email
    username
    password

-get user
GET 127.0.0.1:3400/user/'USERNAME'

-get user and update
PATCH 127.0.0.1:3400/user/'USERNAME'
in body; update with key and value

-delete one user
DELETE 127.0.0.1:3400/user/'USERNAME'

-delete multiple users
DELETE 127.0.0.1:3400/user
in body; key is usernames/'username' for each user

-delete all users
DELETE 127.0.0.1:3400/users