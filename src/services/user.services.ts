import getConnection from "config/database"

const handleCreateUser = async (name: string, email: string, address: string) => {
    const connection = await getConnection();
    try {
        const sql = 'INSERT INTO `users`(`name`, `email`,`address`) VALUES (?,?,?)';
        const values = [name, email, address]
        const [result, fields] = await connection.execute(sql, values);
        return result;

    } catch (err) {
        console.log(err);
        return [];
    }
}
const getAllUsers = async () => {
    const connection = await getConnection();
    try {
        const [results, fields] = await connection.query(
            'SELECT * FROM `users`'
        );
        return results;

    } catch (err) {
        console.log(err);
        return [];
    }

}

const handleDeleteUser = async (id: string) => {
    const connection = await getConnection();
    try {
        const sql = 'DELETE FROM `users` WHERE `id` = ? LIMIT 1';
        const [result] = await connection.execute(sql, [id])
        return result;
    } catch (err) {
        throw (err)
    }
}
const handleViewUser = async (id: string) => {
    const connection = await getConnection();
    try {
        const sql = 'SELECT * FROM `users` WHERE `id` = ?'
        const [result] = await connection.execute(sql, [id])
        return result[0];
    } catch (err) {
        throw (err)
    }

}
const handleUpdateUser = async (name: string, email: string, address: string, id: string) => {
    const connection = await getConnection();
    try {
        const sql = 'UPDATE `users` SET `name` = ? ,`email` = ? ,`address` = ? WHERE `id` = ? LIMIT 1';
        const values = [name, email, address, id];
        const [result] = await connection.execute(sql, values)
        return result;
    } catch (err) {
        throw (err)
    }
}

export { handleCreateUser, getAllUsers, handleDeleteUser, handleViewUser, handleUpdateUser }