export class StorageService {
    getItem(field) {
        return localStorage.getItem(field);
    }

    setItem(field, data) {
        localStorage.setItem(field, data);
    }

    removeItem(field) {
        localStorage.removeItem(field);
    }
}
