import { apiBase } from '../config/variables';
import { competitionServiceFactory } from './competition';
import { HttpServiceFactory } from './http';
import { AuthServiceFactory } from './auth';
import { RoutingService } from './routing';
import { history } from '../config/history.js';
import { StorageService } from './storage';
import { TeamServiceFactory } from './team';
import { submissionServiceFactory } from './submission';

export const httpService = new HttpServiceFactory(apiBase, fetch, StorageService);
export const competitionService = competitionServiceFactory(httpService);
export const submissionService = submissionServiceFactory(httpService);
export const teamService = TeamServiceFactory(httpService);
export const routingService = new RoutingService(history);
export const authService = new AuthServiceFactory(httpService, StorageService);
