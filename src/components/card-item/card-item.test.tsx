import { render, screen } from '@testing-library/react';
import CardItem from './card-item';
import { mockProducts } from '../../utils/mocks';
import { getHistory } from '../../utils/get-history';

describe('Component CardItem', () => {

  beforeEach(() => {
    const preparedComponent = getHistory(<CardItem product={mockProducts[0]} />);

    render(preparedComponent);
  });

  describe('should render correctly', () => {

    it('should render buy button and more details button', () => {
      expect(screen.getByRole('button', { name: /купить/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /подробнее/i })).toBeInTheDocument();
    });

    it('should render product details', () => {
      expect(screen.getByText(/рейтинг/i)).toBeInTheDocument();
      expect(screen.getByText(/всего оценок/i)).toBeInTheDocument();
      expect(screen.getByText(/цена/i)).toBeInTheDocument();
    });

  });

});
