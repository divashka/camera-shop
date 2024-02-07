import { render, screen } from '@testing-library/react';
import ReviewsList from './reviews-list';
import { makeMockStore } from '../../utils/mocks';
import { withStore } from '../../utils/with-store';
import { withHistory } from '../../utils/with-history';

describe('Component ReviewsList', () => {

  const mockStore = makeMockStore();

  describe('should render correctly', () => {

    it('should render title reviews', () => {

      const { withStoreComponent } = withStore(<ReviewsList id={1} />, mockStore);

      const preparedComponent = withHistory(withStoreComponent);

      render(preparedComponent);

      expect(screen.getByText(/отзывы/i)).toBeInTheDocument();
    });

  });

});
