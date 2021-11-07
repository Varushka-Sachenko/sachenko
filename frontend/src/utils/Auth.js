export const BASE_URL = 'https://auth.nomoreparties.co';

const checkResult = (res) => {
  if (res.ok) {
    return res
  }
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
}

const changeToJson = (res) => {
  return res.json()
}


export const register = (email, password) => {
    //console.log(email, password)
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(({
        "email": email,
        "password": password
      }))
  })
  .then((response) => {
    return checkResult (response)
  })
  .then((res) => {
    return (changeToJson(res))
  })
}; 

export const authorise = (email, password) => {
    //console.log(email, password)
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((response) => {
    return (checkResult(response))
  })
  .then((res) => {
    return (changeToJson(res))
  })
  .then((data) => {
    if (data.token){
      localStorage.setItem('token', data.token);
      //console.log(data)
      return data;
    } else {
      return;
    }
   }) 
}; 

export const getContent = (token) => {
  //console.log(token)
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
    },
  })
  .then((response) => {
    return (checkResult(response))
  })
  .then((res) => {
    return (changeToJson(res))
  })
}; 