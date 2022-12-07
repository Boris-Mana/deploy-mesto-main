import PopupWithForm from "../popupWithForm/PopupWithForm";
import { useState } from "react";

export default function Register({ onSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSignUp({ email, password });
  };

  const propsSignUp = {
    title: "Регистрация",
    name: "signin",
    closeBtnHidden: "popup__close-button_hidden",
    children: (
      <fieldset className="form__user-info">
        <input
          className="form__input-auth form__input_name"
          type="Email"
          name="name"
          placeholder="Email"
          required
          id="user-name"
          onChange={({ target }) => setEmail(target.value)}
        />
        <span className="form__input-error" id="user-name-error"></span>
        <input
          className="form__input-auth"
          type="password"
          name="password"
          placeholder="Пароль"
          required
          id="password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <span className="form__input-error" id="profession-error"></span>
      </fieldset>
    ),
  };

  return (
    <PopupWithForm
      title={propsSignUp.title}
      titleClassModif="form__title_signin"
      saveBtnModif="form__save_signin"
      name={propsSignUp.name}
      containerModif={"popup__container_signin"}
      btnText="Зарегистрироваться"
      modif={"form_signin"}
      closeBtnHidden={propsSignUp.closeBtnHidden}
      isOpen={true}
      children={propsSignUp.children}
      onSubmit={handleSubmit}
    />
  );
}
