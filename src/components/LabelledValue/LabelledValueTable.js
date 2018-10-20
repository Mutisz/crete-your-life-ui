import React from "react";
import PropTypes from "prop-types";
import { flow, map } from "lodash";

import { withStyles } from "@material-ui/core/styles";
import { translate } from "react-i18next";

import Typography from "@material-ui/core/Typography";

const styles = {
  dataTable: {
    minWidth: "25%",
    textAlign: "left"
  }
};

const enhance = flow(
  withStyles(styles),
  translate()
);

const LabelledValueTableRow = ({ t, label, value }) => (
  <tr>
    <th scope="row">{t(label)}</th>
    <td>{value}</td>
  </tr>
);

LabelledValueTableRow.propTypes = {
  t: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired
};

const LabelledValueTable = ({ classes, t, valueList }) => (
  <Typography variant="body1" component="div">
    <table className={classes.dataTable}>
      <tbody>
        {map(valueList, ({ label, value }) => (
          <LabelledValueTableRow
            key={label}
            t={t}
            label={label}
            value={value}
          />
        ))}
      </tbody>
    </table>
  </Typography>
);

LabelledValueTable.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  valueList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.node.isRequired
    })
  ).isRequired
};

export default enhance(LabelledValueTable);
