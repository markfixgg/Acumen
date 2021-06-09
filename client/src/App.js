import './App.css';
import {Login, Register, ResetPassword} from './views/Auth'
import Profile from "./views/User/Profile";
import Settings from "./views/User/Settings";
import PrivateRoute from "./components/PrivateRoute";
import Home from './views/Home'
import Landing from './views/Landing'
import 'antd/dist/antd.css';
import UserProvider from "./components/UserProvider";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
      <UserProvider>
          <Router>
            <Switch>

              <Route exact path='/'>
                  <Landing/>
              </Route>

              <Route path="/home">
                  <PrivateRoute Component={Home}/>
              </Route>

              <Route path="/login">
                <Login/>
              </Route>

              <Route path="/register">
                <Register/>
              </Route>

              <Route path="/reset-password">
                  <ResetPassword/>
              </Route>

              <Route path="/profile">
                  <PrivateRoute Component={Profile}/>
              </Route>

              <Route path="/settings">
                  <PrivateRoute Component={Settings}/>
              </Route>

              <Route path='*'>
                  Not found!
              </Route>

            </Switch>
          </Router>
      </UserProvider>

  );
}

export default App;
