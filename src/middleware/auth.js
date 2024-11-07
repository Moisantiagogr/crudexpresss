import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const header = req.headers['authorization'];
    if (!header) {
        return res.status(403).json({ message: 'No token provided' });
    }
    const token = header.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
         
            return res.status(500).json({ message: 'Failed to authenticate token' });
             
        }
       
        
        req.userId = decoded.id;
        next();
    });
};

export default verifyToken;