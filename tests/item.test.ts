import "./../src/config"
import { expect } from 'chai';
import "mocha";
import Query from "./../src/item/item.serv";

describe('Simple test must return items', () => {

    it('should return data', async () => {
        let query:Query = new Query();
        const data = await query.find({});
        expect(data.length).greaterThan(0);
    });
});