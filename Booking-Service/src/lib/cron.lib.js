const cron = require('node-cron');
const BookingService = require('../services/booking.service');

const bookingService = new BookingService();

function scheduleCancelBooking() {
    cron.schedule('*/30 * * * * *', async () => {
        console.log('running a task every minute');
        await bookingService.cancelOldBookings();
    });
}

function scheduleCron() {
    scheduleCancelBooking();
}

module.exports = scheduleCron;
