const fetchConfig = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort7',
  headers: {
    authorization: '9efb02c5-3a98-4492-ad54-7eb38e1b2fa2',
    'Content-Type': 'application/json'
  }
}

//функция проверки ответа на запрос
function getResponseData(res) {
  if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

//запрос на получение карточек для загрузки на страницу
const getInitialCards = () => {
  return fetch(`${fetchConfig.baseUrl}/cards`,{
    headers: fetchConfig.headers
  })
    .then(res => {
      return getResponseData(res);
    });
}

//запрос на получение данных пользователя
const getUserInfo = () => {
  return fetch(`${fetchConfig.baseUrl}/users/me`,{
    headers: fetchConfig.headers
  })
    .then(res => {
      return getResponseData(res);
    });
}

//запрос на загрузку карточки на сервер
const uploadCard = (cardObject) => {
  return fetch(`${fetchConfig.baseUrl}/cards`,{
    headers: fetchConfig.headers,
    method: 'POST',
    body: JSON.stringify(cardObject)
  })
  .then(res => {
    return getResponseData(res);
  });
}

//запрос на обновление профиля пользоватлея
const updateProfile = (profileObject) => {
  return fetch(`${fetchConfig.baseUrl}/users/me`,{
    headers: fetchConfig.headers,
    method: 'PATCH',
    body: JSON.stringify(profileObject)
  })
  .then(res => {
    return getResponseData(res);
  });
}

//запрос на удаление карточки с сервера
const deleteCardOnServer = (cardId) => {
  return fetch(`${fetchConfig.baseUrl}/cards/${cardId}`,{
    headers: fetchConfig.headers,
    method: 'DELETE',
  })
  .then(res => {
    return getResponseData(res);
  });
}

//запрос на постановку/снятие лайка
const setLikeOnServer = (cardId, likeAction) => {
  return fetch(`${fetchConfig.baseUrl}/cards/likes/${cardId}`,{
    headers: fetchConfig.headers,
    method: likeAction,
  })
    .then(res => {
      return getResponseData(res);
    });
}

//запрос на загрузку нового аватара
const uploadNewAvatar = (avatarLink) => {
  return fetch(`${fetchConfig.baseUrl}/users/me/avatar`,{
    headers: fetchConfig.headers,
    method: 'PATCH',
    body: JSON.stringify({"avatar": avatarLink})
  })
  .then(res => {
    return getResponseData(res);
  });
}

export {getInitialCards, getUserInfo, uploadCard, updateProfile, deleteCardOnServer, setLikeOnServer, uploadNewAvatar};
