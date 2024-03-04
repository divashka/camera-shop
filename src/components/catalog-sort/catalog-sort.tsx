import { memo } from 'react';
import { SortNames, DirectionFlowCatalog, SortMap, DirectionFlowMap } from '../../const/const';
import { capitalizeFirstLetter } from '../../utils/utils';

type CatalogSortProps = {
  activeSortItem: '' | SortNames;
  changeActiveSortItem: (type: SortNames) => void;
  changeActiveFlowDirection: (type: DirectionFlowCatalog) => void;
  activeFlowDirection: '' | DirectionFlowCatalog;
};

function CatalogSortComponent({ activeSortItem, changeActiveSortItem, changeActiveFlowDirection, activeFlowDirection }: CatalogSortProps): JSX.Element {

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            {Object.entries(SortMap).map(([type, label]) => (
              <div key={type} className="catalog-sort__btn-text">
                <input
                  type="radio"
                  id={`sort${type}`}
                  name="sort"
                  onChange={() => changeActiveSortItem(type as SortNames)}
                  checked={capitalizeFirstLetter(type) === activeSortItem}
                >
                </input>
                <label htmlFor={`sort${type}`}>{label}</label>
              </div>
            ))}
          </div>
          <div className="catalog-sort__order">
            {Object.entries(DirectionFlowMap).map(([type, label]) => (
              <div key={type} className={`catalog-sort__btn catalog-sort__btn--${capitalizeFirstLetter(type)}`}>
                <input
                  type="radio"
                  id={type}
                  name="sort-icon"
                  aria-label={label}
                  onChange={() => changeActiveFlowDirection(type as DirectionFlowCatalog)}
                  checked={capitalizeFirstLetter(type) === activeFlowDirection}
                >
                </input>
                <label htmlFor={type}>
                  <svg width="16" height="14" aria-hidden="true">
                    <use xlinkHref="#icon-sort"></use>
                  </svg>
                </label>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}

const CatalogSort = memo(CatalogSortComponent);

export default CatalogSort;
