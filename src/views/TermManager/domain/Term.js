export default class Term {
    constructor(options = {}) {
        this.id = options.id || null;
        this.properties = {...options.properties} || {};
        this.authoredBy = options.authoredBy || null;
    }
}
