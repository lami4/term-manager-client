import ColumnDropdownOption from "./ColumnDropdownOption";

export default class Column {
    constructor(options = {}) {
        this.id = options.id || null;
        this.name = options.name || null;
        this.htmlId = options.htmlId || null;
        this.sortable = options.sortable || false;
        this.filterable = options.filterable || false;
        this.position = options.position || null;
        this.elementType = options.elementType || 'SELECT';
        this.mandatory = options.mandatory || false;
        if (options.dropdownOptions) {
            this.dropdownOptions = options.dropdownOptions.map(option => new ColumnDropdownOption(option));
        } else {
            this.dropdownOptions = [];
        }
    }
}
