const CrudRepository = require('./crud.repository');
const db = require('../models/index');
const { Op } = require("sequelize");
const CrudRepository = require('./crud-repository');
const {Enums} = require('../utils/common');
const { CANCELLED, BOOKED } = Enums.BOOKING_STATUS;

class BookingRepository extends CrudRepository {
    constructor(parameters) {
        super(db.Booking);
        this.Booking = db.Booking;
    }

    async create({ data, transaction }) {
        const response = await this.Booking.create(data, {
            transaction: transaction,
        });
        return response;
    }

    async cancelOldBookings(timestamp) {
        console.log('in repo');
        const response = await this.Booking.update(
            { status: CANCELLED },
            {
                where: {
                    [Op.and]: [
                        {
                            createdAt: {
                                [Op.lt]: timestamp,
                            },
                        },
                        {
                            status: {
                                [Op.ne]: BOOKED,
                            },
                        },
                        {
                            status: {
                                [Op.ne]: CANCELLED,
                            },
                        },
                    ],
                },
            },
        );
        return response;
    }
}

module.exports = BookingRepository;
