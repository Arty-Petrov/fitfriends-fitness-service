import { PublicationCreateDto, PublicationDeleteSentDto, PublicationListQuery } from '@fitfriends/contracts';
import { ItemExistsException } from '@fitfriends/exceptions';
import { Publication } from '@fitfriends/shared-types';
import { HttpStatus, Injectable } from '@nestjs/common';
import { PublicationEntity } from './publication.entity';
import { PublicationRepository } from './publication.repository';

@Injectable()
export class PublicationService {
  constructor(private readonly publicationRepository: PublicationRepository) {}

  public async create(dto: PublicationCreateDto): Promise<HttpStatus> {
    const { authorId, category, entityId } = dto;
    const existsPublication = await this.publicationRepository.findExist(
      authorId,
      category,
      entityId
    );
    if (existsPublication) {
      throw new ItemExistsException('Publication', dto);
    }
    const publicationEntity = new PublicationEntity(dto);
    await this.publicationRepository.create(publicationEntity);
    return HttpStatus.CREATED;
  }

  public async getListToSend(
    query: PublicationListQuery
  ): Promise<Publication[]> {
    return this.publicationRepository.find(query);
  }

  public async deleteSent(
    dtos: Array<PublicationDeleteSentDto>
  ): Promise<void> {
    const ids = dtos.map(({ id }) => id);
    await this.publicationRepository.destroyByIds(ids);
  }
}
