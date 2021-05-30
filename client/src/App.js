import './App.css';
import {Login, Register} from './views/Auth'
import Home from './views/Home'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

function App() {
  return (
    <div className="App">
        {/*<Login/>*/}
        <Home/>
    </div>
  );
}

export default App;
