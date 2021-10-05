import { KeyValueModel } from "./key.value.model";

export class MenuItemModel {
    name: string;
    list: Array<KeyValueModel>;

    constructor() {
        this.name = "";
        this.list = new Array<KeyValueModel>();
    }
}