const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
   try {
    const authHeader = req.headers['authorization']

    if (!authHeader) {
        return res.status(400).json({message: "Please add the Auth Header as: Bearer <token>"})
    }

    const token = String(authHeader).split(" ")
    if (token.length !== 2) {
        return res.status(400).json({message: "Improperly formatted header!"})
    }

    const verify = jwt.verify(token[1], process.env.JWT_SECRET)

    if (!verify) return res.status(403).json({message: "Unauthorized"})

    req.user = verify;
    next();
   } catch (err) {
    console.error(err);
    return res.status(500).send({error: err})
   }
}