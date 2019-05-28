import gql from "graphql-tag";

export default gql`
  query Booking {
    bookingStatus @client {
      activeStep
      fromDateString
      toDateString
      personCount
      email
      phone
      dateActivitySelected
      dateActivities {
        dateString
        name
      }
    }
    preferences @client {
      currency {
        code
        rate
      }
    }
    activities {
      name
      shortDescription
      description
      pricePerPerson
      minPersonCount
      maxPersonCount
      images {
        isThumbnail
        url
      }
      translations {
        language
        name
        shortDescription
        description
      }
    }
  }
`;
