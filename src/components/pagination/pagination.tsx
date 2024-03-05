import classNames from 'classnames';
import { PAGES_PER_COUNT } from '../../const/const';
import { memo } from 'react';
import { Link } from 'react-router-dom';

type PaginationProps = {
  currentPage: number;
  totalProducts: number;
  productsPerPage: number;
  onPaginateButtonClick: (pageNumber: number) => void;
}

function PaginationComponent({ currentPage, totalProducts, productsPerPage, onPaginateButtonClick }: PaginationProps): JSX.Element {

  const pagesCount = Math.ceil(totalProducts / productsPerPage);

  const pageNumbers = Array.from({ length: pagesCount }, (_, i) => i + 1);

  const currentPerPages = Math.ceil(currentPage / PAGES_PER_COUNT);

  const startPage = (currentPerPages - 1) * PAGES_PER_COUNT + 1;

  const endPage = Math.min(currentPerPages * PAGES_PER_COUNT, pagesCount);

  function handlePaginateButtonClick(pageNumber: number) {
    onPaginateButtonClick(pageNumber);
  }

  return (
    <div className="pagination" data-testid="pagination">
      <ul className="pagination__list">
        {
          currentPerPages > 1 &&
          <li className="pagination__item" onClick={() => handlePaginateButtonClick(startPage - 1)}>
            <Link
              to=''
              className="pagination__link pagination__link--text"
            >
              {'Назад'}
            </Link>
          </li>
        }
        {pageNumbers.length > 1 &&
          pageNumbers.slice(startPage - 1, endPage).map((number) => (
            <li key={number} className="pagination__item" onClick={() => handlePaginateButtonClick(number)}>
              <Link
                to=''
                className={
                  classNames(
                    'pagination__link',
                    { 'pagination__link--active': currentPage === number },
                  )
                }
              >
                {number}
              </Link>
            </li>
          ))}
        {
          currentPerPages * PAGES_PER_COUNT < pagesCount &&
          <li className="pagination__item" onClick={() => handlePaginateButtonClick(endPage + 1)}>
            <Link
              to=''
              className="pagination__link pagination__link--text"
            >
              {'Далее'}
            </Link>
          </li>
        }
      </ul>
    </div>
  );
}

const Pagination = memo(PaginationComponent);

export default Pagination;
