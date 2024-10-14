import _ from 'lodash';

const generateUniqueKey = (prefix) => _.uniqueId(prefix);

export default generateUniqueKey;