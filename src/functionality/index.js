// @flow
/**
 * Makes submarine tickets for a rider.
 *
 * @param {any} riderName The purchaser of the ticket.
 * @returns {void}
 */
function submarineTicketMaker(riderName) {
  console.log(
    `Hello, ${riderName} - You're the ${this.counter +
      1} on the ${rideType}! Have fun!`,
  );
}

/**
 * Makes different tickets depending on the type of ride.
 *
 * @param {any} rideType The ride requested.
 * @returns {function} A specific ticket maker.
 */
function TicketFactory(rideType) {
  const counter = 0;
  switch (rideType) {
    case 'submarine':
      return submarineTicketMaker;
    default:
      console.log(`No ${rideType} that I'm seeing!`);
  }
}

const subTicket = TicketFactory('submarine');
subTicket.toString();
