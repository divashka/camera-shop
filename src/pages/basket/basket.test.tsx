import { render, screen } from '@testing-library/react';
import Basket from './basket';
import { getHistory } from '../../utils/get-history';

describe('Component Basket', () => {

  describe('should render correctly', () => {

    it('should render button basket', () => {
      const preparedComponent = getHistory(<Basket />);
      render(preparedComponent);

      expect(screen.getByRole('button', { name: 'Оформить заказ' }));
    });

  });

});
