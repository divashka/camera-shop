import { render, screen } from '@testing-library/react';
import Product from './product';
import { getHistory } from '../../utils/get-history';
import { withStore } from '../../utils/with-store';
import { makeMockStore } from '../../utils/mocks';

describe('Component Product', () => {

  const mockStore = makeMockStore();

  describe('should render correctly', () => {

    it('should render add basket button', () => {
      const { withStoreComponent } = withStore(<Product />, mockStore);
      const preparedComponent = getHistory(withStoreComponent);

      render(preparedComponent);

      expect(screen.getByRole('button', { name: /добавить в корзину/i })).toBeInTheDocument();
    });

  });

});
