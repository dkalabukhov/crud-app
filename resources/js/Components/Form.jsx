import { useForm, Form as DefaultForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from "classnames";
import { router } from '@inertiajs/react';
import schema from '../Validation/schema.js';
import { useRoute } from '#/tightenco/ziggy';
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";

export default function Form({ user, id = null, email = '', name = '', sex = '', birthday = '' }) {
  const route = useRoute();

  const birthdayValue = birthday ? dayjs(birthday) : null;

  useEffect(() =>{
    setValue('birthday', birthdayValue);
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors, isSubmitting, touchedFields},
    control,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const createUser = (normalizedData) => {
    router.post('/users', normalizedData);
  };

  const updateUser = (normalizedData) => {
    router.put(route('users.update', user), normalizedData);
  }

  const submitForm = (data) => {
    const normalizedData = {
      email: data.email.trim().toLowerCase(),
      name: data.name.trim(),
      sex: data.sex,
      birthday: dayjs(data.birthday).format('YYYY-MM-DD')
    };
    if (id) {
      updateUser(normalizedData);
    } else {
      createUser(normalizedData);
    }
  }

  const emailClasses = classNames('form-control', {
    'is-invalid': errors.email,
    'is-valid': !errors.email && touchedFields.email,
  });

  const nameClasses = classNames('form-control', {
    'is-invalid': errors.name,
    'is-valid': !errors.name && touchedFields.name,
  });

  const sexClasses = classNames('form-check-input radio__input', {
    'is-invalid': errors.sex,
    'is-valid': !errors.sex && touchedFields.sex,
  });

  const birthdayClasses = classNames('form-group__date-picker', {
    'is-invalid': errors.birthday,
    'is-valid': !errors.birthday && touchedFields.birthday,
  })

  return (
    <DefaultForm control={control} onSubmit={handleSubmit(submitForm)} className="form mx-auto" noValidate>
      <div className="form-group">
        <label htmlFor="email" className="form-label">Email</label>
        <input {...register('email')} type="email" className={emailClasses} defaultValue={email} id="email" placeholder="johndoe@gmail.com" required />
        <div className="invalid-feedback form__feedback-absolute">{errors?.email?.message}</div>
        <div className="valid-feedback form__feedback-absolute">Email is correct</div>
      </div>
      <div className="form-group">
        <label htmlFor="name" className="form-label">Name</label>
        <input {...register('name')} type="text" className={nameClasses} defaultValue={name} id="name" placeholder="John Doe" required />
        <div className="invalid-feedback form__feedback-absolute">{errors?.name?.message}</div>
        <div className="valid-feedback form__feedback-absolute">Name is correct</div>
      </div>
      <div className="form__radio-wrapper">
        <p className="form__description">Select sex</p>
        <label className="radio">
          <input {...register('sex')} className={sexClasses} value="male" defaultChecked={sex === 'male'} type="radio" name="sex" id="male" />
          <div className="radio__state">
              <div className="radio__control">
                  <div className="radio__circle"></div>
              </div>
              <div className="radio__title">Male</div>
          </div>
        </label>
        <label className="radio">
          <input {...register('sex')} className={sexClasses} value="female" defaultChecked={sex === 'female'} type="radio" name="sex" id="female"  />
          <div className="radio__state">
              <div className="radio__control">
                  <div className="radio__circle"></div>
              </div>
              <div className="radio__title">Female</div>
          </div>
          <div className="invalid-feedback form__feedback-absolute">{errors?.sex?.message}</div>
        </label>
      </div>
      <div className="form-group form-grup_extra-padding">
        <p className="form-check-label">Enter birthday</p>
        <Controller
          control={control}
          name="birthday"
          render={({ field, fieldState }) => {
            return (
              <>
                <DatePicker
                  status={fieldState.error ? 'error' : null}
                  className={birthdayClasses}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => field.onChange(date)}
                />
                <div className="invalid-feedback form__feedback-absolute">{errors?.birthday?.message}</div>
              </>
            )
        }} />
      </div>
      <div className="form-group">
        <button disabled={isSubmitting} type="submit" className="btn form-group__submit-btn">Submit</button>
      </div>
    </DefaultForm>
  )
}