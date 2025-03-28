import './App.css';

import { Route,Navigate, Routes } from 'react-router-dom';
import Profile from './pages/Profile/Profile';
import Auth from './pages/Auth/Auth';
import { useSelector } from 'react-redux';
import Home from './pages/home/Home';
function App() {
  
  const user = useSelector((state) => state.authReducer.authData);

  return (
    
     // eslint-disable-next-line
    <div className="App">
    <div className = "blur" style={{top:'-18%',right:'0'}}></div>
    <div className = "blur" style={{top:'36%',left:'-8rem'}} ></div>
    <Routes>

    <Route
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
        />
        <Route path='/home' element={user?<Home/>:<Navigate to='../auth'/>}/>

        <Route
          path="/auth"
          element={user ? <Navigate to="../home" /> : <Auth />}
        />

          <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="../auth" />}
        />

    </Routes>
    </div>
  );
}
export default App;