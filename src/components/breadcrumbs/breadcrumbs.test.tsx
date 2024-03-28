import { render, screen } from '@testing-library/react';
import Breadcrumbs from './breadcrumbs';
import { makeMockStore } from '../../utils/mocks';
import { withStore } from '../../utils/with-store';
import { getHistory } from '../../utils/get-history';

describe('Component Breadcrumbs', () => {

  const mockStore = makeMockStore();

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<Breadcrumbs />, mockStore);
    const preparedComponent = getHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
  });

});
