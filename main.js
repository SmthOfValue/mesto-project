(()=>{"use strict";function e(e,o){var n=e.querySelector(o.formSelector),c=Array.from(n.querySelectorAll(o.inputSelector)),a=n.querySelector(o.submitButtonSelector);c.forEach((function(e){t(n,e,o)})),r(c,a,o)}var t=function(e,t,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(r.inputErrorClass),o.classList.remove(r.errorClass),o.textContent=""};function r(e,t,r){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(r.inactiveButtonClass),t.disabled=!1):(t.classList.add(r.inactiveButtonClass),t.disabled=!0)}var o,n={formSelector:".popup__form",inputSelector:".popup__input-text",submitButtonSelector:".popup__save",inactiveButtonClass:"popup__save_inactive",inputErrorClass:"popup__input-text_type_error",errorClass:"popup__input-error_active"},c=document.querySelector("#profile-edit-form"),a=c.querySelector("#profile-name-input"),u=c.querySelector("#profile-bio-input"),l=document.querySelector("#card-add-popup"),i=l.querySelector("#card-place-input"),s=l.querySelector("#card-url-input"),d=document.querySelectorAll(".popup"),p=document.querySelector("#profile-name-input"),m=document.querySelector("#profile-bio-input"),f=document.querySelector("#profile-edit-popup"),v=document.querySelector("#card-add-popup"),y=document.querySelector("#image-popup"),S=y.querySelector(".popup__image"),_=y.querySelector(".popup__caption"),q=document.querySelector(".profile__name"),L=document.querySelector(".profile__bio");function g(e){S.src=e.target.src,S.alt=e.target.alt,_.textContent=e.target.alt,E(y),y.style.background="rgba(0, 0, 0, 0.9)"}function E(e){e.classList.add("popup_opened"),e.style.opacity=1,function(e){window.addEventListener("keydown",x),e.addEventListener("click",C)}(e)}function k(){var e,t=function(){var e;return d.forEach((function(t){t.classList.contains("popup_opened")&&(e=t)})),e}();e=t,window.removeEventListener("keydown",x),e.removeEventListener("click",C),t.classList.remove("popup_opened"),t.style.opacity=.3}function x(e){"Escape"===e.key&&k()}function C(e){e.target.classList.contains("popup")&&k(),e.target.classList.contains("popup__close")&&k()}function b(e){document.querySelector(".elements").prepend(function(e){var t=document.querySelector(".element-template").content.querySelector(".element").cloneNode(!0);return t.querySelector(".element__name").textContent=e.cardName,t.querySelector(".element__image").alt=e.cardName,t.querySelector(".element__image").src=e.cardSource,t.querySelector(".element__like").addEventListener("click",N),t.querySelector(".element__delete").addEventListener("click",h),t.querySelector(".element__image").addEventListener("click",g),t}(e))}function h(e){e.target.closest(".element").remove()}function N(e){e.target.closest(".element__like").classList.toggle("element__like_active")}window.addEventListener("load",(function(){setTimeout((function(){for(var e=0;e<d.length;e++)d[e].style.display="flex"}),1e3)})),c.addEventListener("submit",(function(e){e.preventDefault(),q.textContent=a.value,L.textContent=u.value,k()})),l.addEventListener("submit",(function(e){e.preventDefault(),b({cardName:i.value,cardSource:s.value}),i.value="",s.value="",k()})),[{cardName:"Архыз",cardSource:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{cardName:"Челябинская область",cardSource:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{cardName:"Иваново",cardSource:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{cardName:"Камчатка",cardSource:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{cardName:"Холмогорский район",cardSource:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{cardName:"Байкал",cardSource:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){b(e)})),document.querySelector(".profile__add").addEventListener("click",(function(){i.value="",s.value="",e(v,n),E(v)})),document.querySelector(".profile__edit").addEventListener("click",(function(){p.value=q.textContent,m.value=L.textContent,e(f,n),E(f)})),o=n,Array.from(document.querySelectorAll(o.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,o){var n=Array.from(e.querySelectorAll(o.inputSelector)),c=e.querySelector(o.submitButtonSelector);r(n,c,o),n.forEach((function(a){a.addEventListener("input",(function(){!function(e,r,o){r.validity.valid?t(e,r,o):function(e,t,r,o){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o.inputErrorClass),n.textContent=r,n.classList.add(o.errorClass)}(e,r,r.validationMessage,o)}(e,a,o),r(n,c,o)}))}))}(e,o)}))})();