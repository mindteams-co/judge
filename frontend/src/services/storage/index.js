export class StorageService {
    getItem(field) {
        try {
            return localStorage.getItem(field);
        } catch (error) {
            return error;
        }
    }

    setItem(field, data) {
        localStorage.setItem(field, data);
    }

    removeItem(field) {
        localStorage.removeItem(field);
    }
}
