const CrudController = require('../../../Flight-Service/src/controllers/crud.controller');
const UserService = require('../services/user.service');

class UserController extends CrudController {
    constructor() {
        super(new UserService());
        this.userService = new UserService();
    }
    async signin(req, res) {
        try {
            const user = await this.userService.signin({
                email: req.body.email,
                password: req.body.password,
            });
            SuccessResponse.data = user;
            return res.status(StatusCodes.CREATED).json(SuccessResponse);
        } catch (error) {
            console.log(error);
            ErrorResponse.error = error;
            return res.status(error.statusCode).json(ErrorResponse);
        }
    }

    async addRoleToUser(req, res) {
        try {
            const user = await this.userService.addRoletoUser({
                role: req.body.role,
                id: req.body.id,
            });
            SuccessResponse.data = user;
            return res.status(StatusCodes.CREATED).json(SuccessResponse);
        } catch (error) {
            console.log(error);
            ErrorResponse.error = error;
            return res.status(error.statusCode).json(ErrorResponse);
        }
    }
}

module.exports = UserController;
