import {useParams} from 'react-router-dom'
import { useState } from 'react'

const Post =({posts}) => {
    var id = useParams()
    const [post, setPost] = useState(posts.find((post) => post._id ===id))
    return(
        <>
            <h1>{post.title}</h1>
            <img src= {post.title} />
            <p>{post.text}</p>
            <h6>{post.timestamp}</h6>

        </>
    )
}


export default Post ;