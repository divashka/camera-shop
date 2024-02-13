import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/with-store';
import { makeMockStore } from '../../utils/mocks';
import ClosePopupButton from './close-popup-button';

describe('Component ClosePopupButton', () => {

  const mockStore = makeMockStore();

  describe('should render correctly', () => {

    it('should render button close popup', () => {
      function handleButtonCloseClick() {
        jest.fn();
      }

      const { withStoreComponent } = withStore(<ClosePopupButton onButtonCloseClick={handleButtonCloseClick} />, mockStore);

      render(withStoreComponent);

      expect(screen.getByRole('button', { name: /закрыть попап/i })).toBeInTheDocument();
    });

  });

});
