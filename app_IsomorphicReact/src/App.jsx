import React from 'react';
import { connect, } from 'react-redux';

const AppDisplay = () => (
  <div>
    <h1>Isomorphic React</h1>
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  ...state,
});

/**
 * The connected component exported below forms the
 * core of our application and is used both on the server and the client
 */
export default AppDisplay;
// export default connect(mapStateToProps)(AppDisplay);
