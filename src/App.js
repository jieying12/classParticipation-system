import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { query, where } from "firebase/firestore";

// pages & components
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import ProfSignup from './pages/signup/ProfSignup'
import Navbar from './components/Navbar'
import Module from './pages/module/Module'
import { useCollection } from './hooks/useCollection';

function App() {
  const { authIsReady, user } = useAuthContext();
  const [userId, setUserId] = useState("");
  const profRef = useCollection("professors");

  useEffect(() => {
    if (authIsReady === true && user !== null) {
      console.log(user.uid);
      setUserId(user.uid);
    }
  }, []);

  console.log("Professors ", profRef.documents)
  //To iterate through professors to find whether account exists
  console.log(userId);

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