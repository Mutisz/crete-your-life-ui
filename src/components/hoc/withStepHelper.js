import React, { Component } from "react";
import { curryRight } from "lodash";
import createStepHelper from "../../helpers/stepHelper";

const withStepHelper = curryRight((WrappedComponent, steps) => {
  const stepHelper = createStepHelper(steps);
  class WithStepHelper extends Component {
    render = () => <WrappedComponent {...this.props} stepHelper={stepHelper} />;
  }

  WithStepHelper.displayName = `WithStepHelper(${
    WrappedComponent.displayName
  })`;

  return WithStepHelper;
});

export default withStepHelper;
