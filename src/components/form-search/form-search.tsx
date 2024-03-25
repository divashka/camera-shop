import { memo, useState, useRef, ChangeEvent, KeyboardEvent, useEffect } from 'react';
import { useAppSelector } from '../../hooks';
import { getProducts } from '../../store/camera-slice/selectors';
import classNames from 'classnames';
import { Product } from '../../types';
import { useNavigate } from 'react-router-dom';
import { AppRoute, MIN_COUNT_SEARCH_RESULTS, MIN_COUNT_DELETE_SEARCH_RESULTS, NAME_KEY_ENTER, NAME_KEY_DOWN, NAME_KEY_UP } from '../../const/const';

function FormSearchComponent(): JSX.Element {

  const navigate = useNavigate();

  const products = useAppSelector(getProducts);

  const [searchValue, setSearchValue] = useState('');

  const [isListOpen, setIsListOpen] = useState(false);

  const [isSelectListOpen, setIsSelectListOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);

  const activeItemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.focus();
    }
  }, [selectedItem]);

  function handleChangeSearchValue(event: ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
    setIsListOpen(false);
    setIsSelectListOpen(false);

    products.forEach((product) => {
      const productNameConvert = product.name.toLowerCase().replaceAll(' ', '');
      const searchConvert = event.target.value.toLowerCase().replaceAll(' ', '');

      if (searchConvert.length >= MIN_COUNT_DELETE_SEARCH_RESULTS) {
        setIsListOpen(true);
      }

      if (searchConvert.length >= MIN_COUNT_SEARCH_RESULTS && productNameConvert.includes(searchConvert)) {
        setIsSelectListOpen(true);
      }
    });
  }

  function handleButtonCloseClick() {
    setSearchValue('');
    setIsListOpen(false);
    setIsSelectListOpen(false);
    setSelectedItem(-1);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  function handleSelectItemClick(id: Product['id']) {
    navigate(`${AppRoute.Product}${id}`);
  }

  function handleSelectItemFocusClick(event: KeyboardEvent<HTMLLIElement>, id: Product['id']) {
    if (event.code === NAME_KEY_ENTER) {
      navigate(`${AppRoute.Product}${id}`);
    }
  }

  const productsFilterBySearch = products.filter((product) => {
    const productNameConvert = product.name.toLowerCase().replaceAll(' ', '');
    const searchConvert = searchValue.toLowerCase().replaceAll(' ', '');
    return productNameConvert.includes(searchConvert);
  });

  function handleFormSearchKeydown(event: KeyboardEvent<HTMLFormElement>) {
    if (event.key === NAME_KEY_UP) {
      event.preventDefault();
      if (selectedItem === -1) {
        setSelectedItem(0);
      }
      setSelectedItem((prevSelectedItem) =>
        prevSelectedItem === 0 ? 0 : prevSelectedItem - 1
      );
    } else if (event.key === NAME_KEY_DOWN) {
      event.preventDefault();
      setSelectedItem((prevSelectedItem) =>
        prevSelectedItem === productsFilterBySearch.length - 1 ? productsFilterBySearch.length - 1 : prevSelectedItem + 1
      );
    }
  }

  return (
    <div className={classNames(
      'form-search',
      { 'list-opened': isListOpen }
    )}
    >
      <form
        onKeyDown={handleFormSearchKeydown}
      >
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input
            value={searchValue}
            onChange={handleChangeSearchValue}
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            ref={inputRef}
          >
          </input>
        </label>
        {isSelectListOpen &&
          <ul
            className="form-search__select-list"
          >
            {productsFilterBySearch.map((product, index) => (
              <li
                key={product.id}
                ref={selectedItem === index ? activeItemRef : null}
                className="form-search__select-item"
                tabIndex={0}
                onClick={() => handleSelectItemClick(product.id)}
                onKeyDown={(event) => handleSelectItemFocusClick(event, product.id)}
              >
                {product.name}
              </li>
            ))}
          </ul>}
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
