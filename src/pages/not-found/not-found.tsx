import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { AppRoute } from '../../const/const';
import { Link } from 'react-router-dom';
import './not-found.css';

function NotFound(): JSX.Element {
  return (
    <div className="wrapper">
      <Header></Header>
      <main>
        <div className="page-content">
          <div className="not-found">
            <h1>404 Not Found</h1>
            <Link to={AppRoute.Root}>Перейти на главную страницу</Link>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default NotFound;
