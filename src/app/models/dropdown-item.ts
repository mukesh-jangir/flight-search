export interface DropdownItem<T extends number | string | any> {
    label: string;
    value: T;
}