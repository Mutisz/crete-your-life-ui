import React from "react";
import { omit } from "lodash";

import { DatePicker } from "material-ui-pickers";
import { ValidatorComponent } from "react-material-ui-form-validator";

class DatePickerValidator extends ValidatorComponent {
  render() {
    const { helperText, ...pickerProps } = this.props;
    const { isValid } = this.state;

    // Remove props that cause errors when passed to DatePicker
    const validPickerProps = omit(pickerProps, [
      "errorMessages",
      "validatorListener"
    ]);

    return (
      <DatePicker
        {...validPickerProps}
        error={!isValid}
        helperText={!isValid ? this.getErrorMessage() : helperText}
      />
    );
  }
}

export default DatePickerValidator;
