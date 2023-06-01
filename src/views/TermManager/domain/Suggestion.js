export default class Suggestion {
    constructor(options = {}) {
        this.id = options.id || null;
        this.termId = options.termId || null;
        this.isNew = options.isNew || null;
        this.properties = options.properties || {};
    }
}