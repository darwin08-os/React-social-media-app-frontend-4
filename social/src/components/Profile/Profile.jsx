import { useEffect, useState } from 'react';
import './Profile.css'
import { useLocation, useNavigate } from 'react-router-dom';

export default function Profile(props) {
    const y = useLocation();
    const x = useNavigate();
    
    const [css,setCss] = useState({
        filter: ''
    })
    const [showPost,setShowPost] = useState(null)
    const [postContent,setPostContent] = useState(true)
    let [mainUser, setMainUser] = useState({
        username: "",
        password: "",
        bio:"",
        profilePic: null,
        isPrivate:false,
        followers:[],
        following:[],
        story:{
            added:false,
            storyContent:""
        },
        post : null
        })
    const [showPage, setShowPage] = useState(false)
     
    useEffect(()=>{
        if(sessionStorage.getItem('userSession')!=null){
            setMainUser(JSON.parse(sessionStorage.getItem('userSession')))
            setShowPage(true)
        }
        else{
            if(y.state != null){   
            sessionStorage.setItem('userSession',JSON.stringify(y.state.user))
            setMainUser(y.state.user)
            setShowPage(true)
        }
        else{
            setShowPage(false)
        }
        }
        setPostContent(true)
        
            
    },[y.state,sessionStorage.getItem('login')])

    const handlePostShow=(index)=>{
        setShowPost(`${require(`../../posts/${mainUser.username}/${mainUser.post[index]}`)}`)
        setCss({filter:'blur(10px)'})
    }
    
    const closePost=()=>{
        setShowPost(null)
        setCss({filter:''})
         
    }
  

    return (
        <div className='Profile'>

            {showPost == null ? <></> : 
            <>
            <div className="maincontent" >
                <img src={showPost} className='postitself' />
            <button onClick={closePost} > <big>X</big>  </button>
            </div> 

            </>
            }   

            {!showPage ? <p> plz login first </p> :

                <div style={css}>
                <div className="top-profile">
                    <div className="top-left-profile">
                    <h1>{mainUser.username}</h1>
                    {mainUser.profilePic != null ? <img className='dp' src={require(`../../database/Profiles/${mainUser.profilePic}`)} width='100px' height='100px' /> : <img className='dp' width='100px' height='100px'></img>}
                    </div>

                    <div className="top-right-profile">

                <div className="top-right-top-profile">
                    <div className='followers' >
                    {mainUser.followers.length}
                    <h5>followes</h5>
                    </div>

                    <div className='followings' >
                    {mainUser.following.length}
                    <h5>followings</h5>
                    </div>
                </div>
                

                    <div className="bio">
                    <h4>{mainUser.bio} </h4>
                    </div>
                

                    </div>
                </div>


                <div className="bottom-profile">
                    
                    <div className="bottom-top">
                        <div className='images' onClick={()=>setPostContent(true)} >img</div>
                        <div className='videos' onClick={()=>setPostContent(false)}>tagged</div>
                    </div>
                    <div className="bottom-bottom post-content">
                        {postContent? <>
                            {(JSON.parse(sessionStorage.getItem('userSession')).post).map((image,index)=>{
                                return <img key={index} onClick={(e)=>handlePostShow(index)}  src={require(`../../posts/${mainUser.username}/${image}`)} width={'200px'} height={'200px'} />
                                // console.log((`../../posts/${mainUser.username}/${image}`))

                            })}
                        </> : <></>}
                    </div>
                    
                </div>

                </div>

            }

        </div>
    )
}
