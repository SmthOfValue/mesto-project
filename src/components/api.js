const fetchConfig = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort7',
  headers: {
    authorization: '9efb02c5-3a98-4492-ad54-7eb38e1b2fa2',
    'Content-Type': 'application/json'
  }
}

const getInitialCards = () => {
  return fetch(`${fetchConfig.baseUrl}/cards`,{
    headers: fetchConfig.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка при загрузке карточек: ${res.status}`);
    });
}

const getUserInfo = () => {
  return fetch(`${fetchConfig.baseUrl}/users/me`,{
    headers: fetchConfig.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка при получении данных пользователя: ${res.status}`);
    });
}

const uploadCard = (cardObject) => {
  return fetch(`${fetchConfig.baseUrl}/cards`,{
    headers: fetchConfig.headers,
    method: 'POST',
    body: JSON.stringify(cardObject)
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка при загрузке карточки: ${res.status}`);
  });
}

const updateProfile = (profileObject) => {
  return fetch(`${fetchConfig.baseUrl}/users/me`,{
    headers: fetchConfig.headers,
    method: 'PATCH',
    body: JSON.stringify(profileObject)
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка при обновлении профиля: ${res.status}`);
  });
}

const deleteCardOnServer = (cardId) => {
  return fetch(`${fetchConfig.baseUrl}/cards/${cardId}`,{
    headers: fetchConfig.headers,
    method: 'DELETE',
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка при удалении карты: ${res.status}`);
  });
}

const setLikeOnServer = (cardId, likeAction) => {
  return fetch(`${fetchConfig.baseUrl}/cards/likes/${cardId}`,{
    headers: fetchConfig.headers,
    method: likeAction,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка при постановке лайка: ${res.status}`);
    });
}

export {getInitialCards, getUserInfo, uploadCard, updateProfile, deleteCardOnServer, setLikeOnServer};
