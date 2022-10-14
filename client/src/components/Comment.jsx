import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import TimeAgo from 'timeago-react';

const Container = styled.div`
  display: flex;
  gap: 20px;
  margin: 30px 0px;
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

export const Comment = ({ comment }) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(`/users/find/${comment.userId}`);
      setChannel(res.data);
    };
    fetchComment();
  }, [comment.userId]);

  return (
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
    </Container>
  );
};
