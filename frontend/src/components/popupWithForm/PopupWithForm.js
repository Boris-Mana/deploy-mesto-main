import { Route, Link } from "react-router-dom";

export default function PopupWithForm({
  title,
  titleClassModif,
  containerModif,
  saveBtnModif,
  name,
  btnText,
  modif,
  isOpen,
  onClose,
  closeBtnHidden,
  children,
  onSubmit,
}) {
  
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className={`popup__container ${containerModif ? containerModif : ''}`}>
        <button
          className={`popup__close-button ${closeBtnHidden ? closeBtnHidden : ""}`}
          type="button"
          name="close"
          onClick={onClose}
        ></button>
        <form
          className={`form ${modif ? modif : ''}`}
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          <h2 className={`form__title ${titleClassModif ? titleClassModif : ''}`}>{title}</h2>
          {children}
          <button
            className={`form__save form__save_active ${saveBtnModif}`}
            type="submit"
            name="save"
          >
            {btnText}
          </button>
          <Route path="/signup">            
            <Link className="popup__link-to-signin" to="/signin">Уже зарегистрированы? Войти</Link>
          </Route>
        </form>
      </div>
    </div>
  );
}
