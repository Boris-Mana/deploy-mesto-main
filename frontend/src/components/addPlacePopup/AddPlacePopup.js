import PopupWithForm from "../popupWithForm/PopupWithForm";
import { useRef } from "react";

export default function AddPlacePopup({ isOpen, onClose, onAddCard }) {
  const placeTitleRef = useRef();
  const placeLinkeRef = useRef();

  const propsAddCardPopup = {
    title: "Новое место",
    name: "add-card",
    children: (
      <fieldset className="form__user-info">
        <input
          className="form__input form__input_name"
          type="text"
          name="placeName"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          id="card-name"
          ref={placeTitleRef}
        />
        <span className="form__input-error" id="card-name-error"></span>
        <input
          className="form__input form__input_profession"
          type="url"
          name="pictLink"
          placeholder="Ссылка на картинку"
          required
          id="card-link"
          ref={placeLinkeRef}
        />
        <span className="form__input-error" id="card-link-error"></span>
      </fieldset>
    ),
  };

  function handleSubmit(e) {
    e.preventDefault();
    onAddCard({
      name: placeTitleRef.current.value,
      link: placeLinkeRef.current.value,
    });
  }

  return (
    isOpen && (
      <PopupWithForm
        title={propsAddCardPopup.title}
        name={propsAddCardPopup.name}
        btnText="Сохранить"
        isOpen={isOpen}
        onClose={onClose}
        children={propsAddCardPopup.children}
        onSubmit={handleSubmit}
      />
    )
  );
}
