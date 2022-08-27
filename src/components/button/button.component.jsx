import "./button.styles.scss";

const BUTTON_TYPE_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
};

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {buttonType === "google" ? (
        <i className="google-icon fa-brands fa-google"></i>
      ) : (
        <span></span>
      )}
      {children}
    </button>
  );
};

export default Button;
