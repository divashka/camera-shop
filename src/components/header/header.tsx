import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/const';
import { memo } from 'react';
import FormSearch from '../form-search/form-search';
import { useAppSelector } from '../../hooks';
import { getProductsFromCart } from '../../store/app-slice/selectors';

function HeaderComponent(): JSX.Element {

  const products = useAppSelector(getProductsFromCart);

  return (
    <header className="header" id="header">
      <div className="container">
        <Link className="header__logo" to={AppRoute.Root} aria-label="Переход на главную">
          <svg width="100" height="36" aria-hidden="true">
            <use xlinkHref="#icon-logo"></use>
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item"><Link className="main-nav__link" to={AppRoute.Root}>Каталог</Link>
            </li>
            <li className="main-nav__item"><a className="main-nav__link" href="#">Гарантии</a>
            </li>
            <li className="main-nav__item"><a className="main-nav__link" href="#">Доставка</a>
            </li>
            <li className="main-nav__item"><a className="main-nav__link" href="#">О компании</a>
            </li>
          </ul>
        </nav>
        <FormSearch />
        <Link className="header__basket-link" to={AppRoute.Basket} aria-label="Корзина">
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          {products.length > 0 && <span className="header__basket-count">{products.reduce((prev, current) => prev + current.count, 0)}</span>}
        </Link>
      </div>
    </header>
  );
}

const Header = memo(HeaderComponent);

export default Header;
