import React, { useContext, useEffect, useState } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {

  const ctx = useContext(AuthContext);
  return (
    <React.Fragment>
     <MainHeader />
        <main>
          {!ctx.isLoggedIn && <Login />}
          {ctx.isLoggedIn && <Home />}
        </main>
    
    </React.Fragment>
  );

  //moving this statement along with login and logout handlers to the auth-context js file to reduce the code in 
  //App component
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {

  //   //to store the user info upon page refresh.
  //   //this will create an infinite loop because after the setting the value in "setIsLoggedIn" function, 
  //   //the entire component will rerun and again it will check for storedUserLoggedInfo and the loop continues.
  //   //so we use useEffect() hook to overcome this pblm. useEffect will allow to run the function only if the 
  //   //dependencies will change.
  //   const storedUserLoggedInInfo = localStorage.getItem('isLoggedIn');
  //   if(storedUserLoggedInInfo === '1'){
  //       setIsLoggedIn(true);
  //   }
  // }, []);

  // const loginHandler = (email, password) => {
  //   // We should of course check email and password
  //   // But it's just a dummy/ demo anyways

  //   //localstorage is the browser storing mechanism as like cookies to store the user information.
  //   //we can give any variable names
  //   localStorage.setItem('isLoggedIn', '1');

  //   setIsLoggedIn(true);
  // };

  // const logoutHandler = () => {
  //   setIsLoggedIn(false);
  //   //to remove the storage info upon clicking logout.
  //   localStorage.removeItem('isLoggedIn');
  // };

  
  // using AuthContext Provider
  // return (
  //   // <React.Fragment>
  //     //we can also pass the function calls through AuthContext provider
  //     <AuthContext.Provider value={
  //       {isLoggedIn: isLoggedIn, 
  //       onLogout: logoutHandler}
  //       }>

  //       <MainHeader />
  //       <main>
  //         {!isLoggedIn && <Login onLogin={loginHandler} />}
  //         {isLoggedIn && <Home onLogout={logoutHandler} />}
  //       </main>
  //     </AuthContext.Provider>
  //   // </React.Fragment>
  // );

  // return (
  //   <React.Fragment>
  //       <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
  //       <main>
  //         {!isLoggedIn && <Login onLogin={loginHandler} />}
  //         {isLoggedIn && <Home onLogout={logoutHandler} />}
  //       </main>
  //   </React.Fragment>
  // );
}

export default App;
