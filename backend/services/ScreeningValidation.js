
const checkSeatAvailability = (bookedSeats, seats) => {
  for (let i = 0; i < bookedSeats.length; i++) {
    const bookedSeat = bookedSeats[i];
    for (let j = 0; j < seats.length; j++) {
      var seat = seats[j];
      if (bookedSeat.row === seat.row && bookedSeat.col === seat.col) {
        return false;
      }
    }
  }
  return true;
};

const getSeats = (mapRows, tickets) => {
    const result = [];
    for (let i = 0; i < mapRows.length; i++) {
      const row = mapRows[i];
      for (let j = 0; j < row.length; j++) {
        const mapSeat = row[j];
        for (var k = 0; k < tickets.length; k++) {
          var ticket = tickets[k];
          if (mapSeat.col === ticket.col && mapSeat.row === ticket.row) {
            result.push(mapSeat); 
          }
        }
      }
    }
    return result;
};

module.exports = {checkSeatAvailability, getSeats}