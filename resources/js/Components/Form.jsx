import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from "classnames";
import { router } from '@inertiajs/react';
import schema from '../Validation/schema.js';
import { useRoute } from '#/tightenco/ziggy';

export default function Form({ user, id = null, email = '', name = '', sex = '', birthday = '' }) {
  const route = useRoute();

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting, touchedFields},
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const createUser = (normalizedData) => {
    router.post('/users', normalizedData);
  };

  const updateUser = (normalizedData) => {
    router.put(route('users.update', user), normalizedData);
  }

  const submitForm = (data, e) => {
    e.preventDefault();
    const normalizedData = {
      email: data.email.trim(),
      name: data.name.trim(),
      sex: data.sex,
      birthday: `${String(data.birthday.getDate()).padStart(2, '0')}-${String(data.birthday.getMonth() + 1).padStart(2, '0')}-${data.birthday.getFullYear()}`
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

  const sexClasses = classNames('form-check-input', {
    'is-invalid': errors.sex,
    'is-valid': !errors.sex && touchedFields.sex,
  });

  const dateClasses = classNames('form-group__date-picker', {
    'is-invalid': errors.birthday,
    'is-valid': !errors.birthday && touchedFields.birthday,
  })

  return (
    <form onSubmit={handleSubmit(submitForm)} className="form mx-auto needs-validation" noValidate>
      <div className="form-group mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input {...register('email')} type="email" className={emailClasses} defaultValue={email} id="email" placeholder="johndoe@gmail.com" required />
        <div className="invalid-feedback">{errors?.email?.message}</div>
        <div className="valid-feedback">Email is correct</div>
      </div>
      <div className="form-group mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input {...register('name')} type="text" className={nameClasses} defaultValue={name} id="name" placeholder="John Doe" required />
        <div className="invalid-feedback">{errors?.name?.message}</div>
        <div className="valid-feedback">Name is correct</div>
      </div>
      <p>Select sex</p>
      <div className="form-check mb-3">
        <input {...register('sex')} className={sexClasses} value="male" defaultChecked={sex === 'male'} type="radio" name="sex" id="male" />
        <label className="form-check-label" htmlFor="male">
          Male
        </label>
      </div>
      <div className="form-check mb-3">
        <input {...register('sex')} className={sexClasses} value="female" defaultChecked={sex === 'female'} type="radio" name="sex" id="female" />
        <label className="form-check-label" htmlFor="female">
          Female
        </label>
        <div className="invalid-feedback negative-margin">{errors?.sex?.message}</div>
        <div className="valid-feedback negative-margin">Sex is choosen</div>
      </div>
      <div className="form-group mb-3">
        <label className="form-check-label mb-3" htmlFor="birthday">Enter birthday</label>
        <input {...register('birthday')} className={dateClasses} defaultValue={birthday} type="date" name="birthday" id="birthday" required/>
        <div className="invalid-feedback">{errors?.birthday?.message}</div>
        <div className="valid-feedback">Date is correct</div>
      </div>
      <div className="form-group">
        <button disabled={isSubmitting} type="submit" className="btn form-group__submit-btn">Submit</button>
      </div>
    </form>
  )
}