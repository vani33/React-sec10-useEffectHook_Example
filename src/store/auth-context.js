import React, {useState, useEffect} from 'react';

const AuthContext = React.createContext(
    {isLoggedIn :  false, 
    onLogout: () => {},
    onLogin:  (email,password) => {}
    });

export const AuthContextProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {

        //to store the user info upon page refresh.
        //this will create an infinite loop because after the setting the value in "setIsLoggedIn" function, 
        //the entire component will rerun and again it will check for storedUserLoggedInfo and the loop continues.
        //so we use useEffect() hook to overcome this pblm. useEffect will allow to run the function only if the 
        //dependencies will change.
        const storedUserLoggedInInfo = localStorage.getItem('isLoggedIn');
        if(storedUserLoggedInInfo === '1'){
            setIsLoggedIn(true);
        }
      }, []);

    const loginHandler = (email, password) => {

        //localstorage is the browser storing mechanism as like cookies to store the user information.
        //we can give any variable names
        localStorage.setItem('isLoggedIn', '1');
    
        setIsLoggedIn(true);
      };
    
      const logoutHandler = () => {
        setIsLoggedIn(false);
        //to remove the storage info upon clicking logout.
        localStorage.removeItem('isLoggedIn');
      };

    return <AuthContextProvider value={{isLoggedIn: isLoggedIn, onLogout:logoutHandler, onLogin:loginHandler}}>
        {props.children}
    </AuthContextProvider>
};

export default AuthContext;