(()=>{"use strict";var e=document.querySelector(".content").querySelector(".card"),t=document.querySelector(".popup-add-new-card"),r=t.querySelector(".form_new-card"),n=r.querySelector(".form__input-title"),o=r.querySelector(".form__input-link"),c={baseURL:"https://nomoreparties.co/v1/plus-cohort-14",headers:{authorization:"203d2289-7df9-43d0-8e30-001c0bc1395a","Content-Type":"application/json"}};function a(e){return e.ok?e.json():Promise.reject("Что-то пошло не так, ошибка: ".concat((e.status,e.status.text)))}var i=document.querySelector(".content"),u=document.querySelector(".popup-edit-profile"),l=i.querySelector(".profile__name"),s=i.querySelector(".profile__status"),d=document.querySelector(".form__input-name"),f=document.querySelector(".form__input-job"),m=document.querySelector(".profile__image");function _(e,t,r){t.textContent=e?"Сохранение...":r}function p(e){e.classList.add("form__submit_inactive"),e.setAttribute("disabled","")}function v(e){"Escape"==e.key&&b(document.querySelector(".popup_opened"))}function y(e){e.target.classList.contains("popup_opened")&&b(e.target)}function h(e){e.classList.add("popup_opened"),document.addEventListener("keydown",v),e.addEventListener("click",y)}function b(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",v),e.removeEventListener("click",y)}var S=document.querySelector("#card-template").content,q=document.querySelector(".popup__image"),L=q.querySelector(".popup__image-content"),g=q.querySelector(".popup__image-title");function k(e,t,r,n,o,i){var u=S.querySelector(".card__item").cloneNode(!0),l=u.querySelector(".card__title"),s=u.querySelector(".card__image"),d=u.querySelector(".card__like-button"),f=u.querySelector(".card__delete-button"),m=u.querySelector(".card__like-counter");return l.textContent=e,s.src=t,s.alt=e,m.textContent=r.length,d.addEventListener("click",C(u,n,m)),r.some((function(e){return e._id===i}))&&d.classList.add("card__like-button_active"),o._id!==i&&f.classList.add("card__delete-button_disabled"),f.addEventListener("click",(function(e){var t;(t=n,fetch("".concat(c.baseURL,"/cards/").concat(t),{method:"DELETE",headers:c.headers}).then(a)).then((function(){e.target.closest(".card__item").remove()})).catch((function(e){console.log(e)}))})),s.addEventListener("click",(function(){h(q),L.src=t,L.alt=e,g.textContent=e})),u}var C=function(e,t,r){return function(){var n=e.querySelector(".card__like-button");n.classList.contains("card__like-button_active")?function(e,t,r){var n;(n=t,fetch("".concat(c.baseURL,"/cards/likes/").concat(n),{method:"DELETE",headers:c.headers}).then(a)).then((function(t){r.textContent=t.likes.length,e.classList.remove("card__like-button_active")})).catch((function(e){return console.log(e)}))}(n,t,r):function(e,t,r){var n;(n=t,fetch("".concat(c.baseURL,"/cards/likes/").concat(n),{method:"PUT",headers:c.headers}).then(a)).then((function(t){r.textContent=t.likes.length,e.classList.add("card__like-button_active")})).catch((function(e){return console.log(e)}))}(n,t,r)}};function E(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var x,A=document.querySelector(".content"),w=A.querySelector(".profile__edit-button"),U=document.querySelector(".popup-edit-profile"),R=document.querySelectorAll(".popup__close-button"),j=document.querySelector(".form__input-name"),T=document.querySelector(".form__input-job"),O=A.querySelector(".profile__add-button"),P=document.querySelector(".popup-add-new-card"),B=P.querySelector(".form_new-card"),D=A.querySelector(".profile__name"),M=A.querySelector(".profile__status"),N=document.querySelector(".popup-edit-avatar"),I=document.querySelector(".form__edit-avatar"),J=document.querySelector(".profile__avatar"),H=I.querySelector(".form__input"),V="";Promise.all([fetch("".concat(c.baseURL,"/users/me"),{headers:c.headers}).then(a),fetch("".concat(c.baseURL,"/cards"),{headers:c.headers}).then(a)]).then((function(t){var r,n,o=(n=2,function(e){if(Array.isArray(e))return e}(r=t)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,c=[],a=!0,i=!1;try{for(r=r.call(e);!(a=(n=r.next()).done)&&(c.push(n.value),!t||c.length!==t);a=!0);}catch(e){i=!0,o=e}finally{try{a||null==r.return||r.return()}finally{if(i)throw o}}return c}}(r,n)||function(e,t){if(e){if("string"==typeof e)return E(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?E(e,t):void 0}}(r,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],a=o[1];D.textContent=c.name,M.textContent=c.about,J.src=c.avatar,V=c._id,function(t){t.forEach((function(t){e.append(k(t.name,t.link,t.likes,t._id,t.owner,V))}))}(a)})).catch((function(e){return console.log("Ошибка при рендере карточек и информации профиля".concat(e))})),m.addEventListener("click",(function(){var e=N.querySelector(".form__submit");h(N),p(e)})),I.addEventListener("submit",(function(e){e.preventDefault(),_(!0,e.submitter),function(e){return fetch("".concat(c.baseURL,"/users/me/avatar"),{method:"PATCH",headers:c.headers,body:JSON.stringify({avatar:e})}).then(a)}(H.value).then((function(t){J.src=t.avatar,p(e.submitter),b(N),e.target.reset()})).catch((function(e){console.log(e)})).finally((function(){_(!1,e.submitter,"Сохранить")}))})),R.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){return b(t)}))})),w.addEventListener("click",(function(){h(U),j.value=D.textContent,T.value=M.textContent})),U.addEventListener("submit",(function(e){var t,r;e.preventDefault(),_(!0,e.submitter),(t=d.value,r=f.value,fetch("".concat(c.baseURL,"/users/me"),{method:"PATCH",headers:c.headers,body:JSON.stringify({name:t,about:r})}).then(a)).then((function(e){l.textContent=e.name,s.textContent=e.about,b(u)})).catch((function(e){console.log(e)})).finally((function(){_(!1,e.submitter,"Сохранить")}))})),O.addEventListener("click",(function(){h(P),p(P.querySelector(".form__submit"))})),B.addEventListener("submit",(function(r){var i,u;r.preventDefault(),_(!0,r.submitter),(i=n.value,u=o.value,fetch("".concat(c.baseURL,"/cards"),{method:"POST",headers:c.headers,body:JSON.stringify({name:i,link:u})}).then(a)).then((function(n){var o;o=k(n.name,n.link,n.likes,n._id,n.owner,V),e.prepend(o),b(t),r.target.reset(t)})).catch((function(e){console.log("Ошибка при отправке данных карточки  ".concat(e))})).finally((function(){_(!1,r.submitter,"Cоздать")}))})),x={formSelector:".form",inputSelector:".form__input",submitButtonSelector:".form__submit",inactiveButtonClass:"form__submit_inactive",inputErrorClass:"form__input_type_error",errorClass:"form__input-error_active"},Array.from(document.querySelectorAll(x.formSelector)).forEach((function(e){!function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);r.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,r){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t,r){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(r.inputErrorClass),t.classList.remove(r.errorClass),n.textContent=""}(e,t,r):function(e,t,r,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n.inputErrorClass),o.textContent=r,o.classList.add(n.errorClass)}(e,t,t.validationMessage,r)}(e,o,t),function(e,t,r){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(r.inactiveButtonClass),t.removeAttribute("disabled","")):(t.classList.add(r.inactiveButtonClass),t.setAttribute("disabled",""))}(r,n,t)}))}))}(e,x)}))})();