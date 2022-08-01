import {Link} from 'react-router-dom'
const PostCard = ({
    postId , postTitle , postTime
    }) =>{
    
        

       return (
           <>

             <div >
                <Link to = {`post/${postId}`}>
                    <img src="#"></img>
                    <h3>{postTitle}</h3>
                    <p>{postTime}</p>
                </Link>

               
             </div>
            
           </>
       ) 
}

export default PostCard ;