import { render, screen } from '@testing-library/react';
import AddProductModal from './add-product-modal';

describe('Component AddProductModal', () => {

  describe('should render correctly', () => {

    it('should render add button', () => {
      render(<AddProductModal />);

      expect(screen.getByRole('button', { name: /добавить в корзину/i})).toBeInTheDocument();
    });

    it('should render product details', () => {
      render(<AddProductModal />);

      expect(screen.getByText(/артикул/i)).toBeInTheDocument();
      expect(screen.getByText(/цена/i)).toBeInTheDocument();
    });

  });

});
