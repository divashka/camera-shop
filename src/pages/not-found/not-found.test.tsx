import { render, screen } from '@testing-library/react';
import NotFound from './not-found';
import { getHistory } from '../../utils/get-history';

describe('Component NotFound', () => {

  describe('should render correctly', () => {

    it('should render title not found', () => {
      const preparedComponent = getHistory(<NotFound />);
      render(preparedComponent);
      expect(screen.getByText(/404 Not Found/)).toBeInTheDocument();
    });

  });

});
