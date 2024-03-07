import { render, screen } from '@testing-library/react';
import NotProducts from './not-products';

describe('Component NotProducts', () => {

  describe('should render correctly', () => {

    it('should render not products text', () => {
      render(<NotProducts />);

      expect(screen.getByText(/по вашему запросу ничего не найдено/i)).toBeInTheDocument();
    });

  });

});
