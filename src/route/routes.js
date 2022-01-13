const express = require('express')

const router = express.Router()

const generateAccessToken = require("../api/generateAccessToken")
const verifyAccessToken = require("../api/verifyAccessToken")

router.post('/verifyaccesstoken/', verifyAccessToken)
router.post('/generateaccesstoken/', generateAccessToken)

module.exports = router
