export class AuthServiceFactory {
    constructor(apiBase, httpService) {
        this.apiBase = apiBase;
        this.httpService = httpService;
    }
    login(email, password) {
        return this.httpService.POST('obtain-token', { email, password });
    }

    verifyToken(token) {
        return this.httpService.POST('verify-token', { token });
    }

    refreshToken(token) {
        return this.httpService.PATCH('refresh-token', { token });
    }

    registerUser(name, email, password) {
        return this.httpService.POST(`${this.apiBase}/teams`, { name, email, password });
    }
}
