import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

const Card = ({ type }) => {
  return (
    <Link to="/video/test" style={{ textDecoration: 'none' }}>
      <Container type={type}>
        <Image
          type={type}
          src="https://i.ytimg.com/vi/8PbepDbZuq0/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDLSY6X3dDIIlIbdh1pft8dnFBpew"
        />
        <Details type={type}>
          <ChannelImage
            type={type}
            src="https://yt3.ggpht.com/hcGB-JGcd7qtdV4Z5bUXpT0khAWIn0RDmimZpCVN-IubWeDz9SYX8C9qYi1oRXq5tOZy2aim9yg=s176-c-k-c0x00ffffff-no-rj-mo"
          />
          <Texts>
            <Title type={type}>
              LONG VIDEO TITLE LONG VIDEO TITLE LONG VIDEO TITLE LONG VIDEO
              TITLE
            </Title>
            <ChannelName type={type}>Devid Channel</ChannelName>
            <Info>72K views • 1 hour ago</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
