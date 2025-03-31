import React, { useEffect, useState } from 'react'
import data from '../../database/data.json'
import './Home.css'
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
  const [mainPOST,setMainPosts] = useState([])
  let imgArray = []
  // console.log(imgArray)
  useEffect(()=>{
    if(sessionStorage.getItem('login')){
    let arr = data.map((obj,index)=>{

        if(obj.username != JSON.parse(sessionStorage.getItem('userSession')).username){
          for (let i = 0; i < obj.post.length; i++) {
            return obj.post.map((post)=>{
              return require('../../posts/' + post)
            })
          }
        }
      })
     
      imgArray = arr.filter((arin)=>{
        if(arin != undefined){
          return arin
        }
      })
      const newArr = imgArray
      imgArray = []
      for (let i = 0; i < newArr.length; i++) {
        imgArray = [...imgArray,...newArr[i]]
      }
      setMainPosts(imgArray)
    }
    
  },[sessionStorage.getItem('userSession')])




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
              return <div className='story-main'>
              <img onClick={()=>viewStory(index)} className='story-profile' key={index} src={require(`../../database/Profiles/${obj.profilePic}`)} height={'100px'} style={{objectFit:'cover'}} width={'100px'} alt="" />  
              <p>{obj.username}</p>
              </div> 
            }
          }
          else{
            return ;
          }
      })}
    </div>
         
      </div>


<div className="posts"  style={{...css}}>
        {mainPOST.map((obj,index)=>{
               return <div className='post'> 
                <img src={obj} key={index} width={'40%'} />
                <div className='post-buttons'>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 512 512">
  <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
</svg> 

<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 640 512"><path d="M208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 38.6 14.7 74.3 39.6 103.4c-3.5 9.4-8.7 17.7-14.2 24.7c-4.8 6.2-9.7 11-13.3 14.3c-1.8 1.6-3.3 2.9-4.3 3.7c-.5 .4-.9 .7-1.1 .8l-.2 .2s0 0 0 0s0 0 0 0C1 327.2-1.4 334.4 .8 340.9S9.1 352 16 352c21.8 0 43.8-5.6 62.1-12.5c9.2-3.5 17.8-7.4 25.2-11.4C134.1 343.3 169.8 352 208 352zM448 176c0 112.3-99.1 196.9-216.5 207C255.8 457.4 336.4 512 432 512c38.2 0 73.9-8.7 104.7-23.9c7.5 4 16 7.9 25.2 11.4c18.3 6.9 40.3 12.5 62.1 12.5c6.9 0 13.1-4.5 15.2-11.1c2.1-6.6-.2-13.8-5.8-17.9c0 0 0 0 0 0s0 0 0 0l-.2-.2c-.2-.2-.6-.4-1.1-.8c-1-.8-2.5-2-4.3-3.7c-3.6-3.3-8.5-8.1-13.3-14.3c-5.5-7-10.7-15.4-14.2-24.7c24.9-29 39.6-64.7 39.6-103.4c0-92.8-84.9-168.9-192.6-175.5c.4 5.1 .6 10.3 .6 15.5z"/></svg>
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 512 512"><path d="M307 34.8c-11.5 5.1-19 16.6-19 29.2l0 64-112 0C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96l96 0 0 64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z"/></svg>
                </div>
               </div> 
        })}
      </div>
      </> : <>plz login first</>
      }
    
<div className="story">
  {showStory? <>
    <img width={'700px'} src={showStory} />  
    <button onClick={handleClose}>
    <svg xmlns="http://www.w3.org/2000/svg" width={'30'} height={'30'} viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg> 
    </button>
  </> : ' '}
</div>
 
    </div>
   
  
  )
}
