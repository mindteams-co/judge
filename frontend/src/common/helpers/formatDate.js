import { format, parseISO } from 'date-fns';
import { dateFormat as defaultDateFormat } from '../../config/variables.js';

export const formatDate = (date, dateFormat = defaultDateFormat) => format(parseISO(date), dateFormat);
