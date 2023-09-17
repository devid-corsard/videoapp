import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import app from '../firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  position: absolute;
  background-color: #000000aa;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 24px;
`;

const Title = styled.h1`
  text-align: center;
`;
const Input = styled.input`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px 20px;
  width: 90%;
  color: ${({ theme }) => theme.text};
`;

const Desc = styled.textarea`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px 20px;
  width: 90%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  background-color: #3ea6ff;
  border: none;
  border-radius: 3px;
  padding: 10px 15px;
  color: white;
  cursor: pointer;
`;
const Label = styled.label`
  font-size: 14px;
`;

const Upload = ({ setVideoUpload }) => {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  const handleInputs = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleTags = (e) => {
    setTags(e.target.value.split(',').map((tag) => tag.trim()));
  };

  const uploadFile = async (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === 'imgUrl'
          ? setImgPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            break;
        }
      },
      (_error) => {
        // todo: handle error
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video, 'videoUrl');
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, 'imgUrl');
  }, [img]);

  const handleUpload = async (e) => {
    e.preventDefault();
    const res = await axios.post(`/videos`, { ...inputs, tags });
    setVideoUpload(false);
    res.status === 200 && navigate(`video/${res.data._id}`);
  };

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setVideoUpload(false)}>✖</Close>
        <Title>Upload a video</Title>
        <Label>Video:</Label>

        {videoPerc > 0 ? (
          'Uploading: ' + videoPerc + ' %'
        ) : (
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        )}
        <Input
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleInputs}
        />
        <Desc
          type="text"
          placeholder="Description"
          rows={8}
          name="desc"
          onChange={handleInputs}
        />
        <Input
          type="text"
          placeholder="Separate tags with commas"
          onChange={handleTags}
        />
        <Label>Image:</Label>
        {imgPerc > 0 ? (
          'Uploading: ' + imgPerc + ' %'
        ) : (
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}
        <Button onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>
  );
};

export default Upload;
