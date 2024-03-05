import { memo, KeyboardEvent, ChangeEvent } from 'react';
import { FILTER_CATEGORIES, FILTER_TYPES, FILTER_LEVELS } from '../../const/const';
import { FilterCategories, FilterTypes, FilterLevels, Filters, KeyFilters } from '../../types';

type CatalogFilterProps = {
  minPrice: string;
  maxPrice: string;
  activeCategoryFilter: FilterCategories;
  activeTypeFilter: FilterTypes;
  activeLevelFilter: FilterLevels;
  onChangeFilter: (item: Filters, key: KeyFilters) => void;
  onResetFilters: () => void;
  onChangeFilterKeyDown: (event: KeyboardEvent<HTMLInputElement>, item: Filters, key: KeyFilters) => void;
  onChangePriceFilter: (event: ChangeEvent<HTMLInputElement>, key: string) => void;
}

function CatalogFilterComponent({ minPrice, maxPrice, activeCategoryFilter, activeTypeFilter, activeLevelFilter, onChangeFilter, onResetFilters, onChangeFilterKeyDown, onChangePriceFilter }: CatalogFilterProps): JSX.Element {
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
                  placeholder={minPrice}
                  onChange={(event) => onChangePriceFilter(event, 'from')}
                >
                </input>
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  name="priceUp"
                  placeholder={maxPrice}
                  onChange={(event) => onChangePriceFilter(event, 'to')}
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
            FILTER_TYPES.filter(({ category }) => {
              if (!activeCategoryFilter) {
                return true;
              }
              return category.includes(activeCategoryFilter);
            }).map(({ name, label, key }) => (
              <div key={name} className="custom-checkbox catalog-filter__item">
                <label>
                  <input
                    type="checkbox"
                    name={name}
                    onChange={() => onChangeFilter(label, key)}
                    checked={label === activeTypeFilter}
                    onKeyDown={(event) => onChangeFilterKeyDown(event, label, key)}
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
    </div>
  );
}

const CatalogFilter = memo(CatalogFilterComponent);

export default CatalogFilter;
