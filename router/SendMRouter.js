const { sendMoney } = require('../controllers/Sendmoney')
const { verfyToken } = require('../middlewares/verfyToken')

const router = require('express').Router()

router.post('/auth/send-money',sendMoney)

module.exports = router