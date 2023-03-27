import { UserRdo } from '@fitfriends/contracts';
import { MongoidValidationPipe } from '@fitfriends/core';
import { Controller, Get, HttpStatus, NotImplementedException, Param, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { RMQService } from 'nestjs-rmq';
import { JwtAccessGuard } from '../guards/jwt-access.guard';

@Controller('upload')
export class UploadController {
  constructor(private readonly rmqService: RMQService) { }

  @UseGuards(JwtAccessGuard)
  @Get(':id')
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found',
  })
  async show(@Param('id', MongoidValidationPipe) id: string) {
    throw new NotImplementedException(id);
  }
}
