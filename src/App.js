import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import AdminIndex from "./AdminPanel/Pages/AdminIndex";
import AdminPapers from "./AdminPanel/Pages/AdminPapers";
// Bootstrap and Styles
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
// Components
const AdminAddmcqs = React.lazy(() =>
  import("./AdminPanel/Pages/AdminAddmcqs")
);
const AdminAddBoard = React.lazy(() =>
  import("./AdminPanel/Pages/AdminAddBoard")
);
const AdminChoiceAndTheory = React.lazy(() =>
  import("./AdminPanel/Pages/AdminChoiceAndTheory")
);
const AdminSearch = React.lazy(() => import("./AdminPanel/Pages/AdminSearch"));
const AdminAddTheory = React.lazy(() =>
  import("./AdminPanel/Pages/AdminAddTheory.js")
);
const AddDataOperator = React.lazy(() =>
  import("./AdminPanel/Pages/AddDataOperator")
);

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/admin/panel/" component={AdminIndex} />
        <Route exact path="/admin/panel/papers" component={AdminPapers} />
        <Route exact path="/admin/panel/search" component={AdminSearch} />
        <Route
          exact
          path="/admin/panel/add/"
          component={AdminChoiceAndTheory}
        />
        <Route exact path="/admin/panel/add/mcqs" component={AdminAddmcqs} />
        <Route exact path="/admin/panel/add/papers" component={AdminAddBoard} />
        <Route
          exact
          path="/admin/panel/add/theory"
          component={AdminAddTheory}
        />
        <Route
          exact
          path="/d/a/t/a/e/n/t/r/y/o/p/e/r/a/t/o/r/"
          component={AddDataOperator}
        />
      </Switch>
    </Suspense>
  );
}

export default App;
