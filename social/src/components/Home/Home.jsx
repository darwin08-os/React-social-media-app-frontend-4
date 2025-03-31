import React, { useState } from 'react'
import data from '../../database/data.json'
import './Home.css'
import Post from '../Post/Post'
export default function Home() {

  const [css,setCss] = useState({
    filter: ''
})

  const [showStory,setShowStory] = useState(null)
  const viewStory=(id)=>{
    const path = require(`../../database/Stories/${data[id].username}/${data[id].story.storyContent}`)
    setCss({filter : 'blur(10px)'})
    setShowStory(path)
}
const handleClose=()=>{
  setShowStory(null)
  setCss({filter: ''})
}
  return (
    <div className='Home'>

    {
      sessionStorage.getItem('login')?
      <>
      <div className="story-content"  style={{...css}}>
       
      <div className='Story'>
      {data.map((obj,index)=>{
          if(obj.username != JSON.parse(sessionStorage.getItem('userSession')).username){
            if(obj.profilePic != null){
              return <img onClick={()=>viewStory(index)} className='story-profile' key={index} src={require(`../../database/Profiles/${obj.profilePic}`)} height={'100px'} style={{objectFit:'cover'}} width={'100px'} alt="" />  
            }
            else{
            return <img onClick={()=>viewStory(index)} className='story-profile' key={index} src={require(`../../database/Profiles/general.jpeg`)} width={'100px'} height={'100px'} style={{objectFit:'cover'}} alt="" />  
          }
          }
          else{
            return ;
          }
      })}
    </div>
         
      </div>


<div className="posts"  style={{...css}}>
        <Post/>
      </div>
      </> : <>plz login first</>
      }
    
<div className="story">
  {showStory? <>
    <img width={'700px'} src={showStory} />  
    <button onClick={handleClose}>close</button>
  </> : ' '}
</div>
 
    </div>
   
  
  )
}
