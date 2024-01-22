import classNames from 'classnames';
import { useState } from 'react';
type PaginationProps = {
  currentPage: number;
  totalProducts: number;
  productsPerPage: number;
  end: number;
  onPaginateButtonClick: (pageNumber: number) => void;
}

function Pagination({ currentPage, totalProducts, productsPerPage, end, onPaginateButtonClick }: PaginationProps): JSX.Element {

  const pageNumbers = [];

  const pageNumbersCount = Math.ceil(totalProducts / productsPerPage);

  for (let i = 1; i <= pageNumbersCount; i++) {
    pageNumbers.push(i);
  }

  const [perPage, setPerPage] = useState(pageNumbers.slice(0, 3));

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
          perPage.map((number) => (
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
