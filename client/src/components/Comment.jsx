import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import TimeAgo from 'timeago-react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentMenu from './CommentMenu';
import { useSelector, useDispatch } from 'react-redux';

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

export const Comment = ({ comment }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [channel, setChannel] = useState({});
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(`/users/find/${comment.userId}`);
      setChannel(res.data);
    };
    fetchComment();
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
          <Text>{comment.desc}</Text>
        </Details>
        <EditComment className="menu" ref={menuRef}>
          <MoreVertIcon
            onClick={() => {
              setOpen(!open);
            }}
          />
        </EditComment>
      </Container>
      {open && (
        <CommentMenu
          owner={currentUser._id === comment.userId}
          setOpen={setOpen}
          pos={{
            x: menuRef.current.getBoundingClientRect().left,
            y: menuRef.current.getBoundingClientRect().bottom,
          }}
        />
      )}
    </>
  );
};
