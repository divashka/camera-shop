import { memo } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { FormInputsPromo } from '../../types/modal';
import { setPromoCodeName } from '../../store/promo-slice/promo-slice';
import { fetchDiscontByCoupon } from '../../store/api-actions';
import { getPromoCode, getValidCouponStatus } from '../../store/promo-slice/selectors';

function PromoFormComponent(): JSX.Element {

  const dispatch = useAppDispatch();

  const validCouponStatus = useAppSelector(getValidCouponStatus);

  const promocode = useAppSelector(getPromoCode);

  const {
    register,
    handleSubmit,
  } = useForm<FormInputsPromo>(
    {
      mode: 'onSubmit'
    }
  );

  function handleFormSubmit(data: FormInputsPromo) {
    if (!promocode.name) {
      dispatch(setPromoCodeName(data.promo));
      dispatch(fetchDiscontByCoupon({
        coupon: data.promo
      }));
    }
  }

  return (
    <form action="#" onSubmit={(event) =>
      void handleSubmit(handleFormSubmit)(event)}
    >
      <div className={classNames(
        'custom-input',
        { 'is-invalid': validCouponStatus },
        { 'is-valid': promocode.discont !== 0 }
      )}
      >
        <label>
          <span className="custom-input__label">Промокод</span>
          <input
            type="text"
            placeholder="Введите промокод"
            {...register('promo', {
              required: true,
            })}
          />
        </label>
        <p className="custom-input__error">Промокод неверный</p>
        <p className="custom-input__success">Промокод принят!</p>
      </div>
      <button className="btn" type="submit">
        Применить
      </button>
    </form>
  );
}

const PromoForm = memo(PromoFormComponent);

export default PromoForm;
