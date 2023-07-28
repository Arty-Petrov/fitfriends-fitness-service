import {
  SenderSendNewTrainingDto,
  SenderSendSubscriptionDto,
  SenderSendUnsubscriptionDto,
} from '@fitfriends/contracts';
import { PublicationCategory } from '@fitfriends/shared-types';
import { MailerService } from '@nestjs-modules/mailer';
import { forwardRef, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PublicationService } from '../publication/publication.service';
import { SubscriberService } from '../subscriber/subscriber.service';
import { EmailSubject } from './sender.constant';

@Injectable()
export class SenderMailService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject(forwardRef(() => SubscriberService))
    private readonly subscriberService: SubscriberService,
    private readonly publicationService: PublicationService
  ) {}

  public async sendSubscription(
    dto: SenderSendSubscriptionDto
  ): Promise<HttpStatus> {
    const { publisherName, subscriberName, subscriberEmail } = dto;
    console.log('subscribe', dto);
    await this.mailerService.sendMail({
      to: subscriberEmail,
      subject: EmailSubject.Subscribe,
      template: './subscription',
      context: {
        publisherName: `${publisherName}`,
        subscriberName: `${subscriberName}`,
        subscriberEmail: `${subscriberEmail}`,
      },
    });
    return HttpStatus.OK;
  }

  public async sendUnsubscription(
    dto: SenderSendUnsubscriptionDto
  ): Promise<HttpStatus> {
    const { publisherName, subscriberName, subscriberEmail } = dto;
    console.log('unsubscribe', dto);
    await this.mailerService.sendMail({
      to: subscriberEmail,
      subject: EmailSubject.Unsubscribe,
      template: './unsubscription',
      context: {
        publisherName: `${publisherName}`,
        subscriberName: `${subscriberName}`,
        subscriberEmail: `${subscriberEmail}`,
      },
    });
    return HttpStatus.OK;
  }

  public async sendNewTraining(
    dto: SenderSendNewTrainingDto
  ): Promise<HttpStatus> {
    const { publisherId, publisherName } = dto;
    const publications = await this.publicationService.getListToSend({
      authorId: publisherId,
      category: PublicationCategory.Training,
    });
    const subscribers = await this.subscriberService.getSubscribers(
      publisherId
    );
    if (!publications.length) {
      return HttpStatus.NO_CONTENT;
    }
    if (!subscribers.length) {
      return HttpStatus.NO_CONTENT;
    }
    const trainings = publications.map(({ title, description }) => {
      return { title: title, description: description };
    });
    for (const subscriber of subscribers) {
      const { subscriberName, subscriberEmail } = subscriber;
      await this.mailerService.sendMail({
        to: subscriberEmail,
        subject: EmailSubject.NewTraining,
        template:
          publications.length > 1 ? './new-trainings' : './new-training',
        context: {
          subscriberName: `${subscriberName}`,
          publisherName: `${publisherName}`,
          publications:
            trainings.length > 1 ? trainings : trainings[0],
        },
      });
    }
    await this.publicationService.deleteSent(publications);
    return HttpStatus.OK;
  }
}
