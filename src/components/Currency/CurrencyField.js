import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { flow } from "lodash";
import { getCurrencyLocale, convert } from "../../helpers/currencyHelper";

import { translate } from "react-i18next";
import withQuery from "../hoc/withQuery";

import Currency from "react-currency-formatter";

import preferencesProp from "../PropTypes/preferencesPropType";

const CURRENCY_FIELD_QUERY = gql`
  {
    preferences @client {
      currency {
        code
        rate
      }
    }
  }
`;

const enhance = flow(
  translate(),
  withQuery(CURRENCY_FIELD_QUERY, {})
);

const CurrencyField = ({
  i18n: { language },
  data: {
    preferences: {
      currency: { code, rate }
    }
  },
  amount
}) => (
  <Currency
    currency={code}
    quantity={convert(amount, rate)}
    locale={getCurrencyLocale(language)}
  />
);

CurrencyField.propTypes = {
  i18n: PropTypes.object.isRequired,
  data: PropTypes.shape({
    preferences: preferencesProp.isRequired
  }).isRequired,
  amount: PropTypes.number.isRequired
};

export default enhance(CurrencyField);
