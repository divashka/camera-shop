import { render, screen } from '@testing-library/react';
import CatalogSort from './catalog-sort';
import { makeMockStore } from '../../utils/mocks';
import { withStore } from '../../utils/with-store';
import { SortMap } from '../../const/const';

describe('Component CatalogSort', () => {

  const mockStore = makeMockStore();

  describe('should render correctly', () => {

    it('should render labels', () => {

      function onChangeActiveSortItem() {
        jest.fn();
      }

      function onChangeActiveFlowDirection() {
        jest.fn();
      }

      const { withStoreComponent } = withStore(
        <CatalogSort
          activeSortItem={''}
          activeFlowDirection={''}
          onChangeActiveSortItem={onChangeActiveSortItem}
          onChangeActiveFlowDirection={onChangeActiveFlowDirection}
        />, mockStore);

      render(withStoreComponent);

      expect(screen.getByText(SortMap.Popular)).toBeInTheDocument();
      expect(screen.getByText(SortMap.Price)).toBeInTheDocument();
    });

  });

});
