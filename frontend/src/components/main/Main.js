import { useContext } from "react";

import pen from "../../images/pen.svg";
import cross from "../../images/cross.svg";
import Card from "../card/Card";
import Footer from "../footer/Footer";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { CardsContext } from "../../contexts/CardsContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  isUserDataReceived,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);
  const cardsArr = useContext(CardsContext);

  const cardsElements = cardsArr.map((card) => (
    <Card
      card={card}
      key={card._id}
      onCardClick={onCardClick}
      onCardLike={onCardLike}
      onCardDelete={onCardDelete}
    />
  ));

  function sectionUserInfo() {
    return (
      <section className="profile root__container root__container_margins_for-profile">
        <div className="profile__container-foto">
          <button
            className="profile__foto-edit"
            type="button"
            name="avatar edit"
            onClick={onEditAvatar}
          ></button>
          <img
            className="profile__foto"
            src={currentUser.avatar}
            alt={currentUser.name}
          />
        </div>

        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit-batton"
            type="button"
            name="edit"
            onClick={onEditProfile}
          >
            <img className="profile__pen" src={pen} alt="изображение ручки" />
          </button>
          <p className="profile__profession">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-batton"
          type="button"
          name="add"
          onClick={onAddPlace}
        >
          <img className="profile__cross" src={cross} alt="крестик" />
        </button>
      </section>
    );
  }

  return (
    <>
      <main className="content">
        {isUserDataReceived && sectionUserInfo()}
        <div className="elements">{cardsElements}</div>
      </main>
      <Footer />
    </>
  );
}

export default Main;
