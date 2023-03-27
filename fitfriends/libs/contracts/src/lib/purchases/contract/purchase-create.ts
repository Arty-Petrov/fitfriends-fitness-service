import { PurchaseCreateDto } from '../dto/purchase-create.dto';
import { PurchaseCardRdo } from '../rdo/purchase-card.rdo';

export namespace PurchaseCreate {
  export const topic = 'purchase.create.command';

  export class Request extends PurchaseCreateDto { }

  export class Response extends PurchaseCardRdo { }
}
