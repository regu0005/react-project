//UserContext.js
import { createContext, useState, useContext } from 'react';
import { useLocalStorage } from '../hooks/UseLocalStorage';

const UserContext = createContext(); //create the context object

// component:::
function UserProvider(props) {
  //create the provider object
  //it has a props object just like all component functions
//   const [user, setUser] = useState(''); // value , reference
    const [user, setUser] = useLocalStorage('MyUserAppLocalStorage', null) ;   // using option 222222
  //state variable to hold the User

  return <UserContext.Provider value={[user, setUser]} {...props} />;
  //create and return a Context-Provider component.
  //it must have a value property which holds the state variable and a function
  //the function is usually the set function returned by useState...but can be another
  //{...props} destructuring adds any other props passed into the provider
  //These props will include ALL the components nested inside the Provider (children)!
}

// custom hook:::
function useUser() {
  //create a custom hook that can be called from components
  const context = useContext(UserContext);
  //we use the built-in useContext hook to access our own Context object.
  if (!context) throw new Error('Not inside the Provider');
  return context; // [user, setUser]
  //we are returning our own state variable and function from UserContext Provider
}

//export the hook and the provider
export { useUser, UserProvider };