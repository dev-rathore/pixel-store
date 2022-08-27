import { useNavigate } from "react-router-dom";

import "./directory-item.styles.scss";

const DirectoryItem = ({ category }) => {
  const { imageUrl, title, size, position } = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(`shop/${title}`);

  return (
    <div
      className={`directory-item-container ${size}`}
      onClick={onNavigateHandler}
    >
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundPosition: `${position}`,
        }}
      />
      <div className="directory-item-body">
        <h2>{title.toUpperCase()}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default DirectoryItem;
