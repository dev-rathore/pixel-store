import Loader from "../loader/loader.component";
import "./button.styles.scss";

const BUTTON_TYPE_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
};

const Button = ({ children, buttonType, isLoading = false, ...otherProps }) => {
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
      {isLoading ? <Loader size="small"/> : children}
    </button>
  );
};

export default Button;
