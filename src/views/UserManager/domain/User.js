export default class User {
    constructor(options = {}) {
        this.id = options.id || null;
        this.firstName = options.firstName || null;
        this.lastName = options.lastName || null;
        this.email = options.email || null;
        this.status = options.status || 'ACTIVE';
        this.dateCreated = options.dateCreated || null;
        this.dateUpdated = options.dateUpdated || null;
        this.privileges = options.privileges || [];
    }
}
