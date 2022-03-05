const fetchConfig = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort7',
  headers: {
    authorization: '9efb02c5-3a98-4492-ad54-7eb38e1b2fa2',
    'Content-Type': 'application/json'
  }
}

/*fetch('https://nomoreparties.co/v1/plus-cohort7/cards', {
  headers: {
    authorization: '9efb02c5-3a98-4492-ad54-7eb38e1b2fa2'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });

  fetch('https://nomoreparties.co/v1/plus-cohort7/users/me', {
    headers: {
      authorization: '9efb02c5-3a98-4492-ad54-7eb38e1b2fa2'
    }
  })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
    });
*/

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

export {getInitialCards, getUserInfo, uploadCard};
