import Flickity from 'react-flickity-component';
import './flickity.css';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/const';

const SLIDES = [
  {
    id: '6',
    message: 'Новинка!',
    title: 'Click Sap',
    description: 'Профессиональная камера от известного производителя',
    img: 'img/content/banner-bg.jpg',
    img2x: 'img/content/banner-bg@2x.jpg',
    imgWebp: 'img/content/banner-bg.webp',
    imgWebp2x: 'img/content/banner-bg@2x.webp'
  },
  {
    id: '1',
    message: 'Новинка!',
    title: 'Ретрокамера Das Auge IV',
    description: 'Для истинных ценителей и коллекционеров',
    img: 'img/content/promo_click-lite-r.jpg',
    img2x: 'img/content/promo_click-lite-r@2x.jpg',
    imgWebp: 'img/content/promo_click-lite-r.webp',
    imgWebp2x: 'img/content/promo_click-lite-r@2x.webp'
  },
  {
    id: '2',
    message: 'Новинка!',
    title: 'FastShot MR-5',
    description: 'Маленькое чудо фотографии',
    img: 'img/content/promo_click_pro.jpg',
    img2x: 'img/content/promo_click_pro@2x.jpg',
    imgWebp: 'img/content/promo_click_pro.webp',
    imgWebp2x: 'img/content/promo_click_pro@2x.webp'
  }
];

function Banner(): JSX.Element {

  return (
    <Flickity
      disableImagesLoaded={false}
      reloadOnUpdate
      options={{
        prevNextButtons: false,
        autoPlay: 3000,
        draggable: false
      }}
      static
    >
      {
        SLIDES.map((product) => (
          <div key={product.id} className='banner' data-testid="slide">
            <picture>
              <source type="image/webp" srcSet={`${product.imgWebp}, ${product.imgWebp2x} 2x`}></source>
              <img
                src={product.img} srcSet={`${product.img2x} 2x`} width="1280" height="280"
                alt="баннер"
              />
            </picture>
            <p className="banner__info"><span className="banner__message">{product.message}</span>
              <span className="title title--h1">{product.title}
              </span>
              <span className="banner__text">{product.description}</span>
              <Link className="btn" to={`${AppRoute.Product}${product.id}`}>
                Подробнее
              </Link>
            </p>
          </div>
        )
        )
      }
    </Flickity>
  );
}

export default Banner;
