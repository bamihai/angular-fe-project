import { Subscription } from 'rxjs';

export class HttpLibrary {
    static unsubscribeAll(subscriptions) {
        for (const subscription of subscriptions) {
            subscription.unsubscribe();
        }
    }
}
