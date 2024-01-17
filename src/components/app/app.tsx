import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { AppRoute } from '../../const/const';
import Catalog from '../../pages/catalog/catalog';
import Basket from '../../pages/basket/basket';
import Product from '../../pages/product/product';

function App(): JSX.Element {

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<Catalog />}
          />
          <Route
            path={AppRoute.Basket}
            element={<Basket />}
          />
          <Route
            path={`${AppRoute.Product}:id`}
            element={<Product />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
