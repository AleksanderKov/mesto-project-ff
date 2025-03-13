(()=>{"use strict";function e(e,t,n,r,o,c){var a=c.content.querySelector(".card").cloneNode(!0);a.dataset.id=e._id;var u=a.querySelector(".card__image");u.src=e.link,u.alt=e.name,a.querySelector(".card__title").textContent=e.name;var i=a.querySelector(".card__like-button");a.querySelector(".card__like-quantity").textContent=e.likes.length,e.likes.some((function(e){return e._id===t}))&&i.classList.add("card__like-button_active");var l=a.querySelector(".card__delete-button");return e.owner._id!==t?l.remove():l.addEventListener("click",(function(){n(e._id,a)})),i.addEventListener("click",(function(){return r(e._id,i,a)})),u.addEventListener("click",(function(){return o(e.link,e.name)})),a}function t(e){e&&(e.classList.add("popup_is-opened"),document.addEventListener("keyup",o))}function n(e){e&&(e.classList.remove("popup_is-opened"),document.removeEventListener("keyup",o))}function r(e){e.target===e.currentTarget&&n(e.currentTarget)}function o(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&n(t)}}var c,a=function(e,t,n){var r=e.querySelector("#".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""},u=function(e,t){e.classList.add(t.inactiveButtonClass),e.disabled=!0},i=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){a(e,n,t)})),u(r,t)},l={baseUrl:"https://nomoreparties.co/v1/cohort-magistr-2",headers:{authorization:"9a6cdb2f-ce41-4fb5-a4e0-a1a046855996","Content-Type":"application/json"}},s=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))};function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var p=null,f=document.querySelector(".profile__title"),_=document.querySelector(".profile__description"),v=document.querySelector(".popup_type_edit"),m=document.querySelector(".profile__edit-button"),y=v.querySelector(".popup__close"),h=document.querySelector('.popup__form[name="edit-profile"]'),S=h.querySelector(".popup__input_type_name"),b=h.querySelector(".popup__input_type_description"),q=document.querySelector(".popup_type_image"),k=q.querySelector(".popup__image"),E=q.querySelector(".popup__caption"),L=document.querySelector(".places__list"),C=document.querySelector("#card-template"),g=document.querySelector(".popup_type_new-card"),x=document.querySelector(".profile__add-button"),A=g?g.querySelector(".popup__close"):null,T=document.querySelector('.popup__form[name="new-place"]'),U=document.querySelector(".popup_type_confirm"),w=U.querySelector(".popup__confirm-button"),j=U.querySelector(".popup__close"),B=document.querySelector(".popup_type_replace_avatar"),O=B.querySelector(".popup__form"),P=B.querySelector("#replace-avatar-link-input"),D=B.querySelector(".popup__button"),I=document.querySelector(".profile__image"),M=document.querySelector(".profile__image-replace-avatar"),N={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_inactive",inputErrorClass:"popup__input_type_error",errorClass:"form__input-error_active"};function J(e,t,n){t.classList.contains("card__like-button_active")?function(e){return fetch("".concat(l.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:l.headers}).then(s)}(e).then((function(e){t.classList.remove("card__like-button_active"),n.querySelector(".card__like-quantity").textContent=e.likes.length})).catch((function(e){return console.log(e)})):function(e){return fetch("".concat(l.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:l.headers}).then(s)}(e).then((function(e){t.classList.add("card__like-button_active"),n.querySelector(".card__like-quantity").textContent=e.likes.length})).catch((function(e){return console.log(e)}))}function H(e,n){q&&(k.src=e,k.alt=n,E.textContent=n,t(q))}!function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?a(e,t,n):function(e,t,n,r){var o=e.querySelector("#".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?function(e,t){e.classList.remove(t.inactiveButtonClass),e.disabled=!1}(t,n):u(t,n)}(n,r,t)}))}))}(t,e)}))}(N),x.addEventListener("click",(function(){var e=T.querySelector('input[name="place-name"]'),n=T.querySelector('input[name="link"]');e.value||n.value||i(T,N),t(g)})),A&&A.addEventListener("click",(function(){return n(g)})),v&&v.addEventListener("click",r),q&&q.addEventListener("click",r),g.addEventListener("click",r),m.addEventListener("click",(function(){S.value||(S.value=f.textContent),b.value||(b.value=_.textContent),i(h,N),S.dispatchEvent(new Event("input")),b.dispatchEvent(new Event("input")),t(v)})),y.addEventListener("click",(function(){return n(v)})),h.addEventListener("submit",(function(e){e.preventDefault();var t,r=S.value,o=b.value,c=e.currentTarget.querySelector(".popup__button");c.textContent="Сохранение...",(t={name:r,about:o},fetch("".concat(l.baseUrl,"/users/me"),{method:"PATCH",headers:l.headers,body:JSON.stringify({name:t.name,about:t.about})}).then(s)).then((function(e){f.textContent=e.name,_.textContent=e.about,h.reset(),n(v)})).catch((function(e){return console.log(e)})).finally((function(){c.textContent="Сохранить"}))}));var V=q.querySelector(".popup__close");function z(e,n){var r;r=function(){(function(e){return fetch("".concat(l.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:l.headers}).then(s)})(e).then((function(){n.remove()})).catch((function(e){return console.error("Ошибка удаления карточки:",e)}))},p=r,t(U)}V&&V.addEventListener("click",(function(){return n(q)})),T.addEventListener("submit",(function(t){t.preventDefault();var r,o=t.currentTarget.querySelector(".popup__button");o.textContent="Сохранение...",(r={name:T.querySelector('input[name="place-name"]').value,link:T.querySelector('input[name="link"]').value},fetch("".concat(l.baseUrl,"/cards"),{method:"POST",headers:l.headers,body:JSON.stringify({name:r.name,link:r.link})}).then(s)).then((function(t){var r=e(t,c,z,J,H,C);L.prepend(r),T.reset(),i(T,N),n(g)})).catch((function(e){return console.log(e)})).finally((function(){o.textContent="Создать"}))})),Promise.all([fetch("".concat(l.baseUrl,"/users/me"),{headers:l.headers}).then(s),fetch("".concat(l.baseUrl,"/cards"),{headers:l.headers}).then(s)]).then((function(t){var n,r,o=(r=2,function(e){if(Array.isArray(e))return e}(n=t)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(n,r)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=o[0],u=o[1];c=a._id,f.textContent=a.name,_.textContent=a.about,u.forEach((function(t){var n=e(t,c,z,J,H,C);L.append(n)}))})).catch((function(e){return console.log(e)})),U.addEventListener("click",r),j.addEventListener("click",(function(){n(U),p=null})),w.addEventListener("click",(function(){p&&(p(),p=null,n(U))})),O.addEventListener("submit",(function(e){var t;e.preventDefault(),D.textContent="Сохранение...",(t=P.value,fetch("".concat(l.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:l.headers,body:JSON.stringify({avatar:t})}).then(s)).then((function(e){I.style.backgroundImage="url(".concat(e.avatar,")"),O.reset(),n(B)})).catch((function(e){console.error("Ошибка обновления аватара:",e)})).finally((function(){D.textContent="Сохранить"}))})),M.addEventListener("click",(function(){i(O,N),P.validity.valid&&(D.classList.remove(N.inactiveButtonClass),D.disabled=!1),t(B),B.addEventListener("click",r),B.querySelector(".popup__close").addEventListener("click",(function(){return n(B)}))})),B.addEventListener("click",r)})();