const CrudController = require('../../../Flight-Service/src/controllers/crud.controller');
const UserService = require('../services/user.service');

class UserController extends CrudController {
    constructor() {
        super(new UserService());
    }
}

module.exports = UserController;
