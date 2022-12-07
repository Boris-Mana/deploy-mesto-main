import PopupWithForm from "../popupWithForm/PopupWithForm";
import { useRef } from "react";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  const propsEditAvatarPopup = {
    title: "Обновить аватар?",
    name: "avatar-edit",
    children: (
      <fieldset className="form__user-info">
        <input
          className="form__input form__input_profession"
          type="url"
          name="pictLink"
          placeholder="Ссылка фото аватара"
          required
          id="avatar-link"
          ref={avatarRef}
        />
        <span className="form__input-error" id="avatar-link-error"></span>
      </fieldset>
    ),
  };

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    isOpen && (
      <PopupWithForm
        title={propsEditAvatarPopup.title}
        name={propsEditAvatarPopup.name}
        btnText="Сохранить"
        modif="form_edit-avatar"
        isOpen={isOpen}
        onClose={onClose}
        children={propsEditAvatarPopup.children}
        onSubmit={handleSubmit}
      />
    )
  );
}
