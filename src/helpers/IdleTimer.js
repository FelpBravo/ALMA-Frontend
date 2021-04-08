const activityEvents = [
    'mousedown', 'mousemove', 'keydown',
    'scroll', 'touchstart'
];

export default class IdleTimer {
    constructor({ timeout, onTimeout, onExpired }) {
        this.timeout = timeout;
        this.onTimeout = onTimeout;

        const expiredTime = parseInt(localStorage.getItem("_expiredTime"), 10);
        if (expiredTime > 0 && expiredTime < Date.now()) {
            onExpired();
            return;
        }

        this.eventHandler = this.updateExpiredTime.bind(this);
        this.tracker();
        this.startInterval();
    }

    startInterval() {
        this.updateExpiredTime();

        this.interval = setInterval(() => {
            const expiredTime = parseInt(localStorage.getItem("_expiredTime"), 10);
            if (expiredTime < Date.now()) {
                if (this.onTimeout) {
                    this.onTimeout();
                    this.cleanUp();
                }
            }
        }, 1000);
    }

    updateExpiredTime() {
        if (this.timeoutTracker) {
            clearTimeout(this.timeoutTracker);
        }
        this.timeoutTracker = setTimeout(() => {
            localStorage.setItem("_expiredTime", Date.now() + this.timeout * 1000);
        }, 300);
    }

    tracker() {
        const eventHandler = this.eventHandler
        activityEvents.forEach(function (eventName) {
            window.addEventListener(eventName, eventHandler);
        });
    }

    cleanUp() {
        localStorage.removeItem("_expiredTime");
        clearInterval(this.interval);
        const eventHandler = this.eventHandler
        activityEvents.forEach(function (eventName) {
            window.removeEventListener(eventName, eventHandler);
        });
    }
}
