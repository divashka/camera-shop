import { useState, useMemo, KeyboardEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import CardsList from '../../components/cards-list/cards-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getProducts } from '../../store/camera-slice/selectors';
import Banner from '../../components/banner/banner';
import Pagination from '../../components/pagination/pagination';
import { useCallback } from 'react';
import { MAX_COUNT_PER_PAGE, NAME_KEY_ENTER } from '../../const/const';
import Modal from '../../components/modal/modal';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import { SortNames, DirectionFlowCatalog } from '../../const/const';
import { getSortedProducts } from '../../store/camera-slice/selectors';
import { capitalizeFirstLetter } from '../../utils/utils';
import { setActiveSortItem, setActiveFlowDirection } from '../../store/camera-slice/camera-slice';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import { FilterCategories, FilterTypes, FilterLevels, Filters, KeyFilters } from '../../types';

type Params = {
  page: string;
  sort?: string;
  dir?: string;
  cat?: string;
  type?: string;
  lev?: string;
}

function Catalog(): JSX.Element {

  const products = useAppSelector(getProducts);

  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const [productsPerPage] = useState(MAX_COUNT_PER_PAGE);

  const activeSortItem: SortNames | '' = searchParams.get('sort') as SortNames || '';

  const activeFlowDirection: DirectionFlowCatalog | '' = searchParams.get('dir') as DirectionFlowCatalog || '';

  const activeCategoryFilter: FilterCategories = searchParams.get('cat') as FilterCategories || '';

  const activeTypeFilter: FilterTypes = searchParams.get('type') as FilterTypes || '';

  const activeLevelFilter: FilterLevels = searchParams.get('lev') as FilterLevels || '';

  function getParams() {
    return {
      page: '1',
    };
  }

  const params: Params = useMemo(() => getParams(), []);

  const handleChangeActiveSortItem = useCallback((item: SortNames) => {
    params.sort = capitalizeFirstLetter(item);

    setSearchParams(params);
    dispatch(setActiveSortItem(capitalizeFirstLetter(item) as SortNames));
    if (!activeFlowDirection) {
      params.dir = capitalizeFirstLetter(DirectionFlowCatalog.Up);
      setSearchParams(params);
      dispatch(setActiveFlowDirection(capitalizeFirstLetter(DirectionFlowCatalog.Up) as DirectionFlowCatalog));
    }
  }, [activeFlowDirection, dispatch, params, setSearchParams]);

  const handleChangeActiveFlowDirection = useCallback((item: DirectionFlowCatalog) => {
    if (!activeSortItem) {
      params.sort = capitalizeFirstLetter(SortNames.Price);
      setSearchParams(params);
      dispatch(setActiveSortItem(capitalizeFirstLetter(SortNames.Price) as SortNames));
    }
    params.dir = capitalizeFirstLetter(item);
    setSearchParams(params);
    dispatch(setActiveFlowDirection(capitalizeFirstLetter(item) as DirectionFlowCatalog));
  }, [activeSortItem, dispatch, params, setSearchParams]);

  function handleChangeFilter(item: Filters, key: KeyFilters) {
    params[key] = item;
    setSearchParams(params);
  }

  function handleChangeFilterKeyDown(event: KeyboardEvent<HTMLInputElement>, item: Filters, key: KeyFilters) {
    if (event.code === NAME_KEY_ENTER) {
      params[key] = item;
      setSearchParams(params);
    }
  }

  function handleResetFilters() {
    delete params.cat;
    delete params.type;
    delete params.lev;
    setSearchParams(params);
  }

  const currentPage = Number(searchParams.get('page') || '1');

  const endIndex = Number(currentPage) * productsPerPage;

  const startIndex = endIndex - productsPerPage;

  const currentProducts = products.slice(startIndex, endIndex);

  const currentProductsFilter = currentProducts.filter((product) => {
    if (!activeCategoryFilter) {
      return true;
    }
    return product.category === activeCategoryFilter;
  })
    .filter((product) => {
      if (!activeTypeFilter) {
        return true;
      }
      return product.type === activeTypeFilter;
    })
    .filter((product) => {
      if (!activeLevelFilter) {
        return true;
      }
      return product.level === activeLevelFilter;
    });

  const currentProductsSort = useAppSelector(getSortedProducts(currentProductsFilter));

  const calculatePaginate = useCallback((pageNumber: number) => {
    params.page = String(pageNumber);
    setSearchParams(params);
  }, [setSearchParams, params]);

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

                  <CatalogFilter
                    activeCategoryFilter={activeCategoryFilter}
                    onChangeFilter={handleChangeFilter}
                    activeTypeFilter={activeTypeFilter}
                    activeLevelFilter={activeLevelFilter}
                    onResetFilters={handleResetFilters}
                    onChangeFilterKeyDown={handleChangeFilterKeyDown}
                  />

                </div>
                <div className="catalog__content">
                  <CatalogSort
                    activeSortItem={activeSortItem}
                    activeFlowDirection={activeFlowDirection}
                    onChangeActiveSortItem={handleChangeActiveSortItem}
                    onChangeActiveFlowDirection={handleChangeActiveFlowDirection}
                  />

                  <CardsList products={currentProductsSort} />

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

