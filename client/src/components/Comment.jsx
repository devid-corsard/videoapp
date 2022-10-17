import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import TimeAgo from 'timeago-react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentMenu from './CommentMenu';
import { useSelector, useDispatch } from 'react-redux';
import { deleteComment, editComment } from '../redux/commentsSlice';
import ConfirmPopUp from './ConfirmPopUp';

const Container = styled.div`
  display: flex;
  gap: 20px;
  margin: 30px 0px;
  position: relative;
  color: ${({ theme }) => theme.textSoft};
  &&:hover .menu {
    visibility: visible;
  }
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: green;
`;

const Details = styled.div`
  width: 100%;
  margin-right: 24px;
  color: ${({ theme }) => theme.text};
`;

const Name = styled.span`
  font-weight: 500;
  font-size: 13px;
`;

const Time = styled.span`
  margin-left: 5px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
`;

const Text = styled.p`
  margin-top: 5px;
  font-size: 14px;
`;

const EditComment = styled.div`
  right: 10px;
  width: 40px;
  height: 40px;
  position: absolute;
  visibility: hidden;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  &&:active {
    background-color: ${({ theme }) => theme.soft};
  }
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

export const Comment = ({ comment }) => {
  const [channel, setChannel] = useState({});
  const [editedDesc, setEditedDesc] = useState(comment.desc);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deletePopup, setDelete] = useState(false);

  const menuRef = useRef();
  const dispatch = useDispatch();

  const handleCancel = () => {
    setEdit(false);
  };

  const handleEditComment = async () => {
    if (comment.desc === editedDesc) return;

    try {
      const res = await axios.put(`/comments/${comment._id}`, {
        desc: editedDesc,
      });
      dispatch(editComment(res.data));
    } catch (err) {}
    setEdit(false);
  };

  const handleDeleteComment = async () => {
    setDelete(false);
    try {
      await axios.delete(`/comments/${comment._id}`);
      dispatch(deleteComment(comment._id));
    } catch (err) {}
  };

  useEffect(() => {
    const fetchOwner = async () => {
      const res = await axios.get(`/users/find/${comment.userId}`);
      setChannel(res.data);
    };
    fetchOwner();
  }, [comment.userId]);

  return (
    <>
      <Container>
        <Avatar src={channel.img} />
        <Details>
          <Name>
            {channel.name}
            <Time>
              <TimeAgo datetime={comment.createdAt} />
            </Time>
          </Name>
          {edit ? (
            <>
              <Input
                defaultValue={comment.desc}
                onInput={(e) => setEditedDesc(e.target.value)}
              ></Input>
              <ButtonsWrapper>
                <CancelButton onClick={handleCancel}>CANCEL</CancelButton>
                <CommentButton
                  disabled={comment.desc === editedDesc}
                  onClick={handleEditComment}
                >
                  UPDATE
                </CommentButton>
              </ButtonsWrapper>
            </>
          ) : (
            <Text>{comment.desc}</Text>
          )}
        </Details>
        <EditComment className="menu" ref={menuRef}>
          <MoreVertIcon
            onClick={() => {
              setOpen(!open);
            }}
          />
        </EditComment>
        {open && (
          <CommentMenu
            comment={comment}
            setOpen={setOpen}
            setEdit={setEdit}
            setDelete={setDelete}
            pos={{
              x: menuRef.current.getBoundingClientRect().left,
              y: menuRef.current.getBoundingClientRect().bottom,
            }}
          />
        )}
        {deletePopup && (
          <ConfirmPopUp
            title="Delete comment"
            desc="Delete your comment permanently?"
            setPopup={setDelete}
            callback={handleDeleteComment}
          />
        )}
      </Container>
    </>
  );
};
