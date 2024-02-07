import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/with-history';
import { withStore } from '../../utils/with-store';
import { makeMockStore } from '../../utils/mocks';
import Footer from './footer';

describe('Component Footer', () => {

  const mockStore = makeMockStore();

  beforeEach(() => {
    const { withStoreComponent } = withStore(<Footer />, mockStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
  });

  describe('should render correctly', () => {

    it('should render logo link', () => {
      expect(screen.getByRole('link', { name: /Переход на главную/i })).toBeInTheDocument();
    });

    it('should render menu links', () => {
      expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
      expect(screen.getByText(/Гарантии/i)).toBeInTheDocument();
      expect(screen.getByText(/Доставка/i)).toBeInTheDocument();
      expect(screen.getByText(/О компании/i)).toBeInTheDocument();
    });

    it('should render resource links', () => {
      expect(screen.getByText(/Курсы операторов/i)).toBeInTheDocument();
      expect(screen.getByText(/Блог/i)).toBeInTheDocument();
      expect(screen.getByText(/Сообщество/i)).toBeInTheDocument();
    });

    it('should render support links', () => {
      expect(screen.getByText(/FAQ/i)).toBeInTheDocument();
      expect(screen.getByText(/Задать вопрос/i)).toBeInTheDocument();
    });

  });

});
