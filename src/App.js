import React from "react";
import { Route, Switch } from "react-router-dom";
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

function App() {
  return (
    <Switch>
      <Route exact path="/admin/panel/" component={AdminIndex} />
      <Route exact path="/admin/panel/papers" component={AdminPapers} />
      <Route exact path="/admin/panel/search" component={AdminSearch} />
      <Route exact path="/admin/panel/add/" component={AdminChoiceAndTheory} />
      <Route exact path="/admin/panel/add/mcqs" component={AdminAddmcqs} />
      <Route exact path="/admin/panel/add/papers" component={AdminAddBoard} />
      <Route exact path="/admin/panel/add/theory" component={AdminAddTheory} />
      <Route
        exact
        path="/d/a/t/a/e/n/t/r/y/o/p/e/r/a/t/o/r/"
        component={AddDataOperator}
      />
    </Switch>
  );
}

export default App;
