import ReorderableItem from "../../../components/SortableList/domain/ReorderableItem";
export default class ColumnDropdownOption extends ReorderableItem {
    constructor(options) {
        super(options);
        this.columnId = options.columnId || null;
    }
}