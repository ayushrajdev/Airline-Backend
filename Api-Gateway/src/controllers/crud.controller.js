const { CLIENT_RENEG_LIMIT } = require('node:tls');
const successResponse = require('../utils/response');

class CrudController {
    constructor(service) {
        this.service = service;
    }

    create = async (req, res, next) => {
        try {
            const payload = req.body;
            const data = await this.service.create(payload);
            return successResponse(res, { data });
        } catch (err) {
            next(err);
        }
    };

    delete = async (req, res, next) => {
        try {
            const data = await this.service.delete(req.params.id);
            return successResponse(res, { data });
        } catch (err) {
            next(err);
        }
    };
    get = async (req, res,next) => {
        try {
            const data = await this.service.get(req.params.id);
            successResponse(res, { data });
        } catch (err) {
            next(err);
        }
    };
    getAll = async (req, res,next) => {
        try {
            console.log("inside crud controller")
            const data = await this.service.getAll();
            successResponse(res, { data });
        } catch (err) {
            next(err);
        }
    };
    update = async (req, res,next) => {
        try {
            const data = await this.service.update(req.params.id, req.body);
            successResponse(res, { data });
        } catch (err) {
            next(err);
        }
    };
}

module.exports = CrudController;
