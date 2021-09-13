import React, { useContext } from 'react';
import AuthContext from '../../store/auth-context';

import classes from './Navigation.module.css';

const Navigation = () => {
  
  //using useContext hook in place of AuthContext
  //useContext hook is used to pass on the data from one component to many components. in most of the cases
  //we use props for this.
  const ctx = useContext(AuthContext);
  return (
    <nav className={classes.nav}>
        <ul>
          {ctx.isLoggedIn && (
            <li>
              <a href="/">Users</a>
            </li>
          )}
          {ctx.isLoggedIn && (
            <li>
              <a href="/">Admin</a>
            </li>
          )}
          {ctx.isLoggedIn && (
            <li>
              <button onClick={ctx.onLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
      
  );

  //using AuthContext Provider
  // return (
  //   <AuthContext.Consumer>
  //     {(ctx) => {<nav className={classes.nav}>
  //       <ul>
  //         {ctx.isLoggedIn && (
  //           <li>
  //             <a href="/">Users</a>
  //           </li>
  //         )}
  //         {ctx.isLoggedIn && (
  //           <li>
  //             <a href="/">Admin</a>
  //           </li>
  //         )}
  //         {ctx.isLoggedIn && (
  //           <li>
  //             <button onClick={props.onLogout}>Logout</button>
  //           </li>
  //         )}
  //       </ul>
  //     </nav>}}
      
  //   </AuthContext.Consumer>
  // );

  // return (
  //   <nav className={classes.nav}>
  //       <ul>
  //         {props.isLoggedIn && (
  //           <li>
  //             <a href="/">Users</a>
  //           </li>
  //         )}
  //         {props.isLoggedIn && (
  //           <li>
  //             <a href="/">Admin</a>
  //           </li>
  //         )}
  //         {props.isLoggedIn && (
  //           <li>
  //             <button onClick={props.onLogout}>Logout</button>
  //           </li>
  //         )}
  //       </ul>
  //     </nav>
  //   );
};

export default Navigation;
