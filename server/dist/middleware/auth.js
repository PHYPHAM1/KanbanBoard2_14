import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    // TODO: verify the token exists and add the user data to the request object
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1]; //extract the token from the header
        const secretKey = process.env.JWT_SECRET_KEY || ''; //get the secret key from the environment variable  
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403); //Send forbidden status if the token is invalid
            }
            req.user = user; //attach the user data to the request object
            return next(); //call the next middleware function(NextFunction)
        });
    }
    else {
        res.sendStatus(401); //send unauthorized status if the token is missing
    }
};
