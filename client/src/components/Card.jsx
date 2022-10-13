import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import TimeAgo from 'timeago-react';

const Container = styled.div`
  width: ${({ type }) => type !== 'small' && '340px'};
  margin-bottom: ${({ type }) => (type === 'small' ? '10px' : '45px')};
  cursor: pointer;
  display: ${({ type }) => type === 'small' && 'flex'};
  gap: 10px;
`;

const Image = styled.img`
  /* width: max-content; */
  width: 100%;
  height: ${({ type }) => (type === 'small' ? '120px' : '200px')};
  background-color: gray;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${({ type }) => type !== 'small' && '16px'};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #aaa;
  display: ${({ type }) => type === 'small' && 'none'};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin-bottom: ${({ type }) => type === 'small' && '10px'};
`;

const ChannelName = styled.h2`
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
  margin: ${({ type }) => (type === 'small' ? '5px 0px' : '9px 0px')};
  font-weight: ${({ type }) => type === 'small' && '400'};
`;

const Info = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type, video }) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`/users/find/${video.userId}`);
      setChannel(res.data);
    };
    fetchChannel();
  }, [video.userId]);
  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: 'none' }}>
      <Container type={type}>
        <Image type={type} src={video.imgUrl} />
        <Details type={type}>
          <ChannelImage type={type} src={channel.img} />
          <Texts>
            <Title type={type}>{video.title}</Title>
            <ChannelName type={type}>{channel.name}</ChannelName>
            <Info>
              {video.views} views • <TimeAgo datetime={video.createdAt} />
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
