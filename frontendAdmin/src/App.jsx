import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import Admin from './Components/Pages/Admin/Admin';
import Login from './Components/Pages/Admin/Login';

const App = ()=>{

  return(
    <div>
        <Navbar />
        
        <Admin />
    </div>
  )
}

export default App;