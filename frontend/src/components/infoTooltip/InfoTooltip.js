import failIcon from "../../images/Union1.svg";
import successIcon from "../../images/iconSuccess.svg";

export default function InfoTooltip({
  isOpen,
  onClose,
  isResponseFail,
  message,
}) {
  return (
    <div className={`popup popup_type-tooltip ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_tooltip">
        <button
          className="popup__close-button"
          type="button"
          name="close"
          onClick={onClose}
        ></button>
        <img
          className="popup__tip-symbol"
          src={isResponseFail ? failIcon : successIcon}
          alt="картинка успех или не успех"
        />
        <h2 className="popup__tooltip-title">{message}</h2>
      </div>
    </div>
  );
}
