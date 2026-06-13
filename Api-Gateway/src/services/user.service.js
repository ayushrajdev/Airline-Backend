const UserRepository = require('../repositories/user.repository');
const CrudService = require('./crud.service');
const { Auth, Enums } = require('../utils/common');
const RoleRepository = require('../repositories/role.repository');
class UserService extends CrudService {
    constructor() {
        super(new UserRepository());
        this.userRepository = new UserRepository();
        this.roleRepository = new RoleRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            const role = await this.roleRepository.getRoleByName(
                Enums.USER_ROLES_ENUMS.CUSTOMER,
            );
            user.addRole(role);
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    async signin(data) {
        try {
            const user = await this.userRepository.getUserByEmail(data.email);
            if (!user) {
                throw new AppError(
                    'No user found for the given email',
                    StatusCodes.NOT_FOUND,
                );
            }
            const passwordMatch = Auth.checkPassword(
                data.password,
                user.password,
            );
            if (!passwordMatch) {
                throw new AppError('Invalid password', StatusCodes.BAD_REQUEST);
            }

            const jwt = Auth.createToken({ id: user.id, email: user.email });
            return jwt;
        } catch (error) {
            if (error instanceof AppError) throw error;
            console.log(error);
            throw new AppError(
                'Something went wrong',
                StatusCodes.INTERNAL_SERVER_ERROR,
            );
        }
    }

    static async isAuthenticated(token) {
        try {
            if (!token) {
                throw new AppError(
                    'Missing JWT token',
                    StatusCodes.BAD_REQUEST,
                );
            }
            const response = Auth.verifyToken(token);
            const user = await this.userRepository.get(response.id);
            if (!user) {
                throw new AppError('No user found', StatusCodes.NOT_FOUND);
            }
            return user.id;
        } catch (error) {
            if (error instanceof AppError) throw error;
            if (error.name == 'JsonWebTokenError') {
                throw new AppError(
                    'Invalid JWT token',
                    StatusCodes.BAD_REQUEST,
                );
            }
            if (error.name == 'TokenExpiredError') {
                throw new AppError(
                    'JWT token expired',
                    StatusCodes.BAD_REQUEST,
                );
            }
            console.log(error);
            throw new AppError(
                'Something went wrong',
                StatusCodes.INTERNAL_SERVER_ERROR,
            );
        }
    }
}

module.exports = UserService;
