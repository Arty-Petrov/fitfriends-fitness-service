import { NoticeCreateDto, NoticeDeleteDto, NoticeListQuery } from '@fitfriends/contracts';
import { Notice } from '@fitfriends/shared-types';
import { Injectable } from '@nestjs/common';
import { NoticeEntity } from './notice.entity';
import { NoticeRepository } from './notice.repository';

@Injectable()
export class NoticeService {
  constructor(private readonly noticeRepository: NoticeRepository) {}

  public async create(dto: NoticeCreateDto): Promise<void> {
    const noticeEntity = new NoticeEntity(dto);
    await this.noticeRepository.create(noticeEntity);
  }

  public async getList(query: NoticeListQuery): Promise<Notice[]> {
    return this.noticeRepository.find(query);
  }

  public async delete(dto: NoticeDeleteDto): Promise<void> {
    const { id } = dto;
    await this.noticeRepository.destroy(id);
  }
}
