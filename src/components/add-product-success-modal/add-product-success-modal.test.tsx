import { render, screen } from '@testing-library/react';
import AddProductSuccessModal from './add-product-success-modal';

describe('Component AddProductSuccessModal', () => {

  describe('should render correctly', () => {

    it('should render link to basket and continue button', () => {
      render(<AddProductSuccessModal />);

      expect(screen.getByRole('link', { name: /продолжить покупки/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /перейти в корзину/i })).toBeInTheDocument();
    });

  });

});
