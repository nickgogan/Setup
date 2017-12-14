function TicketFactory(rideType) {
  const counter = 0;
  switch (rideType) {
    case 'submarine':
      return function(riderName) {
        this.counter++;
        console.log(
          `Hello, ${riderName}! Have fun on the ${rideType}!`,
        );
      };
  }
}

const submarineTicket = TicketFactory('yellowSubmarine');
console.log(submarineTicket);
