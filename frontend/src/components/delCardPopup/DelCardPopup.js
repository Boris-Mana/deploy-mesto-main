export default function DelCardPopup({ title, isOpen, onClose, onDelCard }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDelCard();
  }

  return (
    <div
      className={`popup popup_type_del-card ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          name="close"
          onClick={onClose}
        ></button>
        <form
          className="form form_del-card"
          name="delCard"
          id=""
          noValidate
          onSubmit={handleSubmit}
        >
          <h2 className="form__title">{title}</h2>
          <button
            className="form__save form__save_active"
            type="submit"
            name="delete"
          >
            Да
          </button>
        </form>
      </div>
    </div>
  );
}
