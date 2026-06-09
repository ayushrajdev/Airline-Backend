const CrudRepository = require('./crud.repository');
const db = require('../models/index');
const CrudRepository = require('./crud-repository');

class UserRepository extends CrudRepository {
    constructor() {
        super(db.User);
        this.User = db.User;
    }
    async getUserByEmail(email) {
        const user = await this.User.findOne({ where: { email: email } });
        return user;
    }
}

module.exports = UserRepository;
