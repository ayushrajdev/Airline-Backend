function validateBookingCreationRequest(req, res, next) {
    req.body = {
        flightId: req.body.flightId,
        userId: req.body.userId,
        noOfSeats: req.body.nooffSeats,
    };
    next();
}


module.exports ={validateBookingCreationRequest}