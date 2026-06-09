const CrudRepository = require('./crud.repository');
const db = require('../models/index');
const CrudRepository = require('./crud-repository');

class UserRepository extends CrudRepository {
    constructor() {
        super(db.User);
        this.User = db.User;
    }

}

module.exports = UserRepository;
