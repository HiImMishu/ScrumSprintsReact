import { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import LoginContainer from './components/LoginContainer'
import RegisterContainer from './components/RegisterContainer'
import { AuthContext } from './context/auth';
import PrivateRoute from './PrivateRoute';

function App() {
  const existingToken = localStorage.getItem("token")
  const [authToken, setAuthToken] = useState(existingToken)

  const setToken = (data) => {
    localStorage.setItem("token", data)
    setAuthToken(data)
  }

  return (
    <AuthContext.Provider value={{authToken, setAuthToken: setToken}}>
      <Router>
        <div className="container">
          <Route path="/login" component={LoginContainer}/>
          <Route path="/register" component={RegisterContainer}/>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
