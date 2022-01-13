const jwt = require("jsonwebtoken")

function verifyuseremail(email) {
    const tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

    if (!email) { return false }

    if (email.length > 254) { return false }

    const valid = tester.test(email)
    if (!valid) { return false }

    // Further checking of some things that regex can't handle
    const parts = email.split('@')
    if (parts[0].length > 64) { return false }

    const domainParts = parts[1].split('.')
    if (domainParts.some((part) => part.length > 63)) { return false }

    return true
}

function generateAccessToken(req, res) {

    try {

        if (!req.body.email) {
            console.log('Email id is not found')
            return res.status(404).json({ message: 'No email found' })
        }

        if (!verifyuseremail(req.body.email)) {
            console.log('Email id is invalid')
            return res.status(400).json({ message: 'Invalid email' })
        }

        const { email } = req.body
        const tokenSecret = "1234567890"

        const token = jwt.sign({ email }, tokenSecret, { expiresIn: '1800s' })
        console.log('JWT access token generation successful')

        return res.status(201).json({ message: 'token generation success', jwt: `${token}` })

    }
    catch (e) {
        console.log('Unable to generate jwt access token')
        return res.status(500).json({ message: 'Internal Server Error' })
    }

}

module.exports = generateAccessToken