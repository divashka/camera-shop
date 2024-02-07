import { render, screen } from '@testing-library/react';
import Pagination from './pagination';

describe('Component Pagination', () => {

  describe('should render correctly', () => {

    it('should render pagination', () => {
      function calculatePaginate() {
        jest.fn();
      }

      render(<Pagination currentPage={1} totalProducts={10} productsPerPage={9} end={9} onPaginateButtonClick={calculatePaginate}></Pagination>);

      expect(screen.getByTestId('pagination')).toBeInTheDocument();
    });

  });

});
