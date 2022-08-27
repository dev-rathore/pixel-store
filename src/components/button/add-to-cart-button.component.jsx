import "./add-to-cart-button.styles.scss";

const AddToCartButton = ({ children, ...otherProps }) => {
  return (
    <div className="add-to-cart">
      <button type="submit" className="add-to-cart-btn" {...otherProps}>
        <span className="shopping-cart">
          <i className="fa-solid fa-cart-plus" aria-hidden="true"></i>
        </span>
        <span className="shopping-cart-checked">
          <i className="fa-solid fa-arrow-right-long"></i>
        </span>
        <span className="add">{children}</span>
      </button>
    </div>
  );
};

export default AddToCartButton;
