import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().trim().required('Please enter an email').email('Incorrect email format'),
  name: yup.string().trim().required('Please enter a name').min(2, 'Name must be at least 2 characters'),
  sex: yup.string().required('Please choose a sex'),
  birthday: yup.date().required('Please enter a date').typeError('Icorrect date format')
});

export default schema;