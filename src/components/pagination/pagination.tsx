import classNames from 'classnames';
import { PER_PAGES_COUNT } from '../../const/const';

type PaginationProps = {
  currentPage: number;
  totalProducts: number;
  productsPerPage: number;
  end: number;
  onPaginateButtonClick: (pageNumber: number) => void;
}

function Pagination({ currentPage, totalProducts, productsPerPage, end, onPaginateButtonClick }: PaginationProps): JSX.Element {

  const pagesCount = Math.ceil(totalProducts / productsPerPage);

  const pageNumbers = Array.from({ length: pagesCount }, (_, i) => i + 1);

  const currentPerPages = Math.ceil(currentPage / PER_PAGES_COUNT);

  const startPage = (currentPerPages - 1) * PER_PAGES_COUNT + 1;

  const endPage = Math.min(currentPerPages * PER_PAGES_COUNT, pagesCount);

  function handlePaginateButtonClick(pageNumber: number) {
    onPaginateButtonClick(pageNumber);
  }

  function handlePaginatePrevClick() {
    onPaginateButtonClick(currentPage - 1);
  }

  function handlePaginateNextClick() {
    onPaginateButtonClick(currentPage + 1);
  }

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {
          currentPage > 1 &&
          <li className="pagination__item">
            <a
              onClick={handlePaginatePrevClick}
              className="pagination__link pagination__link--text"
            >
              {'Назад'}
            </a>
          </li>
        }
        {
          pageNumbers.slice(startPage - 1, endPage).map((number) => (
            <li key={number} className="pagination__item">
              <a
                onClick={() => handlePaginateButtonClick(number)}
                className={
                  classNames(
                    'pagination__link',
                    { 'pagination__link--active': currentPage === number },
                  )
                }
              >
                {number}
              </a>
            </li>
          ))
        }
        {
          end < totalProducts &&
          <li className="pagination__item">
            <a
              onClick={handlePaginateNextClick}
              className="pagination__link pagination__link--text"
            >
              {'Далее'}
            </a>
          </li>
        }
      </ul>
    </div>
  );
}

export default Pagination;
