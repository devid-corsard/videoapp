import styled from 'styled-components';
import { Comment } from './Comment';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchFailure,
  fetchStart,
  fetchSuccsess,
} from '../redux/commentsSlice.js';
import { useNavigate } from 'react-router-dom';

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background-color: green;
`;

const Input = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 1.5px solid ${({ theme }) => theme.soft};
  width: 100%;
  padding: 10px;
  outline: none;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
`;

const ButtonsWrapper = styled.div`
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 10px;
`;

const CommentButton = styled.button`
  background-color: #3ea6ff;
  border: none;
  border-radius: 3px;
  padding: 10px 15px;
  color: black;
  cursor: pointer;
  &&:disabled {
    background-color: #8f8f8f;
    color: white;
  }
`;

const CancelButton = styled.button`
  background-color: transparent;
  border: none;
  border-radius: 3px;
  padding: 10px 15px;
  color: ${({ theme }) => theme.textSoft};
  cursor: pointer;
`;

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentComments } = useSelector((state) => state.comments);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  // const [comments, setComments] = useState([]);

  const handleCancel = () => {
    setOpen(false);
    setNewComment('');
  };

  const handleComment = () => {
    if (!newComment) return;
    const postComment = async () => {
      dispatch(fetchStart());
      try {
        const res = await axios.post('/comments', {
          videoId,
          desc: newComment,
        });
        // setComments([...comments, res.data]);
        dispatch(fetchSuccsess([...currentComments, res.data]));
        setNewComment('');
        setOpen(false);
      } catch (err) {
        dispatch(fetchFailure());
      }
    };
    postComment();
  };

  useEffect(() => {
    const fetchComments = async () => {
      dispatch(fetchStart());
      try {
        const res = await axios.get(`/comments/${videoId}`);
        dispatch(fetchSuccsess(res.data));
      } catch (err) {
        dispatch(fetchFailure());
      }
    };
    fetchComments();
  }, [videoId, dispatch]);

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser?.img} />
        <Input
          value={newComment}
          onFocus={() => {
            currentUser ? setOpen(true) : navigate('/signin');
          }}
          onInput={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        ></Input>
      </NewComment>
      {open && (
        <ButtonsWrapper>
          <CancelButton onClick={handleCancel}>CANCEL</CancelButton>
          <CommentButton disabled={!newComment} onClick={handleComment}>
            COMMENT
          </CommentButton>
        </ButtonsWrapper>
      )}
      {currentComments
        .map((comment) => <Comment key={comment._id} comment={comment} />)
        .reverse()}
    </Container>
  );
};

export default Comments;
