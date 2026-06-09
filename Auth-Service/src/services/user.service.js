const UserRepository = require('../repositories/user.repository');
const CrudService = require('./crud.service');

class UserService extends CrudService {
    constructor() {
        super(new UserRepository());
    }

}

module.exports = UserService;
