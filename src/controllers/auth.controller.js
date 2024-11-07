import { getConnection } from '../database/database';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const connection = await getConnection();
        const [result] = await connection.query('SELECT * FROM auth WHERE username = ?', [username]);

        if (!result || result.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = result;
      
        
        if (!user || !user.password) {
            return res.status(500).json({ message: "Password not found for user" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
/*
const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

const password = '12345678';
encryptPassword(password).then(hashedPassword => {
    console.log('Hashed Password:', hashedPassword);
});
*/
export const methods = {
    login
};