import React from 'react';
import styled from 'styled-components';
import { Comment } from './Comment';

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

const Comments = () => {
  return (
    <Container>
      <NewComment>
        <Avatar src="https://yt3.ggpht.com/hcGB-JGcd7qtdV4Z5bUXpT0khAWIn0RDmimZpCVN-IubWeDz9SYX8C9qYi1oRXq5tOZy2aim9yg=s88-c-k-c0x00ffffff-no-rj" />
        <Input placeholder="Add a comment..."></Input>
      </NewComment>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </Container>
  );
};

export default Comments;
