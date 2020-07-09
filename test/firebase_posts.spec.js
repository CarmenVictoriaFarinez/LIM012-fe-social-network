import MockFirebase from 'mock-cloud-firestore';

import { createPost, getPosts, deletePost } from '../src/model/firebase_posts.js';

const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        abc1d: {
          userId: '',
          content: 'first dance post',
          likes: [],
          date: new Date(),
          state: '',
          img: '',
        },
      },
    },
  },
};

global.firebase = new MockFirebase(fixtureData);

describe('Posts', () => {
  it('Debería poder crear un post', done => createPost('', 'first dance post', '', '')
    .then(() => getPosts(
      (data) => {
        const result = data.find(posts => posts.content === 'first dance post');
        expect(result.content).toBe('first dance post');
        done();
      },
    )));
  it('Debería poder eliminar un post', done => deletePost('abc1d')
    .then(() => getPosts(
      (data) => {
        const result = data.find(posts => posts.id === 'abc1d');
        expect(result).toBe(undefined);
        done();
      },
    )));
});
