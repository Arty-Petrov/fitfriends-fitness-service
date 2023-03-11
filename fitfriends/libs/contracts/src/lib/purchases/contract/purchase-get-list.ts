import { PurchaseListQuery } from '../query/purchase-list.query';
import { PurchaseListRdo } from '../rdo/purchase-list.rdo';

export namespace PurchaseGetList {
  export const topic = 'purchase.get-list.query';

  export class Request extends PurchaseListQuery { }

  export class Response {
    public purchases: PurchaseListRdo[];
  }
}
