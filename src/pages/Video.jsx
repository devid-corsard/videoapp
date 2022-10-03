import {
  AddTaskOutlined,
  ReplyOutlined,
  ThumbDownOffAltOutlined,
  ThumbUpAltOutlined,
} from '@mui/icons-material';
import React from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import Comments from '../components/Comments';

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
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
`;

const Recomendations = styled.div`
  flex: 2;
`;

const Video = () => {
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <iframe
            width="100%"
            height="560"
            src="https://www.youtube.com/embed/tWIlcYXDeis"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </VideoWrapper>
        <Title>video title</Title>
        <Details>
          <Info>239K views • 8 days ago</Info>
          <Buttons>
            <Button>
              <ThumbUpAltOutlined />
              123
            </Button>
            <Button>
              <ThumbDownOffAltOutlined />
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
            <Image src="https://yt3.ggpht.com/hcGB-JGcd7qtdV4Z5bUXpT0khAWIn0RDmimZpCVN-IubWeDz9SYX8C9qYi1oRXq5tOZy2aim9yg=s88-c-k-c0x00ffffff-no-rj" />
            <ChannelDetails>
              <ChannelName>Channel name</ChannelName>
              <ChannelCounter>343K Subscribers</ChannelCounter>
              <Description>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
                optio aliquid exercitationem necessitatibus repellat sapiente
                fuga ratione sit, voluptatibus odit quam nemo dolorum accusamus
                quo ullam atque nostrum illum asperiores.
              </Description>
            </ChannelDetails>
          </ChannelInfo>
          <SubscribeButton>SUBSCRIBE</SubscribeButton>
        </Channel>
        <Hr />
        <Comments />
      </Content>
      <Recomendations>
        <Card type="small" />
        <Card type="small" />
        <Card type="small" />
        <Card type="small" />
        <Card type="small" />
        <Card type="small" />
        <Card type="small" />
        <Card type="small" />
        <Card type="small" />
        <Card type="small" />
        <Card type="small" />
      </Recomendations>
    </Container>
  );
};

export default Video;
