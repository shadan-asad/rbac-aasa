# Role Based Access Control 
This is a Role Based Access Control application using Nodejs, Express. <br>
Three roles are assigned to the users: Admin, Moderator & User. <br>
User, Admin, Moderator can access the /dashboard. <br>
Admin can access the /settings. <br>
Moderator can access the /statistics.

CRUD is also implemented with the following APIs:
<br>
**/auth/register**      : to add a user in db
<br>
**/auth/login**         : to login and get the JWT token for the main APIs
<br>
**/auth/update-level**  : to update the access-level for the users
<br>
**/auth/remove**        : to delete the user


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

