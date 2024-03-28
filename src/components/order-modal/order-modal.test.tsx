import { render, screen } from '@testing-library/react';
import ProductOrderModal from './order-modal';
import { makeMockStore } from '../../utils/mocks';
import { withStore } from '../../utils/with-store';
import { getHistory } from '../../utils/get-history';

describe('Component ProductOrderModal', () => {

  const mockStore = makeMockStore();
  it('should render repeat button if error=true', () => {
    const { withStoreComponent } = withStore(<ProductOrderModal error />, mockStore);
    const preparedComponent = getHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByRole('button', { name: /попробовать ещё раз/i})).toBeInTheDocument();
  });

  it('should render return to catalog button if error=false', () => {
    const { withStoreComponent } = withStore(<ProductOrderModal error={false} />, mockStore);
    const preparedComponent = getHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByRole('button', { name: /вернуться к покупкам/i })).toBeInTheDocument();
  });

});
