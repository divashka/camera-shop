import Flickity from 'react-flickity-component';
import './flickity.css';

const SLIDES_COUNT = 3;

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
        Array.from({ length: SLIDES_COUNT }, (_, index) => index).map((index) => (
          <div key={index} className='banner'>
            <picture>
              <source type="image/webp" srcSet="img/content/banner-bg.webp, img/content/banner-bg@2x.webp 2x"></source>
              <img
                src="img/content/banner-bg.jpg" srcSet="img/content/banner-bg@2x.jpg 2x" width="1280" height="280"
                alt="баннер"
              />
            </picture>
            <p className="banner__info"><span className="banner__message">Новинка!</span>
              <span className="title title--h1">Cannonball&nbsp;Pro&nbsp;MX&nbsp;8i
              </span>
              <span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
              <a className="btn" href="#">
                Подробнее
              </a>
            </p>
          </div>
        )
        )
      }
    </Flickity>
  );
}

export default Banner;
