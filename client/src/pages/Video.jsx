import {
  AddTaskOutlined,
  ReplyOutlined,
  ThumbDown,
  ThumbDownOffAltOutlined,
  ThumbUp,
  ThumbUpAltOutlined,
} from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Comments from '../components/Comments';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  fetchSuccsess,
  fetchFailure,
  fetchStart,
  like,
  dislike,
} from '../redux/videoSlice.js';
import { subscription } from '../redux/userSlice.js';
import TimeAgo from 'timeago-react';
import Recommendation from '../components/Recommendation';

const Container = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 1rem;
`;

const Content = styled.div`
  /* flex: 5; */
`;

const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

const ChannelDetails = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.span`
  font-weight: 500;
`;
const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  font-size: 12px;
  color: ${({ theme }) => theme.text};
`;

const Description = styled.p`
  font-size: 14px;
`;

const SubscribeButton = styled.button`
  background-color: #cc1a00;
  border: none;
  border-radius: 3px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 16px;
  height: max-content;
  cursor: pointer;
  /* &&:hover {
    background-color: #878787;
    &&:before {
      content: 'UNSUBSCRIBE';
    }
    span {
      display: none;
    }
  } */
`;

const VideoFrame = styled.video`
  max-height: 720px;
  max-width: 100%;
  object-fit: cover;
`;

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);

  const dispatch = useDispatch();
  const path = useLocation().pathname.split('/')[2];

  const [channel, setChannel] = useState({});

  useEffect(() => {
    dispatch(fetchStart());
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/videos/find/${path}`);
        const channelRes = await axios.get(
          `/users/find/${videoRes.data.userId}`
        );

        setChannel(channelRes.data);
        dispatch(fetchSuccsess(videoRes.data));
      } catch (err) {
        dispatch(fetchFailure());
      }
    };

    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    await axios.put(`/users/like/${currentVideo._id}`);
    dispatch(like(currentUser._id));
  };

  const handleDislike = async () => {
    await axios.put(`/users/dislike/${currentVideo._id}`);
    dispatch(dislike(currentUser._id));
  };

  const handleSub = async () => {
    currentUser.subscribedUsers.includes(channel._id)
      ? await axios.put(`/users/unsub/${channel._id}`)
      : await axios.put(`/users/sub/${channel._id}`);
    dispatch(subscription(channel._id));
  };

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo?.videoUrl} controls />
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>
            {currentVideo?.views} views •{' '}
            <TimeAgo datetime={currentVideo?.createdAt} />
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentUser && currentVideo?.likes.includes(currentUser._id) ? (
                <ThumbUp />
              ) : (
                <ThumbUpAltOutlined />
              )}
              {currentVideo?.likes.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentUser &&
              currentVideo?.dislikes.includes(currentUser._id) ? (
                <ThumbDown />
              ) : (
                <ThumbDownOffAltOutlined />
              )}
              Dislike
            </Button>
            <Button>
              <ReplyOutlined />
              Share
            </Button>
            <Button>
              <AddTaskOutlined />
              Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel.img} />
            <ChannelDetails>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers} Subscribers</ChannelCounter>
              <Description>{currentVideo?.desc}</Description>
            </ChannelDetails>
          </ChannelInfo>
          <SubscribeButton onClick={handleSub}>
            {currentUser?.subscribedUsers.includes(channel._id) ? (
              <span>SUBSCRIBED</span>
            ) : (
              <span>SUBSCRIBE</span>
            )}
          </SubscribeButton>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo?._id} />
      </Content>
      <Recommendation tags={currentVideo?.tags} />
    </Container>
  );
};

export default Video;
