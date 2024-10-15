import moment from 'moment';

const normalizeDate = (date) => moment(date).format('YYYY-MM-DD HH:mm:ss');

export default normalizeDate;