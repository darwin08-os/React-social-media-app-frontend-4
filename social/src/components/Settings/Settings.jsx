import {useEffect, useState} from 'react'
import './Settings.css'
export default function Settings() {

  const [isPrivate,setIsPrivate] = useState()

  
 

  useEffect(()=>{
    if(sessionStorage.getItem('userSession')){
      setIsPrivate(JSON.parse(sessionStorage.getItem('userSession')).isPrivate)
    }
    else{
      setIsPrivate(false)
    }  
},[sessionStorage])

const handlePrivate=()=>{
  setIsPrivate(!isPrivate)
  let obj = JSON.parse(sessionStorage.getItem('userSession'))
  sessionStorage.removeItem('userSession')
  obj.isPrivate = !isPrivate
sessionStorage.setItem('userSession',JSON.stringify(obj))
}

  return (
    <div>

  <div className="Settings">
{
  sessionStorage.getItem('userSession')? <>
          { isPrivate?<>
            <button onClick={handlePrivate} className={`privacy-Setting ${isPrivate? 'bg-success' : ''}`} >private your account
         </button>
         <h2 className='private-status'> private</h2>
          </> :
          <>
          <button onClick={handlePrivate} className={`privacy-Setting ${isPrivate? '' : 'bg-danger'}`} >private your account
          </button>
          <h2 className='private-status'>not private</h2>
          </>
        }
        </>
       :
       <p>login first</p>
}

      </div>
    </div>
  )
}
