import { render, screen } from '@testing-library/react';
import Catalog from './catalog';
import { getHistory } from '../../utils/get-history';
import { withStore } from '../../utils/with-store';
import { makeMockStore } from '../../utils/mocks';

describe('Component Catalog', () => {

  const mockStore = makeMockStore();

  describe('should render correctly', () => {

    it('should render title catalog', () => {
      const { withStoreComponent } = withStore(<Catalog />, mockStore);
      const preparedComponent = getHistory(withStoreComponent);
      render(preparedComponent);

      expect(screen.getByText(/Каталог фото- и видеотехники/)).toBeInTheDocument();
    });

  });

});
