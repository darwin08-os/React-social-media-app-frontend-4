import React from 'react'
import data from '../../database/data.json'
import './Story.css'
export default function Story() {
  const viewStory=(id)=>{
        let path = require(`../../database/Stories/${data[id].username}/${data[id].story.storyContent}`)
  }
  return (
    <div className='Story'>
      {data.map((obj,index)=>{
          if(obj.username != JSON.parse(sessionStorage.getItem('userSession')).username){
            if(obj.profilePic != null){
              return <img onClick={viewStory(index)} className='story-profile' key={index} src={require(`../../database/Profiles/${obj.profilePic}`)} height={'100px'} style={{objectFit:'cover'}} width={'100px'} alt="" />  
            }
            else{
            return <img onClick={viewStory(index)} className='story-profile' key={index} src={require(`../../database/Profiles/general.jpeg`)} width={'100px'} height={'100px'} style={{objectFit:'cover'}} alt="" />  
          }
          }
          else{
            return ;
          }
      })}
    </div>
  )
}
