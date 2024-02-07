import { render, screen } from '@testing-library/react';
import ProductReviewThanks from './review-thanks-modal';
import { withHistory } from '../../utils/with-history';
import { withStore } from '../../utils/with-store';
import { makeMockStore } from '../../utils/mocks';

describe('Component ReviewThanksModal', () => {

  const mockStore = makeMockStore();

  beforeEach(()=> {
    const { withStoreComponent } = withStore(<ProductReviewThanks />, mockStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
  });

  describe('should render correctly', () => {

    it('should render correctly return button', () => {
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should render correctly title', () => {
      expect(screen.getByText(/спасибо за отзыв/i)).toBeInTheDocument();
    });

  });

});
