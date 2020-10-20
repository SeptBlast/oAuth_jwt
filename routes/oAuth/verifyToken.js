import jwt from 'jsonwebtoken'

export default function auth (req, res, next) {
    const token = req.header('Authorization')
    if (!token) return res.status(401).send('Access Denied')

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    } catch (error) {
        res.status(401).send('Invalid Token')
    }
}