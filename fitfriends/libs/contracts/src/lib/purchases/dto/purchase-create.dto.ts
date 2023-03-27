import { PickType } from '@nestjs/swagger';
import { PurchaseApi } from '../purchase.api';

export class PurchaseCreateDto extends PickType(PurchaseApi, ['customerId', 'productType', 'productPrice', 'quantity', 'totalPrice', 'paymentMethod', 'createdAt']) { }
