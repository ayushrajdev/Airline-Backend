const { StatusCodes } = require('http-status-codes');

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        const response = await this.model.create(data);
        return response;
    }

    async delete(data) {
        const response = await this.model.destroy({
            where: {
                id: data,
            },
        });

        // if (!response) {
        //     throw new AppError(
        //         'Not able to find the resource',
        //         StatusCodes.NOT_FOUND
        //     );
        // }

        return response;
    }

    async get(data) {
        console.log(data)
        const response = await this.model.findByPk(data);

        // if (!response) {
        //     throw new AppError(
        //         'Not able to find the resource',
        //         StatusCodes.NOT_FOUND
        //     );
        // }

        return response;
    }

    async getAll() {
        console.log('inside getAll');
        const response = await this.model.findAll();
        return response;
    }

    async update(id, data) {
        const response = await this.model.update(data, {
            where: {
                id: id,
            },
        });

        return response;
    }
}

module.exports = CrudRepository;