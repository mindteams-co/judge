import { BehaviorSubject } from 'rxjs';
import handleResponse from '../../common/helpers/handleResponse.js';
import { handleAdminResponse } from '../../common/helpers/handleAdminResponse';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export class AuthServiceFactory {
    constructor(httpService, storageService) {
        this.httpService = httpService;
        this.storageService = new storageService();
        this.currentUser = currentUserSubject.asObservable();
    }

    currentUserValue() {
        return currentUserSubject.value;
    }

    checkIfAdmin() {
        return this.httpService
            .GET('teams/me')
            .then(handleAdminResponse)
            .then(user => user.isAdmin);
    }

    login(email, password) {
        return this.httpService
            .POST('obtain-token', { email, password })
            .then(handleResponse)
            .then(user => {
                this.storageService.setItem('currentUser', JSON.stringify(user));
                currentUserSubject.next(user);
                return user;
            });
    }

    logout = () => {
        this.storageService.removeItem('currentUser');
        currentUserSubject.next(null);
    };

    verifyToken(token) {
        return this.httpService.POST('verify-token', token);
    }

    refreshToken(token) {
        return this.httpService.PATCH('refresh-token', token);
    }

    registerUser(name, email, password) {
        return this.httpService.POST(`teams`, { name, email, password }).then(handleResponse);
    }
}
