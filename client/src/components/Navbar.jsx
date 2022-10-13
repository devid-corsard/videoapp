import React, { useState } from 'react';
import styled from 'styled-components';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import {
  ExitToAppOutlined,
  SearchOutlined,
  VideoCallOutlined,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice.js';
import UserMenu from './UserMenu.jsx';

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 2px;
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  width: 100%;
  outline: none;
  color: ${({ theme }) => theme.text};
  font-size: 16px;
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #065fd4;
  color: #065fd4;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: green;
`;
const AUTOCLOSE_TIMEOUT = 5000;

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userMenu, setUserMenu] = useState(false);

  const handleMenuOpen = (e) => {
    if (!userMenu) {
      setTimeout(() => setUserMenu(false), AUTOCLOSE_TIMEOUT);
    }
    setUserMenu(!userMenu);
  };

  return (
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder="Search" />
          <SearchOutlined />
        </Search>
        {currentUser ? (
          <>
            <User>
              <VideoCallOutlined />
              <Avatar src={currentUser.img} onClick={handleMenuOpen} />
              {currentUser.name}
            </User>
            {userMenu && <UserMenu setUserMenu={setUserMenu} />}
          </>
        ) : (
          <Link to="signin" style={{ textDecoration: 'none' }}>
            <Button>
              <AccountCircleOutlinedIcon />
              SIGN IN
            </Button>
          </Link>
        )}
      </Wrapper>
    </Container>
  );
};

export default Navbar;
