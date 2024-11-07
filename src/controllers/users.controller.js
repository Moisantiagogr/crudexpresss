import {getConnection} from '../database/database';

const getUsers = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM users");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM users WHERE id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const addUser = async (req, res) => {
    try {
        const { name, last_name,age } = req.body;

        if (name === undefined || last_name === undefined || age === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }
        const connection = await getConnection();
        const query = "INSERT INTO users(name,last_name,age) VALUES(?,?,?)";
        const values = [name, last_name, age];
        await connection.query(query, values);
        res.json([{id,...values},{ message: "User added" }]);
        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, last_name, age } = req.body;

        if (id === undefined || name === undefined || last_name === undefined || age === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }

        const user = { name, last_name, age };
        const connection = await getConnection();
        const result = await connection.query("UPDATE users SET ? WHERE id = ?", [user, id]);
        res.json([{id, ...user},{ message: "User updated" }]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}
/*
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const [user] = await connection.query("SELECT * FROM users WHERE id = ?", [id]);
        if (user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        await connection.query("DELETE FROM users WHERE id = ?", [id]);
        res.json([{ message: "User deleted", id }]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}*/
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const [user] = await connection.query("SELECT * FROM users WHERE id = ?", [id]);
        if (!user || user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        await connection.query("DELETE FROM users WHERE id = ?", [id]);
        res.json([{user},{ message: "User deleted", id }]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const patchUser = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const updates = req.body;

        
        const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
        const values = Object.values(updates);
        values.push(id); 
        const query = `UPDATE users SET ${fields} WHERE id = ?`;
        await connection.query(query, values);

        res.status(200).json([{id, ...updates},{ message: 'User updated' }]);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user' });
    }
};
export const methods = {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    patchUser
}