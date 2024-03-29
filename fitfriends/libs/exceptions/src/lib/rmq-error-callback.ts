import * as ampqlib from 'amqplib';

export const rmqErrorCallback = (
  channel: ampqlib.Channel,
  msg: ampqlib.ConsumeMessage,
  error: any,
) => {
  const { replyTo, correlationId } = msg.properties;
  if (replyTo) {
    if (error instanceof Error) {
      error = error.message;
    } else if (typeof error !== 'string') {
      error = JSON.stringify(error);
    }

    error = Buffer.from(
      JSON.stringify({
        status: 'error',
        message: error,
        dataRequest: JSON.parse(Buffer.from(msg.content).toString()),
        statusCode: 400,
      }),
    );
    channel.publish('', replyTo, error, { correlationId });
    channel.ack(msg);
  }
};
