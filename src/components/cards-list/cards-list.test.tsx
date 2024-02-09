import { render, screen } from '@testing-library/react';
import CardsList from './cards-list';
import { mockProducts } from '../../utils/mocks';
import { getHistory } from '../../utils/get-history';

describe('Component CardsList', () => {

  describe('should render correctly', () => {

    it('should render cards list wrapper', () => {
      const preparedComponent = getHistory(<CardsList products={mockProducts} />);

      render(preparedComponent);

      expect(screen.getByTestId('cardsListWrapper')).toBeInTheDocument();
    });

  });

});
