const express=require('express');
const {orgDashboard,getIssueForm,postIssueForm,orgHistory} = require('../controllers/orgControllers');

const router=express.Router();

router.route('/:id').get(orgDashboard);
router.route('/:id/issue-certificate').get(getIssueForm).post(postIssueForm);
router.route('/:id/history').get(orgHistory);

module.exports=router;
