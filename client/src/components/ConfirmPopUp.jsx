import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  position: fixed;
  z-index: 1000;
  background-color: #000000aa;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 280px;
  height: 170px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  border-radius: 3px;
  gap: 0px;
`;

const Title = styled.h4`
  font-weight: 400;
  margin: 20px 20px 0px 20px;
`;

const Desc = styled.p`
  margin: 20px 20px 0px 20px;

  font-size: 14px;
  font-weight: 300;
  color: ${({ theme }) => theme.textSoft};
`;

const ButtonWrapper = styled.div`
  margin: 10px 20px;

  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-end;
`;

const YesButton = styled.button`
  background-color: #ff3e3e;
  border: none;
  border-radius: 3px;
  padding: 10px 15px;
  color: white;
  cursor: pointer;
`;

const NoButton = styled.button`
  background-color: transparent;
  border: none;
  border-radius: 3px;
  padding: 10px 15px;
  color: white;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px 0px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft}; ;
`;

const ConfirmPopUp = ({ title, desc, setPopup, callback }) => {
  return (
    <Container>
      <Wrapper>
        <Title>{title}</Title>
        <Desc>{desc}</Desc>
        <Hr />
        <ButtonWrapper>
          <NoButton onClick={() => setPopup(false)}>Cancel</NoButton>
          <YesButton onClick={callback}>Yes</YesButton>
        </ButtonWrapper>
      </Wrapper>
    </Container>
  );
};

export default ConfirmPopUp;
