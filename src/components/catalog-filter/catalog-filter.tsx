import { memo, KeyboardEvent, ChangeEvent } from 'react';
import { FILTER_CATEGORIES, FILTER_TYPES, FILTER_LEVELS } from '../../const/const';
import { FilterCategories, FilterTypes, FilterLevels, Filters, KeyFilters, FilterPrice } from '../../types';
import { fetchProductsByPriceRange } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks';

type CatalogFilterProps = {
  minPrice: string;
  maxPrice: string;
  activeCategoryFilter: FilterCategories;
  activeTypeFilter: FilterTypes;
  activeLevelFilter: FilterLevels;
  onChangeFilter: (item: Filters, key: KeyFilters) => void;
  onResetFilters: () => void;
  onChangeFilterKeyDown: (event: KeyboardEvent<HTMLInputElement>, item: Filters, key: KeyFilters) => void;
  filterPrice: FilterPrice;
  onChangePriceFilterFrom: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangePriceFilterTo: (event: ChangeEvent<HTMLInputElement>) => void;
}

function CatalogFilterComponent({ minPrice, maxPrice, activeCategoryFilter, activeTypeFilter, activeLevelFilter, onChangeFilter, onResetFilters, onChangeFilterKeyDown, filterPrice, onChangePriceFilterFrom, onChangePriceFilterTo }: CatalogFilterProps): JSX.Element {

  const dispatch = useAppDispatch();

  function handleChangePriceFrom(event: ChangeEvent<HTMLInputElement>) {
    if (Number(event.target.value) < Number(minPrice)) {
      event.target.value = minPrice;
    }
    onChangePriceFilterFrom(event);
    dispatch(fetchProductsByPriceRange({ ...filterPrice, from: event.target.value }));
  }

  function handleChangePriceTo(event: ChangeEvent<HTMLInputElement>) {
    if (Number(event.target.value) > Number(maxPrice)) {
      event.target.value = maxPrice;
    }
    if (filterPrice.from && Number(filterPrice.from) > Number(event.target.value)) {
      event.target.value = maxPrice;
    }
    onChangePriceFilterTo(event);
    dispatch(fetchProductsByPriceRange({ ...filterPrice, to: event.target.value }));
  }

  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Цена, ₽</legend>
          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  name="price"
                  value={filterPrice.from}
                  placeholder={String(minPrice)}
                  onChange={onChangePriceFilterFrom}
                  onBlur={handleChangePriceFrom}
                >
                </input>
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  name="priceUp"
                  value={filterPrice.to}
                  placeholder={maxPrice}
                  onChange={(event) => onChangePriceFilterTo(event)}
                  onBlur={handleChangePriceTo}
                >
                </input>
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Категория</legend>
          {
            FILTER_CATEGORIES.map(({ name, label, text, key }) => (
              <div key={name} className="custom-checkbox catalog-filter__item">
                <label>
                  <input
                    type="checkbox"
                    name={name}
                    onChange={() => onChangeFilter(label, key)}
                    checked={label === activeCategoryFilter}
                    onKeyDown={(event) => onChangeFilterKeyDown(event, label, key)}
                  >
                  </input>
                  <span className="custom-checkbox__icon">
                  </span>
                  <span className="custom-checkbox__label">{text}</span>
                </label>
              </div>
            ))
          }
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Тип камеры</legend>
          {
            FILTER_TYPES.map(({ name, label, key, category }) => (
              <div key={name} className="custom-checkbox catalog-filter__item">
                <label>
                  <input
                    type="checkbox"
                    name={name}
                    onChange={() => onChangeFilter(label, key)}
                    checked={label === activeTypeFilter}
                    onKeyDown={(event) => onChangeFilterKeyDown(event, label, key)}
                    disabled={activeCategoryFilter && !category.includes(activeCategoryFilter)}
                  >
                  </input>
                  <span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">{label}</span>
                </label>
              </div>
            ))
          }
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Уровень</legend>
          {
            FILTER_LEVELS.map(({ name, label, key }) => (
              <div key={name} className="custom-checkbox catalog-filter__item">
                <label>
                  <input
                    type="checkbox"
                    name={name}
                    onChange={() => onChangeFilter(label, key)}
                    checked={label === activeLevelFilter}
                    onKeyDown={(event) => onChangeFilterKeyDown(event, label, key)}
                  >
                  </input>
                  <span className="custom-checkbox__icon"></span>
                  <span className="custom-checkbox__label">{label}</span>
                </label>
              </div>
            ))
          }
        </fieldset>
        <button
          className="btn catalog-filter__reset-btn"
          type="reset"
          onClick={onResetFilters}
        >
          Сбросить фильтры
        </button>
      </form>
    </div >
  );
}

const CatalogFilter = memo(CatalogFilterComponent);

export default CatalogFilter;
