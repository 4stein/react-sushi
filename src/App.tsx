import React from "react";
import { Routes, Route } from "react-router-dom";
import { MainLeyout } from "./components/layouts";
import Home from "./pages/Home";

const Cart = React.lazy(
  () => import(/* webpackChunkName: "Cart" */ "./pages/Cart")
);
const NotFound = React.lazy(
  () => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound")
);
const Sushi = React.lazy(
  () => import(/* webpackChunkName: "Sushi" */ "./pages/Sushi")
);

const App: React.FC = () => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={<MainLeyout />}>
        <Route index element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="sushi/:id" element={<Sushi />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </React.Suspense>
);

export default App;
