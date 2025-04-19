import express from 'express';
import UserModel from '../models/user.model.js';
import bcrypt from "bcrypt";
import session from 'express-session';
import  passport from 'passport';
import LocalStrategy from  'passport-local'
const saltRounds = 10;
const router = express.Router();

router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false , maxAge:60000 }
}))

router.use(passport.initialize());
router.use(passport.session());
 
passport.use(new LocalStrategy(
  { usernameField: 'email' }, 
  async function(email, password, done) {
    console.log("--------",email , password)
    try {
      const user = await UserModel.findOne({ email: email });
      console.log("--------user",user ,user.password)
      //  let createshash = await bcrypt.hash(password, saltRounds);
      //  console.log(createshash)
      if (!user) {
        return done(null, false, { message: 'User does not exist.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      console.log(isMatch)
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      

      return done(null, user); // ✅ correct match
      // const isMatch = bcrypt.compare(password,user.password, function(err , result){
      //   console.log("result2345" ,err , result)
      //   if(err){
      //     console.log("error from if block",err)
      //   }
      //   if(result){
      //     console.log("result from" , result)
      //   }else{
      //     return done (null,false, {message:"incorrect password"})
      //   }

      // });

      // console.log(isMatch)
      // if (!isMatch) {
      //   return done(null, false, { message: 'Incorrect password.' });
      // }
      // return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));


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



function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

router.post('/login',passport.authenticate('local' ,{
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  // failureFlash: true
}), 
  // try {
  //   const { email, password } = req.body;

    
  //   if (!email || !password) {
  //     return res.status(400).json({ message: "Email and password are required." });
  //   }
    
  //   const user = await UserModel.findOne({ email: email });
  //   if (!user) {
  //     return res.status(404).json({ message: "User does not exist." });
  //   }

  //   // if (!user.password) {
  //   //   return res.status(500).json({ message: "Stored password not found for user." });
  //   // }

  //   const isPasswordCorrect = await bcrypt.compare(password, user.password);
  //   if (!isPasswordCorrect) {
  //     return res.status(401).json({ message: "Incorrect password." });
  //   }

    
   
  //   res.status(200).json({ message: "Login successful" });

  // } catch (error) {
  //   console.error("Login error:", error);
  //   res.status(500).json({ message: "An error occurred during login." });
  // }

  // res.redirect('/')
);






router.post('/signup' , async (req , res)=>{
    console.log(req.body)
   
    try{
      
      const { name , email, password} = req.body;

      if (!name) {
        return res.status(401).json({ message: "Name is required." });
      } 

      if (!validateEmail(email)) {
        return res.status(400).json({ message: "Invalid email format." });
      }

      if (!password || password.length < 7) {
        return res.status(400).json({ message: "Password must be at least 7 characters long." });
      }
  
      const user = await UserModel.findOne({email})
      console.log("fgthun",user)
      if(user){
        return res.status(400).json({message:"user already exist with this email id"})
      }

      let hash = await bcrypt.hash(password, saltRounds);
  
      await UserModel.create({
        name,
        email,
        password: hash,
      });
      res.status(200).json({ message: "Signup successful" });

  
    }catch(error){
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" });
    }
})

export default router;
