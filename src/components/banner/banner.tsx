import Flickity from 'react-flickity-component';
import './flickity.css';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/const';

const slides = [
  {
    id: 1,
    message: 'Новинка!',
    title: 'Ретрокамера Dus Auge lV',
    description: 'Вы тоже можете прикоснуться к волшебству аналоговой съёмки, заказав этот чудо-аппарат.'
  },
  {
    id: 2,
    message: 'Новинка!',
    title: 'FastShot MR-5',
    description: 'Вы тоже можете прикоснуться к волшебству аналоговой съёмки, заказав этот чудо-аппарат.'
  },
  {
    id: 3,
    message: 'Новинка!',
    title: 'Instaprinter P2',
    description: 'Вы тоже можете прикоснуться к волшебству аналоговой съёмки, заказав этот чудо-аппарат.'
  }
];

function Banner(): JSX.Element {

  return (
    <Flickity
      disableImagesLoaded={false}
      reloadOnUpdate
      options={{
        prevNextButtons: false,
        autoPlay: 3000
      }}
      static
    >
      {
        slides.map((product) => (
          <div key={product.id} className='banner' data-testid="slide">
            <picture>
              <source type="image/webp" srcSet="img/content/banner-bg.webp, img/content/banner-bg@2x.webp 2x"></source>
              <img
                src="img/content/banner-bg.jpg" srcSet="img/content/banner-bg@2x.jpg 2x" width="1280" height="280"
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
