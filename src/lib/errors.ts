export class ExitFailedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ExitFailed';
    }
}

export class ConcurrentExecutionError extends Error {
    constructor() {
        super(`Cannot run more than one process at once.`);
        this.name = 'ConcurrentExecutionError';
    }
}

export class KilledError extends Error {
    constructor() {
        super(`Killed early.`);
        this.name = 'Killed';
    }
}
