import React from "react";
import { withRouter } from "react-router-dom";
import ReactGA from "react-ga";

const UrlChangeTracker = ({ history }) => {
  history.listen((location, action) => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  });

  return <div></div>;
};

export default withRouter(UrlChangeTracker);
