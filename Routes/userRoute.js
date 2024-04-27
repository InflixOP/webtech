const express=require('express');
const {getUserVerifyForm,userDashboard,getUserHistory} = require('../controllers/userController');
const router=express.Router();

router.route('/:id').get(userDashboard);
router.route('/:id/issue-certificate').get(getUserVerifyForm);
router.route('/:id/history').get(getUserHistory);


module.exports = router;