import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import OutlinedFlagTwoToneIcon from '@mui/icons-material/OutlinedFlagTwoTone';
import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Container = styled.div`
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  position: fixed;
  background-color: transparent;
  z-index: 1000;
`;

const Wrapper = styled.div`
  border-radius: 3px;
  width: 150px;
  top: ${({ pos }) => pos.y + 'px'};
  left: ${({ pos }) => pos.x + 'px'};
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 7px 0px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7px 20px;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const CommentMenu = ({ setOpen, setEdit, setDelete, pos, comment }) => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const owner = currentUser._id === comment.userId;
  const videoOwner = currentUser._id === currentVideo.userId;

  return (
    <Container onClick={() => setOpen(false)}>
      <Wrapper pos={pos}>
        {owner ? (
          <>
            <Item onClick={() => setEdit(true)}>
              <ModeEditOutlineOutlinedIcon /> Edit
            </Item>
            <Item onClick={() => setDelete(true)}>
              <DeleteForeverOutlinedIcon /> Delete
            </Item>
          </>
        ) : videoOwner ? (
          <>
            <Item onClick={() => setDelete(true)}>
              <DeleteForeverOutlinedIcon /> Delete
            </Item>
            <Item>
              <OutlinedFlagTwoToneIcon /> Report
            </Item>
          </>
        ) : (
          <Item>
            <OutlinedFlagTwoToneIcon /> Report
          </Item>
        )}
      </Wrapper>
    </Container>
  );
};

export default CommentMenu;
