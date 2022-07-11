//require env
require("dotenv").config({ path: "./config/dev.env" });

const express = require("express");

// mongoose
require("./db/mongooseDb");
const { User } = require("./models/userModel");

const app = express();
const port = process.env.PORT;
//console.log(__dirname)

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// all users
app.get("/", (req, res) => {
  User.find({}, (error, result) => {
    if (!error) {
      res.send(result);
      res.status(200);
    } else {
      res.send(error);
    }
  });
});

// new user
app.post("/users", async (req, res) => {
  const newUser = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    address: req.body.address,
    postcode: req.body.postcode,
    phone: req.body.phone,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });

  try {
    await newUser.save();
    res.status(201);
    res.send(newUser);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
});

// delete all users
app.delete("/users", async (req, res) => {
  try {
    const deleteAllUsers = await User.deleteMany({});
    if (deleteAllUsers.deletedCount == 0) {
      return res.status(404).send("no more users");
    }
    res.status(200).send("deleted all users");
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

//test
// app.get("/users/:username", async (req, res) => {
//   try {
//     const foundUser = await User.findOne({ username: req.params.username });
//     if (!foundUser) {
//       res.status(404);
//       return res.send("no match found");
//     }
//     res.status(200).send(foundUser);
//   } catch (error) {
//     res.status(500);
//     res.send(error);
//   }
// });

// delete many
// https://stackoverflow.com/a/46769755
app.delete("/user", async (req, res) => {
  try {
    const foundUsers = await User.deleteMany({ username: {'$in': req.body.usernames } });
    if (!foundUsers) {
      res.status(404);
      return res.send("Multi; no match found");
    }
    res.status(200).send(foundUsers);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

// chained route handlers
// selected users

app
  .route("/user/:username")
  .get(async (req, res) => {
    try {
      const foundUser = await User.findOne({ username: req.params.username });
      if (!foundUser) {
        res.status(404);
        return res.send("no match found");
      }
      res.status(200).send(foundUser);
    } catch (error) {
      res.status(500);
      res.send(error);
    }
  })
  .patch(async (req, res) => {
    //findOne returns the document found in initial state by default
    try {
      const updateUser = await User.findOneAndUpdate(
        { username: req.params.username },
        {
          fname: req.body.fname,
          lname: req.body.lname,
          address: req.body.address,
          postcode: req.body.postcode,
          phone: req.body.phone,
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
        }
      );
      if (!updateUser) {
        res.status(404);
        return res.send(updateUser);
      }
      res.status(200).send(updateUser);
    } catch (error) {
      res.status(500);
      res.send(error);
    }
  })
  .delete(async (req, res) => {
    try {
      const deleteUser = await User.findOneAndDelete({
        username: req.params.username,
      });
      if (!deleteUser) {
        res.status(404);
        return res.send(deleteUser);
      }
      res.status(200);
      res.send(deleteUser);
    } catch (error) {
      res.status(500);
      res.send(error);
    }
  });

app.get("*", (req, res) => {
  res.send("no function");
});

app.listen(port, () => {
  console.log("now serving on port: " + port);
  console.log(process.env.MONGODB_URL);
});
