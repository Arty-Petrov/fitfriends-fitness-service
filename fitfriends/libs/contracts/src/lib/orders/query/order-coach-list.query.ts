import { PickType } from '@nestjs/swagger';
import { OrderQueryApi } from '../order-query.api';

export class OrderCoachListQuery extends PickType(OrderQueryApi, [
  'page',
  'count',
  'sortCreation',
  'sortType',
  'sortOrder',
  'coachId'
]) { }
