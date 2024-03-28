import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { AppRoute } from '../../const/const';
import Catalog from '../../pages/catalog/catalog';
import Basket from '../../pages/basket/basket';
import Product from '../../pages/product/product';
import { useAppSelector } from '../../hooks';
import { getLoadingProductsStatus } from '../../store/camera-slice/selectors';
import Loading from '../../pages/loading/loading';
import NotFound from '../../pages/not-found/not-found';

function App(): JSX.Element {

  const loading = useAppSelector(getLoadingProductsStatus);

  if (loading) {
    return <Loading></Loading>;
  }

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
            path={`${AppRoute.Product}/:id`}
            element={<Product />}
          />
          <Route
            path='*'
            element={<NotFound />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
