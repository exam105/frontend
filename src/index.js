import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

// React Redux
import allReducers from './reducers/index'
import {createStore} from 'redux'
import { Provider } from 'react-redux'
import StateLoader  from './reducers/PresistedState'
const stateLoader = new StateLoader();

let store = createStore(allReducers, stateLoader.loadState(), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => {
    stateLoader.saveState(store.getState());
});

ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>
    ,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// import React from 'react';
// import './App.css';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import AdminIndex from './AdminPanel/Pages/AdminIndex';
// import AdminAddmcqs from './AdminPanel/Pages/AdminAddmcqs';
// import AdminAddBoard from './AdminPanel/Pages/AdminAddBoard';
// import AdminAddImages from './AdminPanel/Pages/AdminAddImages';
// import AdminChoiceAndTheory from './AdminPanel/Pages/AdminChoiceAndTheory';
// import AdminPapers from './AdminPanel/Pages/AdminPapers';
// import AdminAddTheory from './AdminPanel/Pages/AdminAddTheory.js';
// import AddDataOperator from './AdminPanel/Pages/AddDataOperator';

// // Importing Bootstrap
// import 'bootstrap/dist/css/bootstrap.css'

// function App() {
//   return (
//     <Router>
//       <Switch>
//         <Route exact path="/admin/panel/" component={AdminIndex} />
//         <Route exact path="/admin/panel/papers" component={AdminPapers} />
//         <Route  exact path="/admin/panel/add/" component={AdminChoiceAndTheory} />
//         <Route  exact path="/admin/panel/add/mcqs" component={AdminAddmcqs} />
//         <Route  exact path="/admin/panel/add/papers" component={AdminAddBoard} />
//         <Route  exact path="/admin/panel/add/theory" component={AdminAddTheory} />
//         <Route  exact path="/admin/panel/add/images" component={AdminAddImages} />
//         <Route  exact path="/d/a/t/a/e/n/t/r/y/o/p/e/r/a/t/o/r/" component={AddDataOperator} />
//       </Switch>
//     </Router>
//   );
// }

// export default App;

