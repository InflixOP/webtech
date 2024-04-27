const User=require('../models/User');

const userDashboard = async(req,res)=>{
    const id = req.params.id;

  try {
    const user = await User.findById(id);

    if (user) {
      const { password, ...otherDetails } = user._doc;

      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("No such user exists");
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

const getUserVerifyForm=(req,res)=>{
      res.send('user issue form');
}
const getUserHistory=(req,res)=>{
    res.send('user history form');
}

module.exports ={getUserVerifyForm,userDashboard,getUserHistory};