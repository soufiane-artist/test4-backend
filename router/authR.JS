const photoUplaod = require('../clouidnary/image')
const { getAllDeals, CreateDeal, updateDeal, UpdateUserDeal, updateAllsDeals, updateUserDeals } = require('../controllers/DealC')
const { ForgotPass, getResetLink, resetPass } = require('../controllers/ForgotPassC')
const { Login, Register, getAllUsers, getUserById, updateAllprofile, UpdateImageProfile, updateAmount, coponeUser, updateUserBycoupone, verfyUserAccountCtrl } = require('../controllers/authC')
const { depositPaypal, depositSkrill } = require('../controllers/deposit')
const { getAllNoti } = require('../controllers/notifs')
const { SkrillPull, PaypalPullBank } = require('../controllers/pullC')
const { verfyToken, verfyTokenAdmin } = require('../middlewares/verfyToken')
const router = require('express').Router()


router.post('/auth/login',Login)
router.post('/auth/register',Register)
router.get('/auth/user/:id',getUserById)
router.get('/auth/users',getAllUsers)
//edit Image Profile
router.post('/auth/img/:id',photoUplaod.single('image'),UpdateImageProfile)
// edit all profile 
router.put('/auth/profile/:id',updateAllprofile)
//Shipping
router.put('/auth/amountUser/:id',updateAmount)
// getUser by coupone 
router.get('/auth/coponeUser/:coupone',coponeUser)
// update amount user by coupone
router.put('/auth/userCoupone/:id',updateUserBycoupone)
//notif
router.get('/auth/notifs',getAllNoti)
//deals
router.post('/auth/deal',CreateDeal)
router.get('/auth/deals',getAllDeals)
router.put('/auth/deals/:id',updateDeal)
router.put('/auth/deals/user/:id',UpdateUserDeal)
router.put('/auth/dealsClose/:id',updateUserDeals)
//Deposit
router.put('/auth/deposit/paypal',depositPaypal)
router.post('/auth/deposit/skrill/:id',photoUplaod.single('image'),depositSkrill)
//verfy email
router.get('/auth/:userId/verify/:token',verfyUserAccountCtrl)
// pull
router.post('/auth/SkrillPull',SkrillPull)
router.post('/auth/paypal/pull',PaypalPullBank)
//forgto-pass
router.post('/auth/forgotPass',ForgotPass)
router.post('/auth/resetPass/:userId/:token',resetPass)
router.get('/auth/resetPass/:userId/:token',getResetLink)

module.exports = router

/*

http://localhost:3000/reset-password/669fe48bf7d964d67db73ce9/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhd3NhbmUyMDAyQGdtYWlsLmNvbSIsImlkIjoiNjY5ZmU0OGJmN2Q5NjRkNjdkYjczY2U5IiwiaWF0IjoxNzIzMzk5NDYxLCJleHAiOjE3MjM0MDAwNjF9.daUKVzjylUiBi84-4HQDvdiKOrwGAF_uJUd0RKEbGCI

*/