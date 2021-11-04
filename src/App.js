import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";

// Components
import {
  AdminIndex,
  AdminPapers,
  AdminAddmcqs,
  AdminAddBoard,
  AdminChoiceAndTheory,
  AdminSearch,
  AdminAddTheory,
  AddDataOperator,
} from "./AdminPanel/Components/LazyImports/LocalComponents";
// Bootstrap and Styles
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import "./AdminPanel/css/Style.css";
import UrlChangeTracker from "./AdminPanel/Components/UrlChangeTracker";

function App() {
  const history = useHistory();
  //To track the routes of visitors
  UrlChangeTracker(history);
  return (
    <Switch>
      <Route exact path="/data/admin/panel/" component={AdminIndex} />
      <Route exact path="/data/admin/panel/papers" component={AdminPapers} />
      <Route exact path="/data/admin/panel/search" component={AdminSearch} />
      <Route
        exact
        path="/data/admin/panel/add/"
        component={AdminChoiceAndTheory}
      />
      <Route exact path="/data/admin/panel/add/mcqs" component={AdminAddmcqs} />
      <Route
        exact
        path="/data/admin/panel/add/papers"
        component={AdminAddBoard}
      />
      <Route
        exact
        path="/data/admin/panel/add/theory"
        component={AdminAddTheory}
      />
      <Route exact path="/poweruser" component={AddDataOperator} />
    </Switch>
  );
}

export default App;
