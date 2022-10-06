import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  gap: 20px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
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

export const Comment = () => {
  return (
    <Container>
      <Avatar src="https://yt3.ggpht.com/hcGB-JGcd7qtdV4Z5bUXpT0khAWIn0RDmimZpCVN-IubWeDz9SYX8C9qYi1oRXq5tOZy2aim9yg=s88-c-k-c0x00ffffff-no-rj" />
      <Details>
        <Name>
          John Doe<Time>3 days ago</Time>
        </Name>

        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, ad
          esse? Repudiandae temporibus nobis corporis facere vel nostrum
          inventore, consequatur, sunt porro dolore earum deleniti aliquam optio
          soluta expedita ad?
        </Text>
      </Details>
    </Container>
  );
};
