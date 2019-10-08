import { apiBase } from '../config/variables';
import { competitionServiceFactory } from './competition';

export const competitionService = competitionServiceFactory(apiBase, fetch);
