// import userCreds from "./userCreds";
const urlBase = "https://api.manproj.students.nomoredomains.sbs";
// 'http://localhost:3001' 
//"https://mesto.nomoreparties.co/v1/";
const urlSuffixCard = "/cards";
const urlSuffixUsers = "/users/me";
const urlSuffixLikes = "/likes";
const urlSuffixAvatar = "/avatar";

const credentialsValue = 'include';

let token = localStorage.getItem("token")

export class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;

    this._urlCards = `${this._url}${urlSuffixCard}`;
    this._urlProfile = `${this._url}${urlSuffixUsers}`;
    
    this._credentials = config.credentials;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Ошибка! " + res.status);
  }

  getUserInfo() {
    return fetch(this._urlProfile, {
      method: "GET",
      headers: this._headers,
      credentials: this._credentials,
    }).then(this._handleResponse);
  }

  getCards() {
    return fetch(this._urlCards, {
      method: "GET",
      headers: this._headers,
      credentials: this._credentials,
    }).then(this._handleResponse);
  }

  editAvatar(data) {
    return fetch(`${this._urlProfile}${urlSuffixAvatar}`, {
      method: "PATCH",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }

  createElement(data) {
    return fetch(this._urlCards, {
      method: "POST",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }

  setLikeState(likeOnState, cardId) {
    if (likeOnState) {
      return fetch(`${this._urlCards}/${cardId}${urlSuffixLikes}`, {
        method: "PUT",
        headers: this._headers,
        credentials: this._credentials,
      }).then(this._handleResponse);
    } else {
      return fetch(`${this._urlCards}/${cardId}${urlSuffixLikes}`, {
        method: "DELETE",
        headers: this._headers,
        credentials: this._credentials,
      }).then(this._handleResponse);
    }
  }

  deleteElement(cardId) {
    return fetch(`${this._urlCards}/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({ _id: cardId }),
    }).then(this._handleResponse);
  }

  updateUserInfo(data) {
    return fetch(`${this._url}${urlSuffixUsers}`, {
      method: "PATCH",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }
}

export const api = new Api({
  url: `${urlBase}`, 
  credentials: credentialsValue,
  //${userCreds.cohortId}`
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});
