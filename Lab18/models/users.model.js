const db = require("../util/database");
const bcrypt = require("bcryptjs")

module.exports = class User {
    constructor(my_user) {
        this.nombre = my_user.nombre || 'Marie';
        this.email = my_user.email || 'Marie123';
        this.password = my_user.password || 'MarieMarieMarie';
    }
    save() {
        return bcrypt.hash(this.password, 12)
        .then((password_cifrado) =>{
            return db.execute(`
                INSERT INTO Usuarios (nombre, email, password) VALUES(?, ?, ?)`,
                [this.nombre, this.email, this.password]);
        })
        .catch((error) => {console.log(error)});
    }
    static fetchOne(email) {
        return db.execute(`
        SELECT *
        FROM Usuarios
        WHERE email = ?
        `, [email]);
    }
}