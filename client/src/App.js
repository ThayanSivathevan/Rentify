import React, { useEffect, createContext, useReducer,useContext } from 'react'
import './App.css';
import Signin from './components/screens/signin'
import Signup from './components/screens/signup'
import Navbar from './components/navbar'
import Home from './components/screens/home'
import Orders from './components/screens/orders'
import Search from './components/screens/search'
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import { reducer, initialState } from './reducers/UserReducer'
export const UserContext = createContext()
const Routing=()=>{
  const history = useHistory()
  const{state,dispatch}=useContext(UserContext)
  useEffect(()=>{
    const user= JSON.parse(localStorage.getItem("user"))
    
    if(user){
      dispatch({type:"USER",payload:user})
    }
    else{
        history.push('/signin')
    }
  },[])
  return (
    <Switch>
      <Route exact path="/signin">
            <Signin></Signin>
      </Route>
      <Route exact path="/signup">
           <Signup></Signup> 
      </Route>
      <Route exact path="/orders">
           <Orders /> 
      </Route>
      <Route exact path="/">
             <Home/> 
      </Route>
      <Route exact path="/search/:make/:price/:city/:date">
             <Search/> 
      </Route>
    </Switch>
  )


}
function App() {
  const [state,dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routing />
      </BrowserRouter>
    </UserContext.Provider >
  );
}

export default App;
