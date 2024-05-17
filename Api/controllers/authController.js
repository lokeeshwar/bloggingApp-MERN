const userdata = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/error");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !password ||
    !email ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "all fields are required"));
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  const newUser = new userdata({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json("new user data saved");
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
     return next(errorHandler(400, "all fields are required"));
  }

  try {
    const validUser = await userdata.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "user not found"));
    }
    const validPassword = await bcryptjs.compare(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid Password"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const {password:pass , ...rest} = validUser._doc
    
    res.status(200).cookie("access_Token", token, {
      httpOnly: true,
    }).json(rest)
  } catch (error) {
    next(error);
  }
};

const google = async (req,res,next) => {
  const {email,name,googlePhotoUrl} = req.body
  try{
    const user = await userdata.findOne({email})
    if(user){
       const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
       const{password,...rest} = user._doc
       res.status(200).cookie('access_token',token,{
        httpOnly :true 
       }).json({rest})
    }else{
      const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
      const hashedPassword = bcryptjs.hashSync(generatePassword,10)
      const newUser = new userdata({
        username : name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
        password : hashedPassword,
        email,
        profilePitchure: googlePhotoUrl,
      });
      await newUser.save()
      const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET)
      const{password,...rest} = newUser._doc
      res.status(200).cookie('access_token',token,{
       httpOnly :true 
      }).json({rest})
    }
  }catch(error){
    next(error)
  }
}

module.exports = { signup, signin, google };
 