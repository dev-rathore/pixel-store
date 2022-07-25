import { Routes, Route } from 'react-router-dom';

// import HomePage from './pages/homepage/homepage.component';
// import ShopPage from './pages/shop/shop.component';
// import Header from './components/header/header.component';

// function App() {
//   return (
//     <div>
//       <Header />
//       <Routes>
//         <Route exact path="/" element={<HomePage/>} />
//         <Route exact path="/shop" element={<ShopPage/>} />
//         {/* <Route exact path="/hats" component={HatsPage} /> */}
//       </Routes>
//     </div>
//   );
// }

import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';

const Shop = () => {
  return <h1>I am the shop page</h1>;
};

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;
