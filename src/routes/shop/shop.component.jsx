import { Routes, Route } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

import "./shop.styles.scss";

const Shop = () => {
  return (
    <Routes>
      {/* Route = /shop */}
      <Route index element={<CategoriesPreview />} />
      {/* Route = /shop/category */}
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
