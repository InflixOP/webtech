const  Organisation=require('../models/Organisation');
const  User=require('../models/User');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');



const userHandleError=(err)=>{
    console.log(err.message,err.code);
    let errors = {firstName:'',lastName:'',email:'',username:'',password:'' };

    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path]=properties.message;
        });
    }

    if(err.message=='incorrect email'){
        errors.email='incorrect email';
    }
    if(err.message=='incorrect password'){
        errors.password='incorrect password';
    }

    if(err.code==11000){
        errors.email='That email already exists';
    }
    return errors;
}







const organisationHandleError=(err)=>{
    console.log(err.message,err.code);
    let errors = { name: '', email: '', username: '', password: '' };

    if(err.message.includes('Organisation validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path]=properties.message;
        });
    }

    if(err.message=='incorrect email'){
        errors.email='incorrect email';
    }
    if(err.message=='incorrect password'){
        errors.password='incorrect password';
    }

    if(err.code==11000){
        errors.email='That email already exists';
    }
    return errors;
}



const maxAge=3*24*60*60;


const createToken =(id)=>{
    return jwt.sign({id},'secret',{
        expiresIn:maxAge
    })
}

const getSignUpPage=(req,res)=>{
    res.send('signup');
}

const getLoginPage=(req,res)=>{
    res.send('login');
}

const postLoginPage=async(req,res)=>{
    const { username, password } = req.body;
    try {
      const org=await Organisation.login(username, password);
      const token=createToken(org._id);
      res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
      res.status(200).json({org:org._id});
    } catch (error) {
       const err = organisationHandleError(error);
        res.status(400).json({err})
    }
}

const postSignUpPage = async (req, res) => {
    const { name, email, username, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const org = new Organisation({ name, email, username, password: hashedPass });
  
    try {
      await org.save();
      const token = createToken(org._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      console.log(org);
      res.status(200).json({ org: org._id });
    } catch (error) {
      const err = organisationHandleError(error);
      res.status(400).json({ err });
    }
  }
const getUserSignUpPage=(req,res)=>{
    res.send('signup');
}

const getUserLoginPage=(req,res)=>{
    res.send('login');
}


const postUserLoginPage = async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.login(username, password);
      const token=createToken(user._id);
      res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
      res.status(200).json({ user: user._id });
    } catch (error) {
        const err = userHandleError(error);
        res.status(400).json({err})
    }
  };
  
const postUserSignUpPage=async (req,res)=>{
    const {firstName,lastName,email,username,password}=req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const user=new User({firstName,lastName,email,username,password:hashedPass});
    try {
        await user.save();
        const token=createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
        console.log(user);
        res.status(200).json({user});
    } catch (error) {
        const err = userHandleError(error);
        res.status(400).json({err})
    }
}


const getLogoutPage=(req,res)=>{
    res.cookie('jwt','',{maxAge:1});
    res.redirect('/');
  }




module.exports ={ getSignUpPage,postSignUpPage,getLoginPage,postLoginPage, getUserSignUpPage,postUserSignUpPage,getUserLoginPage,postUserLoginPage,getLogoutPage};