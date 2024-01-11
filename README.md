# Role Based Access Control 
This is a Role Based Access Control application using Nodejs, Express. <br>
Three roles are assigned to the users: Admin, Moderator & User. <br>
User, Admin, Moderator can access the **/dashboard**. <br>
Admin can access the **/settings**. <br>
Moderator can access the **/statistics**.

CRUD is also implemented with the following APIs:
<br>
**/auth/register**      : to add a user in db
<br>
**/auth/login**         : to login and get the JWT token for the main APIs
<br>
**/auth/update-level**  : to update the access-level for the users
<br>
**/auth/remove**        : to delete the user

### Postman Library Link for the APIs
https://www.postman.com/grey-station-249096/workspace/public/collection/28279804-bd4d066e-87e1-4559-aaaa-b3e01f51e139?action=share&creator=28279804


**MongoDB** is used for storing Users in Database.

**JWT** is used for token based authorization.


## To start setting up the project

Step 1: Clone the repo

```bash
git clone https://github.com/shadan-asad/rbac-aasa
```

Step 2: cd into the repo and run:

```bash
npm install
```

Step 3: Put your credentials in the .env file.

```bash
PORT=3000
MONGODB_URI=YOUR_MONGODB_URI(example: mongodb://localhost:27017)
DB_NAME=YOUR_DB_NAME
SESSION_SECRET=secret
ADMIN_EMAIL=admin@gmail.com
JWT_SECRET_KEY=aasa
```

Step 4: Install MongoDB

See <https://docs.mongodb.com/manual/installation/> for more infos

Step 5: Run Mongo daemon

```bash
sudo service mongod start
```

Step 6: Start the app by

```bash
npm start
```

## How does it work ?
1. Register a user <br>
2. Login with the registered user, after successful login copy the token <br>
3. Paste the token in authorisation header to call any API <br>


