import { render, screen } from '@testing-library/react';
import { getHistory } from '../../utils/get-history';
import { withStore } from '../../utils/with-store';
import { makeMockStore } from '../../utils/mocks';
import Header from './header';

describe('Component Header', () => {

  const mockStore = makeMockStore();

  beforeEach(() => {
    const { withStoreComponent } = withStore(<Header />, mockStore);
    const preparedComponent = getHistory(withStoreComponent);

    render(preparedComponent);
  });

  describe('should render correctly', () => {

    it ('should render logo link', () => {
      expect(screen.getByRole('link', { name: /Переход на главную/i })).toBeInTheDocument();
    });

    it('should render basket link', () => {
      expect(screen.getByRole('link', { name: /Корзина/i })).toBeInTheDocument();
    });

    it('should render menu links', () => {
      expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
      expect(screen.getByText(/Гарантии/i)).toBeInTheDocument();
      expect(screen.getByText(/Доставка/i)).toBeInTheDocument();
      expect(screen.getByText(/О компании/i)).toBeInTheDocument();
    });

  });

});
