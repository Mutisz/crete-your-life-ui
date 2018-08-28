import React, { Component } from "react";
import { curryRight, constant } from "lodash";

import { Query } from "react-apollo";
import MaskWithBackground from "../Mask/MaskWithBackground";

const withQuery = curryRight(
  (
    WrappedComponent,
    query,
    queryProps = {},
    propsToVariables = constant({})
  ) => {
    class WithQuery extends Component {
      render = () => {
        const variables = propsToVariables(this.props);
        return (
          <Query {...queryProps} query={query} variables={variables}>
            {renderProps => {
              const { loading, error } = renderProps;
              if (loading) {
                return <MaskWithBackground messageKey="loading" />;
              } else if (error) {
                return <MaskWithBackground messageKey="error" color="error" />;
              }

              return <WrappedComponent {...this.props} {...renderProps} />;
            }}
          </Query>
        );
      };
    }

    WithQuery.displayName = `WithQuery(${WrappedComponent.displayName})`;

    return WithQuery;
  },
  4
);

export default withQuery;
