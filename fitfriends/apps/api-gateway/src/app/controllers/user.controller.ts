import { UserRdo } from '@fitfriends/contracts';
import { MongoidValidationPipe } from '@fitfriends/core';
import { Controller, Get, HttpStatus, NotImplementedException, Param, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RMQService } from 'nestjs-rmq';
import { JwtAccessGuard } from '../guards/jwt-access.guard';

@ApiTags('users')
@Controller('users')
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

    console.log('users controller', id);
    throw new NotImplementedException(id);
  }
}
