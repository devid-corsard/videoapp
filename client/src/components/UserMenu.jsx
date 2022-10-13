import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ExitToAppOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';

const Container = styled.div`
  position: absolute;
  top: 60px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  font-size: 14px;
`;

const Wrapper = styled.div`
  padding: 18px 26px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7px 0px;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft}; ;
`;

const UserMenu = ({ setUserMenu }) => {
  const dispatch = useDispatch();

  return (
    <Container onMouseLeave={() => setUserMenu(false)}>
      <Wrapper>
        <Item onClick={() => dispatch(logout())}>
          <ExitToAppOutlined />
          Logout
        </Item>
      </Wrapper>
    </Container>
  );
};

export default UserMenu;
