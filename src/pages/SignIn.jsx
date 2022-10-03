import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text};
  height: calc(100vh - 56px);
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 400;
`;

const Input = styled.input`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px 20px;
  width: 90%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  background-color: #1a73e8;
  border: none;
  border-radius: 3px;
  padding: 10px 15px;
  color: white;
  cursor: pointer;
`;

const More = styled.div`
  display: flex;
  gap: 20px;
  font-size: 12px;
  margin-top: 5px;
  color: ${({ theme }) => theme.textSoft};
`;
const Links = styled.div``;
const Link = styled.span`
  margin-left: 5px;
  cursor: pointer;
`;

export const SignIn = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue use Devidtube</SubTitle>
        <Input placeholder="User name" />
        <Input type="password" placeholder="password" />
        <Button>Sign in</Button>
        <Title>or</Title>
        <Input placeholder="User name" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button>Sign up</Button>
      </Wrapper>
      <More>
        English (USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};
