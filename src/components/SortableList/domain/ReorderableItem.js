export default class ReorderableItem {
    constructor(options = {}) {
        this.id = options.id || null;
        this.name = options.name || null;
        this.position = options.position || 0;
    }
}
