import './App.css';
import {Login, Register} from './views/Auth'
import Home from './views/Home'
import 'antd/dist/antd.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/">
              <Home/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
