import PopupWithForm from "../popupWithForm/PopupWithForm";
import { useState } from "react";

export default function Login({ onSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSignIn({ email, password });
  };

  const propsSignIn = {
    title: "Вход",
    name: "signin",
    closeBtnHidden: "popup__close-button_hidden",
    children: (
      <fieldset className="form__user-info">
        <input
          className="form__input-auth form__input_name"
          type="Email"
          name="email"
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
    <>
      <PopupWithForm
        title={propsSignIn.title}
        titleClassModif="form__title_signin"
        saveBtnModif="form__save_signin"
        name={propsSignIn.name}
        containerModif={"popup__container_signin"}
        btnText="Войти"
        modif={"form_signin"}
        closeBtnHidden={propsSignIn.closeBtnHidden}
        isOpen={true}
        children={propsSignIn.children}
        onSubmit={handleSubmit}
      />
    </>
  );
}
