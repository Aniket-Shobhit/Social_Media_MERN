import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from 'state';
import PostWidget from './PostWidget';
import CircularProgress from '@mui/material/CircularProgress';

const PostsWidget = ({ userId, isProfile = false }) => {

    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);
    const [isFetching, setIsFetching] = useState(false);

    const getPosts = async () => {
        const response = await fetch(`${process.env.REACT_APP_URL}/posts`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
        setIsFetching(false);
    };

    const getUserPosts = async () => {
        const response = await fetch(
        `${process.env.REACT_APP_URL}/posts/${userId}/posts`,
        {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        }
        );
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
        setIsFetching(false);
    };

    useEffect(() => {
        setIsFetching(true);
        if (isProfile) {
            getUserPosts();
        } 
        else {
            getPosts();
        }
    }, []); 
    // eslint-disable-line react-hooks/exhaustive-deps

    return (
    <>
        {isFetching ?  <CircularProgress sx={{ml:'16rem', mt:'3rem'}} disableShrink /> : (posts.map(
            ({
                _id,
                userId,
                firstName,
                lastName,
                description,
                location,
                pictureUrl,
                userPictureUrl,
                likes,
                comments,
            }) => (
            <PostWidget
                key={_id}
                postId={_id}
                postUserId={userId}
                name={`${firstName} ${lastName}`}
                description={description}
                location={location}
                pictureUrl={pictureUrl}
                userPictureUrl={userPictureUrl}
                likes={likes}
                comments={comments}
            />
            )
        ))}
    </>
  );
};

export default PostsWidget;