import Item, { IItem } from "./../item/item";

export default class ServiceItem {
    public async find(where: {}): Promise<IItem[]> {
        let data: IItem[] = [];
        let fn = async () => {
            data = await Item.find(where);
        };
        await fn();
        return data;
    }
}