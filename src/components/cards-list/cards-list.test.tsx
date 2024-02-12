import { render, screen } from '@testing-library/react';
import CardsList from './cards-list';
import { makeMockStore, mockProducts } from '../../utils/mocks';
import { getHistory } from '../../utils/get-history';
import { withStore } from '../../utils/with-store';

describe('Component CardsList', () => {

  const mockStore = makeMockStore();

  describe('should render correctly', () => {

    it('should render cards list wrapper', () => {
      const { withStoreComponent } = withStore(<CardsList products={mockProducts} />, mockStore);

      const preparedComponent = getHistory(withStoreComponent);

      render(preparedComponent);

      expect(screen.getByTestId('cardsListWrapper')).toBeInTheDocument();
    });

  });

});
