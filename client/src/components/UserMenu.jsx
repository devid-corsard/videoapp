import React from 'react';
import styled from 'styled-components';
import { ExitToAppOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';
import axios from 'axios';

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

const UserMenu = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.get('/auth/logout');
      dispatch(logout());
    } catch (err) {}
  };

  return (
    <Container>
      <Wrapper>
        <Item onClick={handleLogout}>
          <ExitToAppOutlined />
          Logout
        </Item>
      </Wrapper>
    </Container>
  );
};

export default UserMenu;
