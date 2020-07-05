import {
  createPost, getPosts, logOut, uploadImage, getUser,
} from '../model/firebase_wall.js';
import { allPost } from './postpublish.js';

export default (profile) => {
  const user = firebase.auth().currentUser;
  // const db = firebase.firestore();
  const nameUser = user.displayName;
  const photoUser = user.photoURL;
  const viewWall = `
  <aside class="user">
      <div id="user-name">
        ${photoUser === null ? '<img class="circulo-profile" src="img/avatar-perfil.jpg"/>' : `<img class="circulo-profile" src="${photoUser}" alt=""/>`}
        ${nameUser === null ? `<p id="user-name-profile">${user.email}<p>` : `<p class="user-name-profile">${nameUser}</p>`}
        <p class='lil-text'>Aprendiendo a bailar</p>
      </div>
  </aside>
  <section class="post">
      <section id="post-new">
          <select id="post-new-privacity">
          <option value="public">🌎 Público</option>
          <option value="privacity">🔒 Privado</option>
          </select>
          <textarea id="post-new-text" cols="" rows="3" placeholder="¿Qué pasos compartiras hoy?"></textarea>
          <div class="post-buttoms">
            <label class ="btn btn-file">
              <input type="file" name="" id="get-file" hidden>
              <img class="circulo-img bgcolor" src="img/image.svg" alt="Insertar imagen">
            </label>
            <button class="bgcolor" id="post-btn-publish">PUBLICAR</button>
          </div>
      </section>
      <section id="post-published">
      </section>
  </section>
    `;
  const divElemt = document.createElement('div');
  divElemt.classList.add('view-wall');
  divElemt.innerHTML = viewWall;

  // insertar datos del usuario
  // const divUserName = divElemt.querySelector('#post-published');
  // getUser(element.userId)
  // .then((docUser) => {
  //   doc.data().displayName;
  //   doc.data().photoURL;
  // });

  // Pinta todos los posts y segun el state de la privacidad, los hace visible o no //
  const postSection = divElemt.querySelector('#post-published');
  getPosts((objArray) => {
    postSection.innerHTML = '';
    objArray.forEach((element) => {
      if (profile === 'true') {
        if (element.userId === user.uid) {
          getUser(element.userId)
            .then((doc) => {
              postSection.appendChild(allPost(element, doc.data()));
            });
        }
      } else if (element.state !== 'privacity' || element.userId === user.uid) {
        getUser(element.userId)
          .then((doc) => {
            postSection.appendChild(allPost(element, doc.data()));
          });
      }
    });
  });
  // DOM para el cerrar sesion //
  const btnLogOut = document.querySelector('#btn-logout');
  btnLogOut.addEventListener('click', () => {
    logOut()
      .then(() => {
        window.location.hash = '#/';
        document.querySelector('#header').classList.remove('show');
        document.querySelector('#header').classList.add('hide');
        // changeHash('#/');
      });
  });
  // En esta seccion se crea post con o sin imagen
  const btnCreatePost = divElemt.querySelector('#post-btn-publish');
  if (user) {
    btnCreatePost.addEventListener('click', (event) => {
      event.preventDefault();
      const file = divElemt.querySelector('#get-file');
      const date = new Date().toLocaleString();
      const imgPost = file.files[0];
      const privacy = divElemt.querySelector('#post-new-privacity').value;
      const contentText = divElemt.querySelector('#post-new-text').value;
      divElemt.querySelector('#post-new-text').value = '';
      if (imgPost === undefined) {
        createPost(user.uid, contentText, privacy, '');
        console.log('Se creo post sin imagen');
      } else {
        uploadImage(date, imgPost)
          .then(url => console.log(url) || createPost(user.uid, contentText, privacy, url));
        file.value = '';
        console.log('Se subio la imagen');
      }
    });
  }
  return divElemt;
};
