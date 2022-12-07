import { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import "../index.css";
import Header from "./header/Header";
import Main from "./main/Main";
import Login from "./login/Login";
import Register from "./register/Register";
import { api } from "../utils/api";
import ImagePopup from "./imagePopup/ImagePopup";
import EditProfilePopup from "./editProfilePopup/EditProfilePopup";
import EditAvatarPopup from "./editAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "./addPlacePopup/AddPlacePopup";
import DelCardPopup from "./delCardPopup/DelCardPopup";
import InfoTooltip from "./infoTooltip/InfoTooltip";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardsContext } from "../contexts/CardsContext";
import * as mestoAuth from "../utils/mestoAuth";

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDelCardPopupOpen, setIsDelCardPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isUserDataReceived, setIsUserDataReceived] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cardsArr, setCardsArr] = useState([]);
  const [delCard, setDelCard] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isResponseFail, setIsResponseFail] = useState(true);
  const [message, setMessage] = useState("");

  const [userData, setUserData] = useState({});
  const history = useHistory();

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([data, cards]) => {
        setCurrentUser({
          name: data.name,
          about: data.about,
          avatar: data.avatar,
          _id: data._id,
        });
        setIsUserDataReceived(true);
        setCardsArr(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn]);

  const auth = (jwt) => {
    return mestoAuth.getContent(jwt).then((res) => {
      if (res) {        
        setUserData({...userData, email: res.email});
        setLoggedIn(true);
        history.push('/')        
      }
    });
  };

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      auth(jwt);      
      setLoggedIn(true);
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn]);

  const onLogin = ({ email, password }) => {
    return mestoAuth
      .authorize(email, password)
      .then((res) => {
        localStorage.setItem("token", res.token);
        setCurrentUser({ ...currentUser, email: email });
        setLoggedIn(true);
      })
      .catch((err) => {
        setMessage("Что-то пошло не так! Попробуйте ещё раз.");
        setIsInfoTooltipOpen(true);
        setIsResponseFail(true);
        console.log("Ошибка авторизации:", err);
      });
  };

  const onRegister = ({ email, password }) => {
    return mestoAuth
      .register(email, password)
      .then(() => {
        setIsInfoTooltipOpen(true);
        setIsResponseFail(false);
        setMessage("Вы успешно зарегистрировались");
        history.push("/signin");
      })
      .catch((err) => {
        setMessage("Что-то пошло не так! Попробуйте ещё раз.", err);
        setIsInfoTooltipOpen(true);
        setIsResponseFail(true);

        console.log("Ошибка регистрации:", err);
      });
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .setLikeState(!isLiked, card._id)
      .then((newCard) => {
        setCardsArr((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSignOut = () => {
    setLoggedIn(false);
    setIsInfoTooltipOpen(false);
    setIsResponseFail(false);
    localStorage.removeItem("token");
  };

  const handleCardDeleteSubmit = () => {
    api
      .deleteElement(delCard._id)
      .then(() => {
        setCardsArr((state) =>
          state.filter((item) => delCard._id !== item._id)
        );
        closeAllPopups();
        setDelCard({});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleDelCardClick = (card) => {
    setIsDelCardPopupOpen(true);
    setDelCard(card);
  };

  const handleCardClick = (card) => {
    setSelectedCard({ title: card.name, link: card.link });
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDelCardPopupOpen(false);
    setSelectedCard(null);
  };

  const closeSuccessPopup = () => {
    setIsInfoTooltipOpen(false);
    loggedIn && history.push("/");
  };

  const handleUpdateUser = (data) => {
    api
      .updateUserInfo(data)
      .then((data) => {
        setCurrentUser({ ...currentUser, name: data.name, about: data.about });
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateAvatar = (data) => {
    api
      .editAvatar(data)
      .then((resp) => {
        setCurrentUser({ ...currentUser, avatar: resp.avatar });
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  function handleAddPlaceSubmit(data) {
    api
      .createElement(data)
      .then((newCard) => {
        setCardsArr([newCard, ...cardsArr]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cardsArr}>
        <div className="root">
          <Header userEmail={userData.email} onSignOut={handleSignOut} />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              isUserDataReceived={isUserDataReceived}
              onCardLike={handleCardLike}
              onCardDelete={handleDelCardClick}
            />
            <Route exact path="/signin">
              <Login onSignIn={onLogin} loggedIn={loggedIn} />
            </Route>

            <Route path="/signup">              
              <Register onSignUp={onRegister} loggedIn={loggedIn} />
            </Route>

            <Route exact path="/">
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
            </Route>
          </Switch>

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeSuccessPopup}
            isResponseFail={isResponseFail}
            message={message}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddCard={handleAddPlaceSubmit}
          />
          <DelCardPopup
            title="Ты уверен?"
            isOpen={isDelCardPopupOpen}
            onClose={closeAllPopups}
            onDelCard={handleCardDeleteSubmit}
          />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeSuccessPopup}
            isResponseFail={isResponseFail}
            message={message}
          />
          {selectedCard !== null && (
            <ImagePopup props={selectedCard} onClose={closeAllPopups} />
          )}
        </div>
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}
