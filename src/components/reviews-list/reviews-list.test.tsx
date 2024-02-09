import { render, screen } from '@testing-library/react';
import ReviewsList from './reviews-list';
import { makeMockStore } from '../../utils/mocks';
import { withStore } from '../../utils/with-store';
import { getHistory } from '../../utils/get-history';

describe('Component ReviewsList', () => {

  const mockStore = makeMockStore();

  describe('should render correctly', () => {

    it('should render title reviews', () => {

      const { withStoreComponent } = withStore(<ReviewsList id={1} />, mockStore);

      const preparedComponent = getHistory(withStoreComponent);

      render(preparedComponent);

      expect(screen.getByText(/отзывы/i)).toBeInTheDocument();
    });

  });

});
