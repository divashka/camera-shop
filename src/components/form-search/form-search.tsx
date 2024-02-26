import { memo, useState, ChangeEvent, KeyboardEvent } from 'react';
import { useAppSelector } from '../../hooks';
import { getProducts } from '../../store/camera-slice/selectors';
import classNames from 'classnames';
import { Product } from '../../types';
import { useNavigate } from 'react-router-dom';
import { AppRoute, MIN_COUNT_SEARCH_RESULTS, NAME_KEY_ENTER } from '../../const/const';

function FormSearchComponent(): JSX.Element {

  const navigate = useNavigate();

  const products = useAppSelector(getProducts);

  const [searchValue, setSearchValue] = useState('');

  const [isSelectListOpen, setIsSelectListOpen] = useState(false);

  function handleChangeSearchValue(event: ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
    setIsSelectListOpen(false);

    products.forEach((product) => {
      const productNameConvert = product.name.toLowerCase().replaceAll(' ', '');
      const searchConvert = searchValue.toLowerCase().replaceAll(' ', '');

      if (searchConvert.length >= MIN_COUNT_SEARCH_RESULTS - 1 && productNameConvert.includes(searchConvert)) {
        setIsSelectListOpen(true);
      }
    });
  }

  function handleButtonCloseClick() {
    setSearchValue('');
    setIsSelectListOpen(false);
  }

  function handleSelectItemClick(id: Product['id']) {
    navigate(`${AppRoute.Product}${id}`);
  }

  function handleSelectItemFocusClick(event: KeyboardEvent<HTMLLIElement>, id: Product['id']) {
    if (event.code === NAME_KEY_ENTER) {
      navigate(`${AppRoute.Product}${id}`);
    }
  }

  return (
    <div className={classNames(
      'form-search',
      { 'list-opened': isSelectListOpen }
    )}
    >
      <form>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input value={searchValue} onChange={handleChangeSearchValue} className="form-search__input" type="text" autoComplete="off" placeholder="Поиск по сайту">
          </input>
        </label>
        <ul className="form-search__select-list">
          {products
            .filter((product) => {
              const productNameConvert = product.name.toLowerCase().replaceAll(' ', '');
              const searchConvert = searchValue.toLowerCase().replaceAll(' ', '');
              return productNameConvert.includes(searchConvert);
            }).map((product) => (
              <li
                key={product.id}
                className="form-search__select-item"
                tabIndex={0}
                onClick={() => handleSelectItemClick(product.id)}
                onKeyDown={(event) => handleSelectItemFocusClick(event, product.id)}
              >
                {product.name}
              </li>
            ))}
        </ul>
      </form>
      <button
        className="form-search__reset"
        type="reset"
        onClick={handleButtonCloseClick}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg><span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}

const FormSearch = memo(FormSearchComponent);

export default FormSearch;
