import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/with-store';
import { makeMockStore } from '../../utils/mocks';
import Modal from './modal';

describe('Component Modal', () => {

  const mockStore = makeMockStore();

  describe('should render correctly', () => {

    it('should render modal wrapper', () => {
      const { withStoreComponent } = withStore(<Modal><p>Модальное окно</p></Modal>, mockStore);

      render(withStoreComponent);

      expect(screen.getByTestId('modal-wrapper')).toBeInTheDocument();
    });

  });

});
