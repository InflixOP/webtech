const Creator = require('../models/Creator');
const User=require('../models/User');


const userDashboard = async(req,res)=>{
    const id = req.params.id;

  try {
    const user = await User.findById(id);

    if (user) {
      const { userpassword, ...otherDetails } = user._doc;

      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("No such user exists");
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

const buyStock = async(req,res)=>{
    const { useremail, creatorchannelname, quantity } = req.body;
  

  try {
    const user = await User.findOne({useremail});
    const creator = await Creator.findOne({creatorchannelname});

      user.myholdings.push(creator._id);
      user.mytoken += quantity;
      await user.save();

      creator.tokens -= quantity;
      await creator.save();




      res.status(200).redirect('/userlogin');
     

   
  } catch (error) {
    res.status(400).json({error:error.message});
  }
}

const getUserBuy = (req,res)=>{
  res.render('userbuy');
}


module.exports ={userDashboard,buyStock, getUserBuy};