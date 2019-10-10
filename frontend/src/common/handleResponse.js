import { AuthService } from '../services';

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                AuthService.logout();
            }

            return Promise.reject(data);
        }
        return data;
    });
}

export default handleResponse;
