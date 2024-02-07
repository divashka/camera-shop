import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductTabs from './product-tabs';
import { TabsName } from '../../const/const';

describe('Component ProductTabs', () => {

  const features = {
    type: '',
    category: '',
    vendorCode: '',
    level: ''
  };

  const description = '';

  function onTabButtonClick() {
    jest.fn();
  }

  describe('should render correctly', () => {

    it('should render product tab buttons', () => {
      render(<ProductTabs onTabButtonClick={onTabButtonClick} currentTab={TabsName.Feature} features={features} description={description} />);

      expect(screen.getByRole('button', { name: /description/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /features/i })).toBeInTheDocument();
    });

    it('should add class "is-active" to the button and tab content element', () => {
      render(<ProductTabs onTabButtonClick={onTabButtonClick} currentTab={TabsName.Feature} features={features} description={description} />);

      const buttonFeature = screen.getByRole('button', { name: /features/i });
      const tabsFeature = screen.getByTestId('tabFeatureContent');

      userEvent.click(buttonFeature);

      expect(buttonFeature).toHaveClass('is-active');
      expect(tabsFeature).toHaveClass('is-active');
    });
  });

});
