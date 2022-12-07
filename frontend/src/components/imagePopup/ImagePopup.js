export default function ImagePopup({ props, onClose }) {
  return (
    <div
      className={`popup popup_type_pic-view ${props !== null ? "popup_opened" : ""}`}
    >
      <div className="popup__container popup__container_picview">
        <button
          className="popup__close-button popup__close-button_pic-view"
          type="button"
          name="close"
          onClick={onClose}
        ></button>
        <img className="popup__photo" src={props.link} alt={props.title} />
        <h2 className="popup__title">{props.title}</h2>
      </div>
    </div>
  );
}
