import express from "express";
import UserModel from "../models/user.model.js";
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";

const router = express.Router();

// Session middleware
router.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60000 },
  })
);

// Initialize passport
router.use(passport.initialize());
router.use(passport.session());

// Passport local strategy
passport.use(
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    try {
      const user = await UserModel.findOne({ email: email });
      if (!user) {
        return done(null, false, { message: "User does not exist." });
      }

      // Password comparison without hashing
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password." });
      }

      return done(null, user); // User found and password matches
    } catch (err) {
      return done(err); // If an error occurs, pass it to the done() callback
    }
  })
);

// Passport serialization and deserialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Helper function to validate email format
function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({
      message: {
        email: "Email is required",
      },
    });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({
      message: {
        email: "Invalid email",
      },
    });
  }

  if (!password) {
    return res.status(400).json({
      message: {
        password: "Password is required",
      },
    });
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  if (user.password !== password) {
    return res
      .status(400)
      .json({ message: { password: "Password is incorrect" } });
  }

  return res.json(user);
});

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res.status(401).json({ message: "Name is required." });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    if (!password || password.length < 7) {
      return res
        .status(400)
        .json({ message: "Password must be at least 7 characters long." });
    }

    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists with this email ID." });
    }

    await UserModel.create({
      name,
      email,
      password, // storing plain text password
    });

    res.status(200).json({ message: "Signup successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
