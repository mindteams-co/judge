import { format, parseISO } from 'date-fns';
import { dateFormat as defaultDateFormat } from '../config/variables';

export const formatDate = (date, dateFormat = defaultDateFormat) => format(parseISO(date), dateFormat);
