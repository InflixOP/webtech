const  Organisation=require('../models/Organisation');

const orgDashboard = async(req,res)=>{
  const id = req.params.id;

  try {
    const org = await Organisation.findById(id);

    if (org) {
      const { password, ...otherDetails } = org._doc;

      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("No such user exists");
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

const orgHistory=(req,res)=>{
res.send('history');
}


const getIssueForm=(req,res)=>{
    res.send('form');
}


const postIssueForm = async (req, res) => {
  const { id } = req.params;
  const userData = req.body;

  try {
    const organisation = await Organisation.findById(id);

    if (organisation) {
      organisation.regestiredUsers.push(userData);
      await organisation.save();
  
      res.status(200).json({ organisation });
     
    }
    else{
      return res.status(400).json({ error: 'Organisation not found' });
    }

  
  
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


module.exports={orgDashboard,getIssueForm,postIssueForm,orgHistory}