export class RoutingService {
    constructor(history) {
        this.history = history;
    }

    push(path) {
        this.history.push(path);
    }
}
