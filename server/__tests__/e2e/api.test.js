import request from 'supertest';
import { app } from '../../index.js';
import cookie from 'cookie';

const tUser1 = {
  name: 'test1',
  email: 'test1@email.com',
  password: '123456',
};
const tUser2 = {
  name: 'test2',
  email: 'test2@email.com',
  password: '123456',
};
const tUser3 = {
  name: 'test3',
  email: 'test3@email.com',
  password: '123456',
};
const tUser1Video1 = {
  title: 'new test1 video 1',
  desc: 'test1',
  imgUrl: 'test1',
  videoUrl: 'test1',
};

describe('/api/auth', () => {
  it('Should create 1st user', async () => {
    await request(app)
      .post('/api/auth/signup')
      .send(tUser1)
      .expect(200, { message: 'User has been created' });
  });

  it('Should create 2nd user', async () => {
    await request(app)
      .post('/api/auth/signup')
      .send(tUser2)
      .expect(200, { message: 'User has been created' });
  });

  it('Should create 3rd user', async () => {
    await request(app)
      .post('/api/auth/signup')
      .send(tUser3)
      .expect(200, { message: 'User has been created' });
  });

  it('Should not sign in with invalid user name', async () => {
    const userSignInData = {
      name: 'wrongUserName',
      password: tUser1.password,
    };
    await request(app)
      .post('/api/auth/signin')
      .send(userSignInData)
      .expect({ succsess: false, status: 404, message: 'User not found' });
  });

  it('Should not sign in with invalid password', async () => {
    const userSignInData = {
      name: tUser1.name,
      password: 'wrongpass',
    };
    await request(app)
      .post('/api/auth/signin')
      .send(userSignInData)
      .expect({ succsess: false, status: 400, message: 'Wrong credentials' });
  });

  it('Should sign in as 1st user and get an access token', async () => {
    const userSignInData = {
      name: tUser1.name,
      password: tUser1.password,
    };
    const res = await request(app)
      .post('/api/auth/signin')
      .send(userSignInData)
      .expect(200);

    tUser1.cookies = cookie.parse(res.header['set-cookie'][0]);
    tUser1.id = res.body._id;

    expect(tUser1.cookies.access_token).toBeTruthy();
    expect(tUser1.id).toBeTruthy();
  });

  it('Should sign in as 2nd user and get an access token', async () => {
    const userSignInData = {
      name: tUser2.name,
      password: tUser2.password,
    };
    const res = await request(app)
      .post('/api/auth/signin')
      .send(userSignInData)
      .expect(200);

    tUser2.cookies = cookie.parse(res.header['set-cookie'][0]);
    tUser2.id = res.body._id;

    expect(tUser2.cookies.access_token).toBeTruthy();
    expect(tUser2.id).toBeTruthy();
  });

  it('Should sign in as 3rd user and get an access token', async () => {
    const userSignInData = {
      name: tUser3.name,
      password: tUser3.password,
    };
    const res = await request(app)
      .post('/api/auth/signin')
      .send(userSignInData)
      .expect(200);

    tUser3.cookies = cookie.parse(res.header['set-cookie'][0]);
    tUser3.id = res.body._id;

    expect(tUser3.cookies.access_token).toBeTruthy();
    expect(tUser3.id).toBeTruthy();
  });

  it('Should not update user with invalid id', async () => {
    const updatedUser = { name: 'updated' };
    await request(app)
      .put('/api/users/' + tUser1.id + '1')
      .set('Cookie', `access_token=${tUser1.cookies.access_token}`)
      .send(updatedUser)
      .expect(403)
      .expect((res) => {
        expect(res.body.message).toEqual('You can update only your account!');
      });
  });

  it('Should update user with correct id and token', async () => {
    const updatedUser = { name: 'updated' };
    await request(app)
      .put('/api/users/' + tUser1.id)
      .set('Cookie', `access_token=${tUser1.cookies.access_token}`)
      .send(updatedUser)
      .expect(200)
      .expect((res) => {
        expect(res.body.name).toBe('updated');
      });
  });

  it('Should subscribe user 1 to user 2 and user 3', async () => {
    await request(app)
      .put('/api/users/sub/' + tUser2.id)
      .set('Cookie', `access_token=${tUser1.cookies.access_token}`)
      .expect(200, { message: 'Subscribtion succsessful!' });

    await request(app)
      .put('/api/users/sub/' + tUser3.id)
      .set('Cookie', `access_token=${tUser1.cookies.access_token}`)
      .expect(200, { message: 'Subscribtion succsessful!' });

    await request(app)
      .get('/api/users/find/' + tUser1.id)
      .expect(200)
      .expect((res) => {
        expect(res.body.subscribedUsers).toEqual([tUser2.id, tUser3.id]);
      });

    await request(app)
      .get('/api/users/find/' + tUser2.id)
      .expect(200)
      .expect((res) => {
        expect(res.body.subscribers).toEqual(1);
      });

    await request(app)
      .get('/api/users/find/' + tUser3.id)
      .expect(200)
      .expect((res) => {
        expect(res.body.subscribers).toEqual(1);
      });
  });

  it('Should unsubscribe user 1 from user 2 and user 3', async () => {
    await request(app)
      .put('/api/users/unsub/' + tUser2.id)
      .set('Cookie', `access_token=${tUser1.cookies.access_token}`)
      .expect(200, { message: 'Unsubscribtion succsessful!' });

    await request(app)
      .put('/api/users/unsub/' + tUser3.id)
      .set('Cookie', `access_token=${tUser1.cookies.access_token}`)
      .expect(200, { message: 'Unsubscribtion succsessful!' });

    await request(app)
      .get('/api/users/find/' + tUser1.id)
      .expect(200)
      .expect((res) => {
        expect(res.body.subscribedUsers).toEqual([]);
      });

    await request(app)
      .get('/api/users/find/' + tUser2.id)
      .expect(200)
      .expect((res) => {
        expect(res.body.subscribers).toEqual(0);
      });

    await request(app)
      .get('/api/users/find/' + tUser3.id)
      .expect(200)
      .expect((res) => {
        expect(res.body.subscribers).toEqual(0);
      });
  });

  it('Should create video with correct data of test user 1', async () => {
    const res = await request(app)
      .post('/api/videos')
      .set('Cookie', `access_token=${tUser1.cookies.access_token}`)
      .send(tUser1Video1)
      .expect(200);

    tUser1Video1.id = res.body._id;

    expect(tUser1Video1.id).toBeTruthy();
    expect(res.body.title).toEqual(tUser1Video1.title);
  });

  it('Should not update video with invalid id', async () => {
    const updatedVideo = { title: 'not updated video1' };

    await request(app)
      .put('/api/videos/' + tUser1Video1.id + '1')
      .set('Cookie', `access_token=${tUser1.cookies.access_token}`)
      .send(updatedVideo)
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toBe('Invalid video id.');
      });
  });

  it('Should not update video1 by user2', async () => {
    const updatedVideo = { title: 'not updated video2' };

    await request(app)
      .put('/api/videos/' + tUser1Video1.id)
      .set('Cookie', `access_token=${tUser2.cookies.access_token}`)
      .send(updatedVideo)
      .expect(403)
      .expect((res) => {
        expect(res.body.message).toBe('You can update only your video.');
      });

    await request(app)
      .get('/api/videos/find/' + tUser1Video1.id)
      .expect(200)
      .expect((res) => {
        expect(res.body.title).toBe(tUser1Video1.title);
      });
  });

  it('Should update video1 of user1 with correct data', async () => {
    const updatedVideo = { title: 'updated video' };

    await request(app)
      .put('/api/videos/' + tUser1Video1.id)
      .set('Cookie', `access_token=${tUser1.cookies.access_token}`)
      .send(updatedVideo)
      .expect(200)
      .expect((res) => {
        expect(res.body.title).toBe(updatedVideo.title);
      });

    await request(app)
      .get('/api/videos/find/' + tUser1Video1.id)
      .expect(200)
      .expect((res) => {
        expect(res.body.title).toBe(updatedVideo.title);
      });
  });

  it('Should add view to video', async () => {
    await request(app)
      .put('/api/videos/view/' + tUser1Video1.id)
      .expect(200, { message: 'Views has been increased' });

    await request(app)
      .get('/api/videos/find/' + tUser1Video1.id)
      .expect(200)
      .expect((res) => {
        expect(res.body.views).toBe(1);
      });
  });

  it('Should not delete video with invalid id', async () => {
    await request(app)
      .delete('/api/videos/' + tUser1Video1.id + '1')
      .set('Cookie', `access_token=${tUser1.cookies.access_token}`)
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toBe('Invalid video id.');
      });
  });

  it('Should not delete not your video', async () => {
    await request(app)
      .delete('/api/videos/' + tUser1Video1.id)
      .set('Cookie', `access_token=${tUser2.cookies.access_token}`)
      .expect(403)
      .expect((res) => {
        expect(res.body.message).toBe('You can delete only your video.');
      });
  });

  it('Should delete video1 of user1 with correct data', async () => {
    await request(app)
      .delete('/api/videos/' + tUser1Video1.id)
      .set('Cookie', `access_token=${tUser1.cookies.access_token}`)
      .expect(200, { message: 'Video has been deleted.' });
  });

  it('Should delete user1 with correct id and token', async () => {
    await request(app)
      .delete('/api/users/' + tUser1.id)
      .set('Cookie', `access_token=${tUser1.cookies.access_token}`)
      .expect(200, { message: 'User has been deleted' });
  });

  it('Should delete user2 with correct id and token', async () => {
    await request(app)
      .delete('/api/users/' + tUser2.id)
      .set('Cookie', `access_token=${tUser2.cookies.access_token}`)
      .expect(200, { message: 'User has been deleted' });
  });

  it('Should delete user3 with correct id and token', async () => {
    await request(app)
      .delete('/api/users/' + tUser3.id)
      .set('Cookie', `access_token=${tUser3.cookies.access_token}`)
      .expect(200, { message: 'User has been deleted' });
  });
});
