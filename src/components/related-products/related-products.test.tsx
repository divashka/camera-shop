import { render, screen } from '@testing-library/react';
import RelatedProducts from './related-products';
import { makeMockStore, mockProducts } from '../../utils/mocks';
import { withStore } from '../../utils/with-store';
import { getHistory } from '../../utils/get-history';

describe('Component RelatedProducts', () => {

  describe('should render correctly', () => {

    it('should render title related', () => {
      const mockStore = makeMockStore();

      const { withStoreComponent } = withStore(<RelatedProducts products={mockProducts} />, mockStore);

      const preparedComponent = getHistory(withStoreComponent);

      render(preparedComponent);

      expect(screen.getByText('Похожие товары')).toBeInTheDocument();
    });

  });

});
