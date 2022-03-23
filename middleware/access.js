require('dotenv').config();
const jwt = require('jsonwebtoken');

// FOR SUBCRIBER ACCESS
function authToken (req, res, next) {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(" ")[1];
    if(!token || token == null) 
    return res.sendStatus(401).send({ msg: "User not logged in"})

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, subscriber) => {
        if(err) res.sendStatus(403).send({ msg: err.message });
        req.subscriber = subscriber;
        next();
    });
}
// SPECIFIC SUBSCRIBER ACCESS
const authTokenAndAuthorization = (req, res, next) => {
    authToken(req, res, () => {
        if (req.subscriber.id === req.params.id || req.params.id || req.subscriber.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not authorized!!");
        }
    });
};
// ADMIN ACCESS
const authTokenAndAdmin = (req, res, next) => {
    authToken(req, res, () => {
        if (req.subscriber.isAdmin){
        next();
        } else {
            res.status(403).json(" You are not authorized");
        }
    });
}

module.exports = {
    authToken,
    authTokenAndAuthorization,
    authTokenAndAdmin
}