



class Api {

  constructor({ adress, token }) {
    this.adress = adress
    this._token = token
  }
  _checkResult(res) {
    if (res.ok) {
      // const k = res.json()
      // console.log(k)
      return res
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _changeToJson(res) {
    return res.json()
  }

  getInitialCards() {
    //console.log('checkapi')
    return fetch(`${this.adress}/cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => {
        return this._checkResult(res)
      })
      .then(res => {
        return this._changeToJson(res)
      })

  }

  loadUserInfo() {
    return fetch(`${this.adress}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => {
        return this._checkResult(res)
        // console.log(res)
      })
      .then(res => {
        return this._changeToJson(res)
      })


  }

  editProfileINfo(data) {
    
    return fetch(`${this.adress}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
      .then(res => {
        
        return this._checkResult(res)
      })
      .then(res => {
        return this._changeToJson(res)
      })
  }

  addNewCard(data) {
    return fetch(`${this.adress}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
      .then(res => {
        return this._checkResult(res)
      })
      .then(res => {
        return this._changeToJson(res)
      })

  }

  deleteCard(cardId) {
    return fetch(`${this.adress}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        // 'Content-Type': 'application/json'
      },
    })
      .then(res => {

        return this._checkResult(res)
      })
      .then(res => {
        return this._changeToJson(res)
      })

  }


  likeCard(cardId) {

    return fetch(`${this.adress}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
    })
      .then(res => {
        return this._checkResult(res)
      })
      .then(res => {
        return this._changeToJson(res)
      })
  }

  unlikeCard(cardId) {
    return fetch(`${this.adress}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
    })
      .then(res => {
        // console.log(this._token)
        return this._checkResult(res)
      })
      .then(res => {
        return this._changeToJson(res)
      })

  }

  changeLikeCardStatus(cardId, likeStatus) {

    if (likeStatus) {
      return (this.likeCard(cardId))
      //console.log('like works1', likeStatus)
    }
    else {
      return (this.unlikeCard(cardId))
      //console.log('like works2', likeStatus)
    }

  }

  changeAvatar(link) {
    //console.log(link)
    return fetch(`${this.adress}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link.avatar,
      })
    })
      .then(res => {
        // console.log(res)
        return this._checkResult(res)
      })
      .then(res => {
        return this._changeToJson(res)
      })

  }
}

const classApi = new Api({
  adress: 'https://mesto.nomoreparties.co/v1/cohort-24',
  token: 'a94d4dc8-3936-43d8-a3b5-2773303eb737'
})

export default classApi;
