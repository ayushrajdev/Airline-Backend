const { StatusCodes } = require('http-status-codes');

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create({ data, transaction = null }) {
        // Fixed spelling
        const response = await this.model.create(data, { transaction });
        return response;
    }

    async delete({ data, transaction = null }) {
        // Combined 'where' and 'transaction' into a single options object
        const response = await this.model.destroy({
            where: {
                id: data,
            },
            transaction // Fixed spelling and object structure
        });

        return response;
    }

    async get({ data, transaction = null }) {
        
        const response = await this.model.findByPk(data, { transaction });
        return response;
    }

    async getAll() {
        const response = await this.model.findAll();
        return response;
    }

    async update({ data, id, transaction = null }) {
        
        const response = await this.model.update(data, {
            where: {
                id: id,
            },
            transaction 
        });

        return response;
    }
}

module.exports = CrudRepository;