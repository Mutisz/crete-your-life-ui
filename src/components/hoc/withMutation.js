import React, { Component } from "react";
import { curryRight } from "lodash";

import { Mutation } from "react-apollo";
import MaskWithBackground from "../Mask/MaskWithBackground";

const withMutation = curryRight(
  (WrappedComponent, mutation, mutationProps = {}) => {
    class WithMutation extends Component {
      render = () => (
        <Mutation {...mutationProps} mutation={mutation}>
          {(mutate, { loading, error, data }) => {
            if (loading) {
              return <MaskWithBackground messageKey="loading" />;
            } else if (error) {
              return <MaskWithBackground messageKey="error" color="error" />;
            }

            return (
              <WrappedComponent
                {...this.props}
                mutate={mutate}
                mutateResult={data}
              />
            );
          }}
        </Mutation>
      );
    }

    WithMutation.displayName = `WithMutation(${WrappedComponent.displayName})`;

    return WithMutation;
  },
  3
);

export default withMutation;
