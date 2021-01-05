import { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import LoginContainer from './components/LoginContainer'
import RegisterContainer from './components/RegisterContainer'
import HomePageContainer from './components/HomePageContainer'
import EditAccountContainer from './components/EditAccountContainer'
import { AuthContext } from './context/auth';
import PrivateRoute from './PrivateRoute';
import AddProductContainer from './components/AddProductContainer';
import AddTeamContainer from './components/AddTeamContainer';
import ProductInfoContainer from './components/ProductInfoContainer';

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
        <div className="container-lg">
          <Route path="/login" component={LoginContainer}/>
          <Route path="/register" component={RegisterContainer}/>
          <PrivateRoute exact path="/" component={HomePageContainer}/>
          <PrivateRoute path="/edit-account" component={EditAccountContainer}/>
          <PrivateRoute path="/products/add" component={AddProductContainer}/>
          <PrivateRoute path="/teams/add" component={AddTeamContainer}/>
          <PrivateRoute path="/products/:id" component={ProductInfoContainer}/>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
