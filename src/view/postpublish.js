import {
  updatePost, deletePost,
} from '../model/firebase_wall.js';

const ToEditPost = (btnSavePost, btnCancelPost, textAPost, selPrivPost, idDoc) => {
  const btnShow = (btnToShow) => {
    btnToShow.classList.add('showbtn');
    btnToShow.classList.remove('hide');
  };
  const btnHide = (btnToHide) => {
    btnToHide.classList.remove('showbtn');
    btnToHide.classList.add('hide');
  };
  const oldtextAPost = textAPost.value;
  textAPost.disabled = false;
  selPrivPost.disabled = false;
  btnShow(btnSavePost);
  btnShow(btnCancelPost);
  // evento click para grabar
  btnSavePost.addEventListener('click', () => {
    btnHide(btnSavePost);
    btnHide(btnCancelPost);
    updatePost(idDoc, textAPost.value, selPrivPost.value);
  });
  btnCancelPost.addEventListener('click', () => {
    // btnEditPost = document.querySelector();
    btnHide(btnCancelPost);
    btnHide(btnSavePost);
    // btnShow(btnEditPost);
    textAPost.value = oldtextAPost;
    textAPost.disabled = true;
    selPrivPost.disabled = true;
    introCancel = true;
  });
};

export const allPost = (data, autor) => {
  const userActual = firebase.auth().currentUser;
  const viewpostpublish = document.createElement('article');
  viewpostpublish.classList.add('post-format');
  const nameUser = autor.displayName;
  const photoUser = autor.photoURL;
  const imgPost = data.img;
  viewpostpublish.innerHTML = `
     <div>
        <div id="user-data">
          <img class="circulo-min" src="${photoUser}" alt="">
          <div id='infoUserPost'>
            <div id='infoAlign'>
              <h4 class="user-name">${nameUser}</h4>
              <div id='miniButtons'>
                  <img id="btn-edit-post-${data.id}" class="showbtn circulo-imgbut bgcolor" src="img/edit.svg" alt="Editar Post">
                  <img id="btn-save-post-${data.id}" class="hide circulo-imgbut bgcolor" src="img/save.svg" alt="Guardar cambios">
                  <img id="btn-cancel-post-${data.id}" class="hide circulo-imgbut bgcolor" src="img/x.svg" alt="Cancelar cambios">
                  <a id='btn-delete-${data.id}'><img class="mini-img bgcolor" src="img/trash.png" alt="Insertar imagen"></a>
              </div>
            </div>
              <div class='post-date'> 
                <p>${data.date}</p>
                <select class='select-edited' id="selec-privacy-${data.id}" disabled="true">
                  </select>
              </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <textarea id="textarea-${data.id}" class="only-lines" disabled="true">${data.content}</textarea>
  <div class="image-post" id ="get-file-upload" type="file" accept="image/*">
    ${(data.img !== undefined) ? `<img class="image-post" src="${imgPost}" alt=""/>` : ''}
  </div>
  <img class="mini-img" src="img/like.svg" alt="likes" title="likes" /><span id="likes-count-${data.id}"class="">${data.likes} Likes</span>
  `;
  // cargar valor de privacidad en select
  const selectPriv = viewpostpublish.querySelector(`#selec-privacy-${data.id}`);
  const optionpublic = document.createElement('option');
  const optionprivac = document.createElement('option');
  optionpublic.value = 'public';
  optionprivac.value = 'privacity';
  optionpublic.innerHTML = '🌎';
  optionprivac.innerHTML = '🔒';
  if (data.state === 'privacity') {
    selectPriv.appendChild(optionprivac);
    selectPriv.appendChild(optionpublic);
  } else {
    selectPriv.appendChild(optionpublic);
    selectPriv.appendChild(optionprivac);
  }

  /* const btnLike = viewpostpublish.querySelector(`#btnLike-${data.id}`);
  getLikesPost(data.id, (likes) => {
  //  .then(response => console.log(response));
    const likesCounter = likes.length;
    const likesSpan = viewpostpublish.querySelector(`#likes-count-${data.id}`);
    // likesSpan.innerHTML = likesCounter;
    console.log(likesSpan);
    console.log(likesCounter);
  });

  btnLike.addEventListener('click', (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-undef
    const likesCounter = likes.length;
    const user = firebase.auth().currentUser;
    if (likesCounter === 0) {
      likePost(data.id, user.email)
        .then(response => getLikesPost(data.id, (likes) => {
          btnLike.src = 'img/like.svg';
          // eslint-disable-next-line no-shadow
          const likesCounter = likes.length;
          const likesSpan = viewpostpublish.querySelector(`#likes-count-${data.id}`);
          likesSpan.innerHTML = likesCounter;
        }));
    }
 });  */

  // actualizar post
  const btnEditPost = viewpostpublish.querySelector(`#btn-edit-post-${data.id}`);
  const btnSavePost = viewpostpublish.querySelector(`#btn-save-post-${data.id}`);
  const btnCancelPost = viewpostpublish.querySelector(`#btn-cancel-post-${data.id}`);
  const textAPost = viewpostpublish.querySelector(`#textarea-${data.id}`);
  const selPrivPost = viewpostpublish.querySelector(`#selec-privacy-${data.id}`);
  // evento click para editar
  btnEditPost.addEventListener('click', () => {
    viewpostpublish.querySelector(`#btn-edit-post-${data.id}`).classList.remove('showbtn');
    viewpostpublish.querySelector(`#btn-edit-post-${data.id}`).classList.add('hide');
    ToEditPost(btnSavePost, btnCancelPost, textAPost, selPrivPost, data.id);
    viewpostpublish.querySelector(`#btn-edit-post-${data.id}`).classList.remove('hide');
    viewpostpublish.querySelector(`#btn-edit-post-${data.id}`).classList.add('showbtn');
  });
  // const btnDeletePost = document.querySelector(`#btn-delete-${data.id}`);
  viewpostpublish.querySelector(`#btn-delete-${data.id}`).addEventListener('click', () => deletePost(data.id));

  // const allComments = `
  // <div>
  //   <input type="text" id="txtNewComm" placeholder="Escriba un comentario">
  //   <img id="btn-save-comm-${data.id}" class="circulo-imgbut bgcolor" src="img/save.svg" alt="Enviar Comentario">
  // </div>
  // <input type="text" id="txtNewComm" placeholder="Escriba un comentario">
  // <img id="btn-menu-comm-${data.id}" class="circulo-imgbut bgcolor" src="img/save.svg" alt="Menu Comentario">
  // `

  // btnDeletePost.addEventListener('click', () => {
  //   deletePost(data.id);
  //   console.log(data.id);
  // });
  // console.log(data.content);
  // console.log(viewpostpublish);
  // console.log(data);
  return viewpostpublish;
};


// btnDeletePost.addEventListener('click', () => {
//   deletePost(data.id);
//   console.log(data.id);
// });
// console.log(data.content);
// console.log(viewpostpublish);
// console.log(data);
