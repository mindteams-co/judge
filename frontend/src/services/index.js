import { apiBase } from '../config/variables';
import { competitionServiceFactory } from './competition';
import { StorageService } from '../common/services/storageService.js';
import { HttpServiceFactory } from './http';
import { AuthServiceFactory } from './auth';

export const competitionService = competitionServiceFactory(apiBase, fetch);
export const HttpService = new HttpServiceFactory(apiBase, fetch, StorageService);
export const AuthService = new AuthServiceFactory(apiBase, HttpService);
