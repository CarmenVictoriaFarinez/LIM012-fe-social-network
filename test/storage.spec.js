import { mocksdk } from '../__mocks__/firebase.mock.js';

import { uploadImage } from '../src/model/storage.js';
// MockStorageReference = firebase.storage().ref()

global.firebase = mocksdk;

describe('uploadImage', () => {
  it('Debería ser una función', () => {
    expect(typeof uploadImage).toBe('function');
  });
  it('Debería', (done) => {
    const image = new File([], 'test-image.jpg');
    return uploadImage('17-05-2019', image).then((data) => {
      expect(data.path).toBe('images/17-05-2019-test-image.jpg');
      done();
    });
  });
});
