import gql from "graphql-tag";

export default gql`
  mutation CreateBooking($booking: BookingCreateInput!) {
    createBooking(data: $booking) {
      number
    }
  }
`;
