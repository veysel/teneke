import { MenuItemModel } from "./menu.item.model";

export class MenuModel {
    name: string;
    list: Array<MenuItemModel>;

    constructor() {
        this.name = "";
        this.list = new Array<MenuItemModel>();
    }
}