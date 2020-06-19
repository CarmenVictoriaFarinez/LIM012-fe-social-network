// const db = firebase.firestore();
// Agrega datos
export const createPost = (uid, contentText, privacy, imgPost) => firebase.firestore().collection('posts').add({
  userId: uid,
  content: contentText,
  likes: 0,
  date: new Date(),
  state: privacy,
  img: imgPost,
});
// export const createImagePost = () => firebase.storage().ref();
// export const uploadTask = createImagePost.child('imagenes/' + file.name).put();

// lee datos
export const getPosts = callback => firebase.firestore().collection('posts')
  .orderBy('date', 'desc')
  .onSnapshot((querySnapshot) => {
    const output = [];
    querySnapshot.forEach((doc) => {
      output.push({
        id: doc.id,
        content: doc.data().content,
        date: doc.data().date,
        state: doc.data().state,
        img: doc.data().img,
      });
    });
    callback(output);
  });


/* export const getPosts = () => firebase.firestore().collection('posts').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.data().userId);
      console.log(doc.data().date);
      console.log(`${doc.data().state}`);
    });
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  }); */

/* export const getPosts = () => firebase.firestore().collection('posts')
   .orderBy('date', 'desc')
  .onSnapshot((querySnapshot) => {
     const data = [];
     querySnapshot.forEach((doc) => {
       data.push({ data: doc.data() });
       // data.push({ id: doc.id, ...doc.data() });
     });
     return data;
     // callback(data);
   }); */
