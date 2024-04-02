import { render, screen } from '@testing-library/react';
import { mockProductsBasket } from '../../utils/mocks';
import BasketCount from './basket-count';

describe('Component BasketCount', () => {
  describe('should render correctly', () => {

    it('should render Decrease button', () => {
      render(
        <BasketCount product={mockProductsBasket[0]} />);

      expect(screen.getByRole('button', { name: /уменьшить количество товара/i })).toBeInTheDocument();
    });

    it('should render Increase button', () => {
      render(
        <BasketCount product={mockProductsBasket[0]}/>);

      expect(screen.getByRole('button', { name: /увеличить количество товара/i })).toBeInTheDocument();
    });

    it('should render input count', () => {
      render(
        <BasketCount product={mockProductsBasket[0]} />);

      expect(screen.getByRole('spinbutton', {name: /количество товара/i})).toBeInTheDocument();
    });

  });
});
