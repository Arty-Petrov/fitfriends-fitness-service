import { UserGetOne, UserRdo } from '@fitfriends/contracts';
import { MongoidValidationPipe } from '@fitfriends/core';
import { HttpExceptionFilter } from '@fitfriends/exceptions';
import {
  Controller,
  Get,
  HttpStatus,
  Param,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RMQService } from 'nestjs-rmq';
import { JwtAccessGuard } from '../guards/jwt-access.guard';

@ApiTags('users')
@Controller('users')
@UseFilters(HttpExceptionFilter)
export class UsersController {
  constructor(private readonly rmqService: RMQService) { }

  @Get(':id')
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found',
  })
  @UseGuards(JwtAccessGuard)
  async show(@Param('id', MongoidValidationPipe) id: string) {
    return await this.rmqService.send<UserGetOne.Request, UserGetOne.Response>(
      UserGetOne.topic, { id });
  }
}
