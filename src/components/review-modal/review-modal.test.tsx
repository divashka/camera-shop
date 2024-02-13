import { render, screen } from '@testing-library/react';
import ProductReviewModal from './review-modal';
import { withStore } from '../../utils/with-store';
import { getHistory } from '../../utils/get-history';
import userEvent from '@testing-library/user-event';
import { makeMockStore } from '../../utils/mocks';

describe('Component ReviewModal', () => {

  const mockStore = makeMockStore();

  describe('should render correctly', () => {

    it('should render correctly inputs and submit button', () => {
      const { withStoreComponent } = withStore(<ProductReviewModal />, mockStore);

      const preparedComponent = getHistory(withStoreComponent);

      render(preparedComponent);

      expect(screen.getByLabelText('Ваше имя', { selector: 'input' })).toBeInTheDocument();
      expect(screen.getByLabelText('Достоинства', { selector: 'input' })).toBeInTheDocument();
      expect(screen.getByLabelText('Недостатки', { selector: 'input' })).toBeInTheDocument();
      expect(screen.getByLabelText('Комментарий', { selector: 'textarea' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /отправить отзыв/i })).toBeInTheDocument();
    });

  });

  describe('should render correctly when user enter', () => {

    beforeEach(() => {
      const { withStoreComponent } = withStore(<ProductReviewModal />, mockStore);

      const preparedComponent = getHistory(withStoreComponent);

      render(preparedComponent);
    });

    it('should render correctly when user enter name', async () => {
      const expectedReviewValue = 'Диана';

      await userEvent.type(
        screen.getByLabelText('Ваше имя', { selector: 'input' }),
        expectedReviewValue,
      );

      expect(screen.getByDisplayValue(expectedReviewValue)).toBeInTheDocument();
    });

    it('should render correctly when user enter advantage', async () => {
      const expectedReviewValue = 'Качество';

      await userEvent.type(
        screen.getByLabelText('Достоинства', { selector: 'input' }),
        expectedReviewValue,
      );

      expect(screen.getByDisplayValue(expectedReviewValue)).toBeInTheDocument();
    });

    it('should render correctly when user enter disadvantage', async () => {
      const expectedReviewValue = 'Размер';

      await userEvent.type(
        screen.getByLabelText('Недостатки', { selector: 'input' }),
        expectedReviewValue,
      );

      expect(screen.getByDisplayValue(expectedReviewValue)).toBeInTheDocument();
    });

    it('should render correctly when user enter review', async () => {
      const expectedReviewValue = 'Размер';

      await userEvent.type(
        screen.getByLabelText('Комментарий', { selector: 'textarea' }),
        expectedReviewValue,
      );

      expect(screen.getByDisplayValue(expectedReviewValue)).toBeInTheDocument();
    });

  });

});
