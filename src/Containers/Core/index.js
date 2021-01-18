import {ThemeProvider} from '@material-ui/core'
import Theme from '../../Themes/MuiTheme';
import Signup from '../Signup'
import Login from '../Login'
import React,{useEffect} from 'react';
import { Switch} from 'react-router-dom'
import useLocalStorage from '../../customHooks/useLocalStorage'
import Navbar from '../../Components/Navbar';
import * as firebaseCalls from '../../services/firebase'
import Pots from '../Pots'
import GiftPlants from '../GiftPlants'
import Bowls from '../Bowls'
import Seed from '../Seed'
import {Route} from 'react-router-dom'
import app from '../../services/firebase'
import Plants from '../Plants'
import EditItem from '../EditItem/'
import CreateItem from '../CreateItem/'
import ProtectedRoute from '../../ProtectedRoutes/ProtectedRoute'
function App() {
  const [loginAuthenticated,setLoginAuthenticated] = useLocalStorage('loggedin',false)
  const [loggedinUser,setLoggedinUser] = useLocalStorage('user',{})
  useEffect(()=>{
    function initiateApp(){
      app.auth().onAuthStateChanged((user)=>{
        if(user){
          let data = {
            id:user.uid,
            email:user.email
          }
          setLoggedinUser(data)
          setLoginAuthenticated(true)
        }
        else{
          setLoggedinUser({})
          setLoginAuthenticated(false)
        }
      })
  } 
    initiateApp()
  },[])
  
  const handleSignupSubmit = async(email,password)=>{
    await firebaseCalls.addUser(email,password)
  }
  const handleUserLogoutclick =async()=>{
    await firebaseCalls.logoutUser()
  }

  const handleLoginSubmit = async(email,password)=>{
    await firebaseCalls.loginUser(email,password)
  }
  return (
    <ThemeProvider theme={Theme}>
      <Navbar onLogout={handleUserLogoutclick} 
      loggedinUser={loggedinUser} 
      authFinder={loginAuthenticated}
      />
      <Switch>
        <ProtectedRoute
          exact
          path="/edit/:collectionName/:id"
          component={EditItem}
          appProps={{authFinder:loginAuthenticated,to:"/",loggedinUser:loggedinUser}}
        />
        <ProtectedRoute
          exact
          path="/create/:collectionName"
          component={CreateItem}
          appProps={{authFinder:loginAuthenticated,to:"/",loggedinUser:loggedinUser}}
        />
        <Route
          exact
          path='/'
          render={(props) => (
            <Plants {...props} loggedinUser={loggedinUser}  />
          )}
        />
      <Route
          exact
          path='/signup'
          render={(props) => (
            <Signup {...props} setLoggedinUser={setLoggedinUser}  />
          )}
        />
      <Route
          exact
          path='/login'
          render={(props) => (
            <Login {...props} setLoggedinUser={setLoggedinUser} />
          )}
        />
        <Route
          exact
          path='/pots'
          render={(props) => (
            <Pots {...props} loggedinUser={loggedinUser} />
          )}
        />
        <Route
          exact
          path='/gift/plants'
          render={(props) => (
            <GiftPlants {...props} loggedinUser={loggedinUser} />
          )}
        />
        <Route
          exact
          path='/bowls'
          render={(props) => (
            <Bowls {...props} loggedinUser={loggedinUser} />
          )}
        />
        <Route
          exact
          path='/seed'
          render={(props) => (
            <Seed {...props} loggedinUser={loggedinUser} />
          )}
        />
      </Switch>
     </ThemeProvider> 
  )
  }
 export default App