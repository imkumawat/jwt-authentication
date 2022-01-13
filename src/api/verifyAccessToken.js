const jwt = require("jsonwebtoken")

function verifyAccessToken(req, res) {

    try {
        if (!req.headers.authorization) {
            console.log("Access Token is Missing")
            return res.status(404).json({ message: "Authorization header is missing" })
        }

        const tokenSecret = "1234567890"
        const tokenInfo = jwt.verify(req.headers.authorization, tokenSecret, (err, data) => {
            if (err) {
                console.log("JWT access token is not valid or expired")
                return res.status(200).json({ message: 'Token is expired or invalid' })
            }
            else {
                console.log("JWT access token is verified!")
                console.log(data)
                return res.status(200).json({ message: 'jwt is valid', data: `${data.email}` })
            }
        })


    }
    catch (e) {
        console.log("Unable to verify jwt access token")
        return res.status(500).json({ message: 'Internal Server Error' })
    }

}
module.exports = verifyAccessToken