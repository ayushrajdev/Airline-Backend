function filterRequestBody(req, res, next) {
    data = {
        flightNumber: req.body.flightNumber,
        airplaneId: req.body.airplaneId,
        departureAirportId: req.body.departureAirportId,
        arrivalAirportId: req.body.arrivalAirportId,
        arrivalTime: req.body.arrivalTime,
        departureTime: req.body.departureTime,
        price: req.body.price,
        boardingGate: req.body.boardingGate,
        totalSeats: req.body.totalSeats,
    };
    req.body = data;
    next()
}

const flightMiddlewares = {
    filterRequestBody
}

module.exports = flightMiddlewares