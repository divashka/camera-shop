import { render, screen } from '@testing-library/react';
import Pagination from './pagination';
import { getHistory } from '../../utils/get-history';

describe('Component Pagination', () => {

  describe('should render correctly', () => {

    it('should render pagination', () => {
      function calculatePaginate() {
        jest.fn();
      }

      const preparedComponent = getHistory(<Pagination currentPage={1} totalProducts={10} productsPerPage={9} onPaginateButtonClick={calculatePaginate} />);

      render(preparedComponent);

      expect(screen.getByTestId('pagination')).toBeInTheDocument();
    });

  });

});
