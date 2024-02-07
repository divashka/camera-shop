import classNames from 'classnames';
import { PAGES_PER_COUNT } from '../../const/const';
import { memo } from 'react';

type PaginationProps = {
  currentPage: number;
  totalProducts: number;
  productsPerPage: number;
  end: number;
  onPaginateButtonClick: (pageNumber: number) => void;
}

function PaginationComponent({ currentPage, totalProducts, productsPerPage, end, onPaginateButtonClick }: PaginationProps): JSX.Element {

  const pagesCount = Math.ceil(totalProducts / productsPerPage);

  const pageNumbers = Array.from({ length: pagesCount }, (_, i) => i + 1);

  const currentPerPages = Math.ceil(currentPage / PAGES_PER_COUNT);

  const startPage = (currentPerPages - 1) * PAGES_PER_COUNT + 1;

  const endPage = Math.min(currentPerPages * PAGES_PER_COUNT, pagesCount);

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
    <div className="pagination" data-testid="pagination">
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

const Pagination = memo(PaginationComponent);

export default Pagination;
