import './App.css';
import {Login, Register, ResetPassword} from './views/Auth'
import Home from './views/Home'
import Landing from './views/Landing'
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

          <Route exact path='/'>
              <Landing/>
          </Route>

          <Route path="/home">
              <Home/>
          </Route>

          <Route path="/login">
            <Login/>
          </Route>

          <Route path="/register">
            <Register/>
          </Route>

          <Route paty="/reset-password">
              <ResetPassword/>
          </Route>

        </Switch>
      </Router>
  );
}

export default App;
