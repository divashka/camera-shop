import { useEffect } from 'react';
import Flickity from 'react-flickity-component';
import './flickity.css';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchPromoAction } from '../../store/api-actions';
import { getPromoSlides } from '../../store/promo-slice/selectors';

function Banner(): JSX.Element {

  const promoSlides = useAppSelector(getPromoSlides);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPromoAction());
  }, [dispatch]);

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
        promoSlides.map((promo) => (
          <div key={promo.id} className='banner' data-testid="slide">
            <picture>
              <source type="image/webp" srcSet={`${promo.previewImgWebp}, ${promo.previewImgWebp2x} 2x`}></source>
              <img
                src={promo.previewImg} srcSet={`${promo.previewImg2x} 2x`} width="1280" height="280"
                alt="баннер"
              />
            </picture>
            <p className="banner__info"><span className="banner__message">Новинка!</span>
              <span className="title title--h1">{promo.name}
              </span>
              <span className="banner__text">Профессиональная камера от известного производителя</span>
              <Link className="btn" to={`${AppRoute.Product}/${promo.id}`}>
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
