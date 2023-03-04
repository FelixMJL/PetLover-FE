import "../ContentContainer/Following/Following.css"
import {getFollowing} from "../../services/getFollowing";
import { useState, useEffect } from "react";
import moment from "moment";
import reply from "../../assets/reply.png";

const Following = () => {
    const [postData, setPostData] = useState(0)
    useEffect(() => {
        const getPostData = async () => {
            try {
                const post = await getFollowing();
                setPostData(post.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        getPostData();
    }, []);

    function DataList({ posts }) {
        const list = posts.map((post,i) => 
    <li key={`${post._id}`}>
        <div className="post-container">
            <div className="post-inner-container">
                <div className="avatar">
                    <img src={post.author.avatar} alt=""/>
                </div>
                <div className="post-content-container">
                    <div className="post-info">
                        <div className="nickname">
                            <p><b>{post.author.nickname}</b></p>
                        </div>
                        <div className="username">
                            <p>@{post.author.username}</p>
                        </div>
                        <div className="dot"> · </div>
                        <div className="post-time">
                            <p>{moment(post.created_at).fromNow()}</p>
                        </div>
                    </div>
                    <div className="content">
                        <p>{post.content}</p>
                    </div>
                    <div className="post-pic">
                        <img src={post.photo} alt=""/>
                    </div>
                    <div className="comment">
                        <img src={reply} alt=""/>
                        <p className="comment-count">{post.comments.length}</p>
                    </div>
                </div>
            </div>
        </div>
    </li>
    );
        return <ul>{list}</ul>;
      }

    return (
        <div>
            <div>
                <DataList posts={Array.from(postData)} />
            </div>
            <div className="foot-space"></div>
        </div>
    );
};

export default Following;
