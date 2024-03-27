import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { PROMOCODES, PROMOCODES_MAP } from '../../const/const';
import classNames from 'classnames';
import { useAppDispatch } from '../../hooks';
import { setPromoCode } from '../../store/app-slice/app-slice';

type FormData = {
  promo: (typeof PROMOCODES)[number];
}

function PromoFormComponent(): JSX.Element {

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>(
    {
      mode: 'onSubmit'
    }
  );

  function validatePromo(value: string) {
    return Boolean(PROMOCODES.find((promo) => promo === value) || false);
  }

  function handleFormSubmit(data: FormData) {
    const promocode = PROMOCODES_MAP.find((promo) => promo.name === data.promo);
    if (promocode) {
      dispatch(setPromoCode(promocode));
    }
  }

  return (
    <form action="#" onSubmit={(event) =>
      void handleSubmit(handleFormSubmit)(event)}
    >
      <div className={classNames(
        'custom-input',
        { 'is-invalid': errors?.promo },
        { 'is-valid': isValid }
      )}
      >
        <label>
          <span className="custom-input__label">Промокод</span>
          <input
            type="text"
            placeholder="Введите промокод"
            {...register('promo', {
              required: true,
              validate: validatePromo
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
