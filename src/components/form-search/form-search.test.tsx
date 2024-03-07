import { render, screen } from '@testing-library/react';
import FormSearch from './form-search';
import { makeMockStore } from '../../utils/mocks';
import { withStore } from '../../utils/with-store';
import { getHistory } from '../../utils/get-history';

describe('Component FormSearch', () => {

  const mockStore = makeMockStore();

  describe('should render correctly', () => {

    const { withStoreComponent } = withStore(<FormSearch />, mockStore);

    const preparedComponent = getHistory(withStoreComponent);

    render(preparedComponent);
    it('should render button reset', () => {
      expect(screen.getByRole('button', { name: /сбросить поиск/i})).toBeInTheDocument();
    });

    it('should render input search with placeholder', ()=> {
      expect(screen.getByPlaceholderText(/поиск по сайту/i)).toBeInTheDocument();
    });

  });

});
