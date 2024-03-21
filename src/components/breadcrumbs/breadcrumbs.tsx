import { AppRoute } from "../../const/const";
import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { getOneProduct } from "../../store/camera-slice/selectors";

const PATH_TO_PRODUCT = '/catalog/product';
const PATH_TO_BASKET = '/catalog/basket';

function BreadcrumbsComponent(): JSX.Element {

 const product = useAppSelector(getOneProduct);

 const location = useLocation();
 const pathnames = location.pathname.split('/').filter((pathname) => pathname);

 const breadcrumbNameMap = {
  '/': 'Главная',
  '/catalog': 'Каталог',
  [PATH_TO_BASKET]: 'Корзина',
  [PATH_TO_PRODUCT]: '',
  [`/catalog/product/${product?.id}`]: product?.name
 };

 return (
  <ul className="breadcrumbs__list">
   <li className="breadcrumbs__item">
    <Link className="breadcrumbs__link" to={AppRoute.Root}>
     Главная
     <svg width={5} height={8} aria-hidden="true">
      <use xlinkHref="#icon-arrow-mini" />
     </svg>
    </Link>
   </li>
   {pathnames.map((pathname, index) => {
    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
    const isLast = index === pathnames.length - 1;
    const breadcrumbName = breadcrumbNameMap[routeTo];

    if (routeTo === PATH_TO_PRODUCT) {
     return;
    }

    return (
     <li className="breadcrumbs__item" key={pathname}>
      {isLast ? (
       <span className="breadcrumbs__link breadcrumbs__link--active">{breadcrumbName}</span>
      ) : (
       <Link
        className="breadcrumbs__link"
        to={routeTo}
       >
        {breadcrumbName}
        <svg width={5} height={8} aria-hidden="true">
         <use xlinkHref="#icon-arrow-mini" />
        </svg>
       </Link>
      )}
     </li>
    );
   })}
  </ul>
 )
}

const Breadcrumbs = memo(BreadcrumbsComponent);

export default Breadcrumbs;