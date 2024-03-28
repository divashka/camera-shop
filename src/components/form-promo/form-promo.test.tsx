import { render, screen } from '@testing-library/react';
import PromoForm from './form-promo';
import { makeMockStore } from '../../utils/mocks';
import { withStore } from '../../utils/with-store';
import { getHistory } from '../../utils/get-history';

describe('Component PromoForm', () => {

  const mockStore = makeMockStore();
  it('should render "Промокод"', () => {
    const { withStoreComponent } = withStore(<PromoForm />, mockStore);
    const preparedComponent = getHistory(withStoreComponent);

    render(preparedComponent);

    const promocodes = screen.getAllByText(/Промокод/i);
    expect(promocodes).toHaveLength(3);
  });

  it('should render input for promocode', () => {
    const { withStoreComponent } = withStore(<PromoForm />, mockStore);
    const preparedComponent = getHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByLabelText(/промокод/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/введите промокод/i)).toBeInTheDocument();
  });

});
