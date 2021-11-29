export class BaseObject<T> {
    constructor(child: T) {
        Object.assign(this, child);
    }
}
