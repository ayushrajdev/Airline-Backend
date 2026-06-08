const {
    getFlightDetails,
    updateRemainingSeatsOfFlight,
} = require('../api/flight.api');
const BookingRepository = require('../repositories/booking.repository');
const AppError = require('../utils/errors/app-error');
const CrudService = require('./crud.service');

class BookingService extends CrudService {
    constructor() {
        super(new BookingRepository());
        this.bookingRepository = new BookingRepository();
    }

    async create(data) {
        const transaction = await db.sequelize.transaction();
        try {
            const flightData = await getFlightDetails(data.flightId);
            if (data.noOfSeats > flightData.totalSeats) {
                throw new AppError(
                    'Not enough seats available',
                    StatusCodes.BAD_REQUEST,
                );
            }
            const totalBillingAmount = data.noOfSeats * flightData.price;
            const bookingPayload = { ...data, totalCost: totalBillingAmount };
            const booking = await this.bookingRepository.create({
                data: bookingPayload,
                transaction,
            });

            await updateRemainingSeatsOfFlight({ flightId, noOfSeats });

            await transaction.commit();
            return booking;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = BookingService;
