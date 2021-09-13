import React, { useEffect, useState, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

//using useEffect hooks

// const Login = (props) => {
//   const [enteredEmail, setEnteredEmail] = useState('');
//   const [emailIsValid, setEmailIsValid] = useState();
//   const [enteredPassword, setEnteredPassword] = useState('');
//   const [passwordIsValid, setPasswordIsValid] = useState();
//   const [formIsValid, setFormIsValid] = useState(false);

//   //this will execute only if there is a change in enteredUsername and password
//   useEffect(() => {
    
//     const identifier = setTimeout(() => {
//       console.log('Checking form validilty');
//       setFormIsValid(
//         enteredEmail.includes('@') && enteredPassword.trim().length > 6
//       );
//     }, 500)

//     return () => {
//       console.log('CLEANUP');
//       clearTimeout(identifier);
//     }
    
//   }, [enteredEmail,enteredPassword])
  
  
//   const emailChangeHandler = (event) => {
//     setEnteredEmail(event.target.value);

//     // setFormIsValid(
//     //   event.target.value.includes('@') && enteredPassword.trim().length > 6
//     // );
//   };

//   const passwordChangeHandler = (event) => {
//     setEnteredPassword(event.target.value);

//     //writing this code in common to both email and password handlers at above.
//     // setFormIsValid(
//     //   event.target.value.trim().length > 6 && enteredEmail.includes('@')
//     // );
//   };

//   const validateEmailHandler = () => {
//     setEmailIsValid(enteredEmail.includes('@'));
//   };

//   const validatePasswordHandler = () => {
//     setPasswordIsValid(enteredPassword.trim().length > 6);
//   };

//   const submitHandler = (event) => {
//     event.preventDefault();
//     props.onLogin(enteredEmail, enteredPassword);
//   };

//   return (
//     <Card className={classes.login}>
//       <form onSubmit={submitHandler}>
//         <div
//           className={`${classes.control} ${
//             emailIsValid === false ? classes.invalid : ''
//           }`}
//         >
//           <label htmlFor="email">E-Mail</label>
//           <input
//             type="email"
//             id="email"
//             value={enteredEmail}
//             onChange={emailChangeHandler}
//             onBlur={validateEmailHandler}
//           />
//         </div>
//         <div
//           className={`${classes.control} ${
//             passwordIsValid === false ? classes.invalid : ''
//           }`}
//         >
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             value={enteredPassword}
//             onChange={passwordChangeHandler}
//             onBlur={validatePasswordHandler}
//           />
//         </div>
//         <div className={classes.actions}>
//           <Button type="submit" className={classes.btn} disabled={!formIsValid}>
//             Login
//           </Button>
//         </div>
//       </form>
//     </Card>
//   );
// };


//using useReducer() hook

const emailReducer = (state, action) => {

  if(action.type === 'USER_INPUT'){
    return {value: action.val, isValid: action.val.includes('@')};
  }
  if(action.type === 'INPUT_BLUR'){
    return {value: state.value, isValid: state.value.includes('@')};
  }
  return {value: '', isValid: false};
};

const passwordReducer = (state,action) => {
  if(action.type === 'USER_PASSWORD'){
    return {value:action.val, isValid:action.val.trim().length > 6}
  }
  if(action.type === 'PASSWORD_BLUR'){
    return {value: state.value , isValid:state.value.trim().length > 6};
  }
  return {value: '', isValid: false};
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
     const [formIsValid, setFormIsValid] = useState(false);

  
  const [emailState, dispatchEmail] = useReducer(emailReducer,{value: '', isValid: false});

  const [passwordState, dispatchPassword]= useReducer(passwordReducer,{value: '', isValid: false});
  
  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  //it is object destructing, accessing the required value from the object.
  //isValid is the property name that is required from the object, giving the alias name (emailIsValid) by 
  //seperating them with colon
  const { isValid: emailIsValid} = emailState;
  const { isValid: passwordIsValid} = passwordState;

  //this will execute only if there is a change in enteredUsername and password
   useEffect(() => {
    
     const identifier = setTimeout(() => {
       console.log('Checking form validilty');
       setFormIsValid(
         emailIsValid && passwordIsValid
       );
     }, 500)

     return () => {
       console.log('CLEANUP');
       clearTimeout(identifier);
     }
    
   }, [emailIsValid,passwordIsValid]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({type: 'USER_INPUT', val:event.target.value});

    //  setFormIsValid(
    //    event.target.value.includes('@') && passwordState.isValid
    //  );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type: 'USER_PASSWORD', val: event.target.value});
    
    //  setFormIsValid(
    //    event.target.value.trim().length > 6 && emailState.isValid
    //  );
  };

  

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    console.log('validateEmailHandler');
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(passwordState.isValid);
    dispatchPassword({type: 'PASSWORD_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // props.onLogin(emailState.value, passwordState.value);
    // authCtx.onLogin(emailState.value, passwordState.value);
    if(formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    }
    else if(!emailIsValid){
      emailInputRef.current.focus();
    }
    else{
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        {/* moving this email and password divs to the Input.js file */}
        {/* <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div> */}

        {/* <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div> */}
        
        <Input type="email" 
          ref={emailInputRef}
          id="email" 
          label="E-mail" 
          value={emailState.value} 
          onChange={emailChangeHandler} 
          onBlur={validateEmailHandler}
        />

        <Input type="password" 
          ref={passwordInputRef}
          id="password" 
          label="Password" 
          value={passwordState.value} 
          onChange={passwordChangeHandler} 
          onBlur={validatePasswordHandler}
        />

        
        <div className={classes.actions}>
          {/* <Button type="submit" className={classes.btn} disabled={!formIsValid}> */}
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
