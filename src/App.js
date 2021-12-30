import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import { useEffect, useState } from 'react'
import { projectFirestore } from "./firebase/config"

// pages & components
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import ProfSignup from './pages/signup/ProfSignup'
import Navbar from './components/Navbar'
import Module from './pages/module/Module'
import { useCollection } from './hooks/useCollection';
import { useDocument } from './hooks/useDocument'

function App() {
  const { authIsReady, user } = useAuthContext();
  // const [userId, setUserId] = useState("");

  if (authIsReady && user != null) {
    console.log("Current user's ID is " + user.uid)
    projectFirestore.collection('professors').where('uId', '==', user.uid)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const currUser = doc.data()
        localStorage.setItem('currUser', JSON.stringify(currUser))
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
  }

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/">
              {!user && <Redirect to="/login" />}
              {user && <Home />}
            </Route>
            <Route path="/modules/:id">
              {!user && <Redirect to="/login" />}
              {user && <Module />}
            </Route>
            <Route path="/login">
              {user && <Redirect to="/" />}
              {!user && <Login />}
            </Route>
            <Route path="/signup">
              {user && user.displayName && <Redirect to="/" />}
              {!user && <Signup />}
            </Route>
            <Route path="/signupProf">
              {user && user.displayName && <Redirect to="/" />}
              {!user && <ProfSignup />}
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App