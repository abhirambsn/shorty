import { useState } from 'react'
import './App.css'
import { Login } from './Components/Login'
import { Register } from './Components/Register'
import { Dashboard } from './Components/dashboard'
import { BrowserRouter, Route, Switch ,Link} from "react-router-dom";
function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <>
    <Dashboard/>
  
    {/* <div className="App">
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      }
    </div> */}
    {/* <BrowserRouter>
          <Switch>
          <Route exact path="/" component={Login} />
            <Route path="/signup" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
    </BrowserRouter> */}
    </>
  );
}

export default App
