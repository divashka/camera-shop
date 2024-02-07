import classNames from 'classnames';
import { TabType } from '../../types';
import { TabsName } from '../../const/const';
import { memo } from 'react';
import { Features } from '../../types';

type ProductTabsProps = {
  onTabButtonClick: (type: TabType) => void;
  currentTab: TabType;
  features: Features;
  description: string;
};

function ProductTabsComponent({ onTabButtonClick, currentTab, features, description }: ProductTabsProps): JSX.Element {

  const { type, category, vendorCode, level } = features;

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        <button
          type="button"
          aria-label="Features"
          onClick={() => onTabButtonClick(TabsName.Feature)}
          className={classNames(
            'tabs__control',
            { 'is-active': currentTab === TabsName.Feature }
          )}
        >
          Характеристики
        </button>
        <button
          type="button"
          aria-label="Description"
          onClick={() => onTabButtonClick(TabsName.Description)}
          className={classNames(
            'tabs__control',
            { 'is-active': currentTab === TabsName.Description }
          )}
        >
          Описание
        </button>
      </div>
      <div className="tabs__content">
        <div
          className={classNames(
            'tabs__element',
            { 'is-active': currentTab === TabsName.Feature }
          )}
          data-testid="tabFeatureContent"
        >
          <ul className="product__tabs-list">
            <li className="item-list">
              <span className="item-list__title">Артикул:</span>
              <p className="item-list__text"> {vendorCode}</p>
            </li>
            <li className="item-list">
              <span className="item-list__title">Категория:</span>
              <p className="item-list__text">{category}</p>
            </li>
            <li className="item-list">
              <span className="item-list__title">Тип камеры:</span>
              <p className="item-list__text">{type}</p>
            </li>
            <li className="item-list">
              <span className="item-list__title">Уровень:</span>
              <p className="item-list__text">{level}</p>
            </li>
          </ul>
        </div>
        <div
          className={classNames(
            'tabs__element',
            { 'is-active': currentTab === TabsName.Description }
          )}
          data-testid="tabDescriptionContent"
        >
          <div className="product__tabs-text">
            <p>
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const ProductTabs = memo(ProductTabsComponent);

export default ProductTabs;
