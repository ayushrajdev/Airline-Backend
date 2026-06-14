const {
    getFlightDetails,
    updateRemainingSeatsOfFlight,
} = require('../api/flight.api');
const { sendMessage, publishMessage } = require('../config/message-queue.config');
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

    async cancelBooking(bookingId) {
        const transaction = await db.sequelize.transaction();
        try {
            const bookingDetails = await this.bookingRepository.get({
                data: bookingId,
                transaction,
            });
            console.log(bookingDetails);
            if (bookingDetails.status == CANCELLED) {
                await transaction.commit();
                return true;
            }

            await updateRemainingSeatsOfFlight({ flightId, noOfSeats, dec: 0 });
            await this.bookingRepository.update({
                id: bookingId,
                data: { status: CANCELLED },
                transaction,
            });
            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async makePayment(data) {
        const transaction = await db.sequelize.transaction();
        try {
            const bookingDetails = await this.bookingRepository.get({
                data: data.bookingId,
                transaction,
            });
            if (bookingDetails.status == CANCELLED) {
                throw new AppError(
                    'The booking has expired',
                    StatusCodes.BAD_REQUEST,
                );
            }
            const bookingTime = new Date(bookingDetails.createdAt);
            const currentTime = new Date();
            if (currentTime - bookingTime > 300000) {
                await this.cancelBooking(data.bookingId);
                throw new AppError(
                    'The booking has expired',
                    StatusCodes.BAD_REQUEST,
                );
            }
            if (bookingDetails.totalCost != data.totalCost) {
                throw new AppError(
                    'The amount of the payment doesnt match',
                    StatusCodes.BAD_REQUEST,
                );
            }
            if (bookingDetails.userId != data.userId) {
                throw new AppError(
                    'The user corresponding to the booking doesnt match',
                    StatusCodes.BAD_REQUEST,
                );
            }
            // we assume here that payment is successful
            await this.bookingRepository.update({
                id: data.bookingId,
                data: { status: BOOKED },
                transaction,
            });
            publishMessage({
                recepientEmail: 'cs191297@gmail.com',
                subject: 'Flight booked',
                text: `Booking successfully done for the booking ${data.bookingId}`,
            });
            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async cancelOldBookings() {
        try {
            const time = new Date(Date.now() - 1000 * 300); // time 5 mins ago
            const response = await this.bookingRepository.cancelOldBookings(time); 
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = BookingService;
