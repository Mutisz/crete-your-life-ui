import React, { Component } from "react";
import { curryRight, constant, get } from "lodash";

import { Query } from "react-apollo";
import MaskWithBackground from "../Mask/MaskWithBackground";

const withQuery = curryRight((WrappedComponent, query, options) => {
  class WithQuery extends Component {
    render = () => {
      const queryProps = get(options, "queryProps", {});
      const propsToVariables = get(options, "propsToVariables", constant({}));
      const variables = propsToVariables(this.props);
      return (
        <Query {...queryProps} query={query} variables={variables}>
          {renderProps => {
            const { loading, error } = renderProps;
            if (loading) {
              return get(
                options,
                "loadingMask",
                <MaskWithBackground messageKey="loading" />
              );
            } else if (error) {
              return get(
                options,
                "errorMask",
                <MaskWithBackground messageKey="error" color="error" />
              );
            }

            return <WrappedComponent {...this.props} {...renderProps} />;
          }}
        </Query>
      );
    };
  }

  WithQuery.displayName = `WithQuery(${WrappedComponent.displayName})`;

  return WithQuery;
});

export default withQuery;
