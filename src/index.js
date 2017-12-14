// @ts-check
/**
 * <Description goes here>
 *
 * @param {any} riderName
 */
function submarineTicketMaker(riderName) {
  console.log(
    `Hello, ${riderName} - You're the ${this.counter +
      1} on the ${rideType}! Have fun!`,
  );
}

/**
 *
 *
 * @param {any} rideType
 * @returns
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
