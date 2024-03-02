import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import CardsList from '../../components/cards-list/cards-list';
import { useAppSelector } from '../../hooks';
import { getProducts } from '../../store/camera-slice/selectors';
import Banner from '../../components/banner/banner';
import Pagination from '../../components/pagination/pagination';
import { useCallback } from 'react';
import { MAX_COUNT_PER_PAGE } from '../../const/const';
import Modal from '../../components/modal/modal';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import { SortNames, DirectionFlowCatalog } from '../../const/const';
import { Product } from '../../types';

function Catalog(): JSX.Element {

  const products = useAppSelector(getProducts);

  const [searchParams, setSearchParams] = useSearchParams();
  const [productsPerPage] = useState(MAX_COUNT_PER_PAGE);

  const [activeSortItem, setActiveSortItem] = useState<'' | SortNames>('');

  const [activeFlowDirection, setActiveFlowDirection] = useState<'' | DirectionFlowCatalog>('');

  function changeActiveSortItem(item: SortNames) {
    setActiveSortItem(item);
    if (activeFlowDirection === '') {
      setActiveFlowDirection(DirectionFlowCatalog.Up);
    }
  }

  function changeActiveFlowDirection(item: DirectionFlowCatalog) {
    if (activeSortItem === '') {
      setActiveSortItem(SortNames.Price);
    }
    setActiveFlowDirection(item);
  }

  const currentPage = Number(searchParams.get('page') || '1');

  const endIndex = Number(currentPage) * productsPerPage;

  const startIndex = endIndex - productsPerPage;

  const currentProducts = products.slice(startIndex, endIndex);

  function sortProducts(item: '' | SortNames) {
    switch (item) {
      case SortNames.Popular:
        if (activeFlowDirection === DirectionFlowCatalog.Up) {
          return currentProducts.slice().sort((ProductA: Product, ProductB: Product) => ProductA.rating - ProductB.rating);
        }
        return currentProducts.slice().sort((ProductA: Product, ProductB: Product) => ProductB.rating - ProductA.rating);
      case SortNames.Price:
        if (activeFlowDirection === DirectionFlowCatalog.Up) {
          return currentProducts.slice().sort((ProductA: Product, ProductB: Product) => ProductA.price - ProductB.price);
        }
        return currentProducts.slice().sort((ProductA: Product, ProductB: Product) => ProductB.price - ProductA.price);
      default:
        return currentProducts;
    }
  }

  const currentProductsSort = sortProducts(activeSortItem);

  const calculatePaginate = useCallback((pageNumber: number) => setSearchParams({ page: String(pageNumber) }), [setSearchParams]);

  return (
    <div className="wrapper">
      <Header></Header>

      <main>
        <Banner></Banner>

        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="index.html">Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </a>
                </li>
                <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>
                </li>
              </ul>
            </div>
          </div>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <div className="catalog-filter">
                    <form action="#">
                      <h2 className="visually-hidden">Фильтр</h2>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Цена, ₽</legend>
                        <div className="catalog-filter__price-range">
                          <div className="custom-input">
                            <label>
                              <input type="number" name="price" placeholder="от"></input>
                            </label>
                          </div>
                          <div className="custom-input">
                            <label>
                              <input type="number" name="priceUp" placeholder="до"></input>
                            </label>
                          </div>
                        </div>
                      </fieldset>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Категория</legend>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="photocamera"></input>
                            <span className="custom-checkbox__icon">
                            </span>
                            <span className="custom-checkbox__label">Фотокамера</span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="videocamera"></input><span className="custom-checkbox__icon"></span>
                            <span className="custom-checkbox__label">Видеокамера
                            </span>
                          </label>
                        </div>
                      </fieldset>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Тип камеры</legend>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="digital"></input><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Цифровая</span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="film"></input><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Плёночная</span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="snapshot"></input><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Моментальная</span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="collection"></input>
                            <span className="custom-checkbox__icon">
                            </span>
                            <span className="custom-checkbox__label">Коллекционная</span>
                          </label>
                        </div>
                      </fieldset>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Уровень</legend>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="zero"></input><span className="custom-checkbox__icon"></span>
                            <span className="custom-checkbox__label">Нулевой</span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="non-professional"></input>
                            <span className="custom-checkbox__icon">
                            </span>
                            <span className="custom-checkbox__label">Любительский</span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="professional"></input><span className="custom-checkbox__icon"></span>
                            <span className="custom-checkbox__label">Профессиональный
                            </span>
                          </label>
                        </div>
                      </fieldset>
                      <button className="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры
                      </button>
                    </form>
                  </div>
                </div>
                <div className="catalog__content">
                  <CatalogSort
                    activeSortItem={activeSortItem}
                    changeActiveSortItem={changeActiveSortItem}
                    changeActiveFlowDirection={changeActiveFlowDirection}
                    activeFlowDirection={activeFlowDirection}
                  >
                  </CatalogSort>

                  <CardsList products={currentProductsSort}></CardsList>

                  {
                    products.length > MAX_COUNT_PER_PAGE &&
                    <Pagination
                      currentPage={currentPage}
                      totalProducts={products.length}
                      productsPerPage={productsPerPage}
                      onPaginateButtonClick={calculatePaginate}
                    />
                  }
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Modal></Modal>

      <Footer></Footer>
    </div>
  );
}

export default Catalog;

