require('dotenv').config();
const jwt = require('jsonwebtoken');
// FOR USER ACCESS
function authenticationToken (req, res, next) {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(" ")[1];
    if(!token || token == null) 
    return res.sendStatus(401).send({ msg: "User not logged in"})

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if(err) res.sendStatus(403).send({ msg: err.message });
        req.user = user;
        next();
    });
}
// SPECIFIC USER ACCESS
// const authenticationTokenAndAuthorization = (req, res, next) => {
//     authenticationToken(req, res, () => {
//         if (req.user.id === req.params.id || req.params.id || req.user.isAdmin) {
//             next();
//         } else {
//             res.status(403).json("You are not allowes to do that!!");
//         }
//     });
// };
// ADMIN ACCESS
// const authenticationTokenAndAdmin = (req, res, next) => {
//     authenticationToken(req, res, () => {
//         if (req.user.isAdmin){
//         next();
//         } else {
//             res.status(403).json(" You are not allowed to do that ");
//         }
//     });
// }

module.exports = {
    authenticationToken
}