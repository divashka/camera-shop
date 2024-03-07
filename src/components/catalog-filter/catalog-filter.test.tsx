import { render, screen } from '@testing-library/react';
import CatalogFilter from './catalog-filter';
import { withStore } from '../../utils/with-store';

describe('Component CatalogFilter', () => {

  describe('should render correctly', () => {

    function onChangeFilter() {
      jest.fn();
    }

    function onResetFilters() {
      jest.fn();
    }

    function onChangeFilterKeyDown() {
      jest.fn();
    }

    function onChangePriceFilterFrom() {
      jest.fn();
    }

    function onChangePriceFilterTo() {
      jest.fn();
    }

    const { withStoreComponent } = withStore(
      <CatalogFilter
        minPrice={'1990'}
        maxPrice={'199000'}
        activeCategoryFilter={'Фотоаппарат'}
        activeTypeFilter={'Цифровая'}
        activeLevelFilter={'Нулевой'}
        filterPrice={{ from: '10000', to: '50000' }}
        onChangeFilter={onChangeFilter}
        onResetFilters={onResetFilters}
        onChangeFilterKeyDown={onChangeFilterKeyDown}
        onChangePriceFilterFrom={onChangePriceFilterFrom}
        onChangePriceFilterTo={onChangePriceFilterTo}
      />
    );

    render(withStoreComponent);

    it('should render categories of filter', () => {
      expect(screen.getByText(/категория/i)).toBeInTheDocument();
      expect(screen.getByText(/тип камеры/i)).toBeInTheDocument();
      expect(screen.getByText(/уровень/i)).toBeInTheDocument();
    });

    it('should render reset button', () => {
      expect(screen.getByRole('button', { name: /сбросить фильтры/i})).toBeInTheDocument();
    });
  });

});
