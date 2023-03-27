import { PickType } from '@nestjs/swagger';
import { PurchaseApi } from '../purchase.api';

export class PurchaseListQuery extends PickType(PurchaseApi, ['sort', 'page', 'count']) { }
