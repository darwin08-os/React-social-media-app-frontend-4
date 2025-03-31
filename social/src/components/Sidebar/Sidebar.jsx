import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import { NavLink,useNavigate } from 'react-router-dom'
export default function Sidebar(props) {
  const x = useNavigate();

  const [log,setLog] = useState(sessionStorage.getItem('login'))

  useEffect(()=>{
  setLog(sessionStorage.getItem('login'))
  },[sessionStorage.getItem('login')])


  const handleLogout=()=>{
    x('/')
    props.logoutfun()
    setLog(!log)
  }

  return (
    <div className='Sidebar'>
      <ul>{!log? <li><NavLink to='/'   activeclassname='active'>Login</NavLink></li> : <li><button onClick={handleLogout} style={{background:'none',border:'none'}} >logout</button></li>}
        
        <li><NavLink to='/profile' activeclassname='active'>profile</NavLink></li>
        <li><NavLink to='/settings' activeclassname='active'>settings</NavLink></li>
        <li><NavLink to='/home' activeclassname='active'>Home</NavLink></li>
      </ul>
    </div>
  )
}
