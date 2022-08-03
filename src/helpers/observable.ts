import {
    onValue,
    DataSnapshot,
    Query
} from 'firebase/database';
import { Observable } from 'rxjs';

/**
 * @example
 * In case of exact node
 * ```ts
 * let value = observable(
                    child(
                        ref(this.db),
                        `/users/${userId}`,
                    ),
                ).pipe(map(value => value.val()))
 * ```
 * @example
 * In case of a query
 * ```ts
 * let value = observable(
                    query(
                        ref(this.db, 'users'),
                        orderByChild('type'),
                        equalTo('student'),
                    )
                ).pipe(map(value => value.val()))
 * ```                
 * @param {Query} query - a query object that will be passed to the `onValue` FirebaseDB Function (this gould be returned from child/query functions )
 * @returns an RX observable for the provided query
 */

export function observable(query: Query) {
    return new Observable<DataSnapshot>(subscriber => {
        return onValue(query, (snapshot: DataSnapshot) => {
            subscriber.next(snapshot);
        });
    });
}
