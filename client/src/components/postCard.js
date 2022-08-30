import {Link} from 'react-router-dom'
const PostCard = ({
    postId , postTitle , postTime, postPicture
    }) =>{
    
            

       return (
           <div className='col'>
            <div className="card" style={{'width':'18rem'}} >
                <img src={require(`../images/${postPicture}`)} class="card-img-top" alt="image"/>
                <div className="card-body">
                    <h5 className="card-title">{postTitle}</h5>
                    <p className="card-text">{postTime}</p>
                    <a href={`/posts/${postId}`} class="btn btn-primary">Read more</a>
                </div>
            </div>  
           </div>
       ) 
}

export default PostCard ;