import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner !== currentUser._id;
  const cardDeleteButtonClassName = `elements__delete ${
    isOwn && "elements__delete_hidden"
  }`;

  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `elements__like ${
    isLiked && "elements__like_active"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  return (
    <div className="elements__element" id={card.id}>
      <img
        className="elements__foto"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <button
        className={cardDeleteButtonClassName}
        type="button"
        name="Удалить"
        onClick={handleDeleteClick}
      ></button>
      <div className="elements__group">
        <h2 className="elements__title">{card.name}</h2>
        <div className="elements__like-group">
          <button
            className={cardLikeButtonClassName}
            type="button"
            name="like"
            onClick={handleLikeClick}
          ></button>
          <p className="elements__like-count">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}
