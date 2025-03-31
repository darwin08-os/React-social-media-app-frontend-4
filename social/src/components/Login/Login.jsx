import { useEffect, useState } from 'react'
import './Login.css'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Login(props) {
    const x = useNavigate()
    

 
    
    const arr = props.data
    const [input, setInput] = useState({
        username : '',
        password : ''
    })
    const [error, setError] = useState('')
    const [isLogin,setIsLogin] = useState(true)// first it was true
    const handleUserName = (val) => {
        setInput({...input,username:val})
    }
    const handlePassword=(val)=>{
        setInput({...input,password:val})
    }
    const handle = () => {
        sessionStorage.setItem('login',JSON.stringify({login : true}))
        let obj = arr.find((obj) => obj.username === input.username && obj.password === input.password)
        if (obj) {
            x('/profile', { state: {user:obj} })
        }
        else {
            setError('username or password incorrect!')
            setTimeout(()=>{
                setError('')
            },2000)
            
        }
    }
 
     
    return (
        
         
            <> 
            <div className='Login' >
            <input onChange={(e) => handleUserName(e.target.value)} placeholder='username' className='form-control' type='text' value={input.username} /> <br />
            <input onChange={(e) => handlePassword(e.target.value)} placeholder='password' className='form-control' type='password' value={input.password} /> <br />
            <button onClick={handle} className='btn'>Login</button>
            <br />
            <span>{error}</span> <br />
            </div>
            </>  
   
    )
}