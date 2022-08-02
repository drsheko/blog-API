import { useEffect, useState } from "react"
const Comments =({postId}) => {
    var id = postId ;
    const [comments, setComments] = useState([]);
    const [ isHidden ,setIshidden] = useState(true);

    const handleChange = (e) => {
        setIshidden(!isHidden)
    }
    useEffect(()=>{
        const fetchComments = async() =>{
            try{
                var url = `http://localhost:3001/api/posts/${id}/comments`
            
                var res = await fetch(url , {mode : 'cors'})
                var data = await res.json();
                setComments(data.data.comments)
                console.log(data.data.comments)
            }catch(err){
                console.log(err)
            }
        }
        fetchComments()

    },[])

    return(
        <div>
            <button onClick={handleChange}>comments</button>
            {
                isHidden !== true
                ?   comments.length>0
                    ?   <>
                        {comments.map(comment =>
                        <h5>{comment.text}</h5>
                        )}
                        </>
                    
                    : null 
                : null     
            }
  
        </div>
    )
}
export default Comments;