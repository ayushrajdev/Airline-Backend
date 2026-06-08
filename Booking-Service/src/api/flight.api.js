const serverConfig = require("../config/server.config");

async function getFlightDetails(flightId) {
    const flight = await axios.get(
        `${serverConfig.FLIGHT_SERVICE_SERVER_URL}/api/v1/flights/${data.flightId}`,
    );
    return (data = flight.data.data);
}

async function updateRemainingSeatsOfFlight({ noOfSeats, flightId }) {
    await axios.patch(
        `${serverConfig.FLIGHT_SERVICE_SERVER_URL}/api/v1/flights/${flightId}/seats`,
        {
            seats: noOfSeats,
        },
    );
    
}

module.exports = {
    getFlightDetails,
    updateRemainingSeatsOfFlight,
};
