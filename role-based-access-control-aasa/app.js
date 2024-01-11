const express = require("express");
const createHttpError = require("http-errors");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const session = require("express-session");
const connectMongo = require("connect-mongo");
const authenticateToken = require("./utils/authenticate");
const checkAccessLevel = require("./utils/checkAccess");

// Initialization
const app = express();
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const MongoStore = connectMongo(session);
// Init Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      // secure: true,
      httpOnly: true,
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// Routes
app.use("/", require("./routes/index.route"));
app.use("/auth", require("./routes/auth.route"));
app.use("/api", authenticateToken, checkAccessLevel);

// 404 Handler
app.use((req, res, next) => {
  next(createHttpError.NotFound());
});

// Error Handler
app.use((error, req, res, next) => {
  error.status = error.status || 500;
  res.status(error.status).json({ error: error.message });
});

// Setting the PORT
const PORT = process.env.PORT || 3000;

// Making a connection to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("💾 connected...");
    // Listening for connections on the defined PORT
    app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
  })
  .catch((err) => console.log(err.message));
