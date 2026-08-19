import { Jobs } from '@jobber/nestjs';
import { FibonacciMessage, PulsarClient, PulsarConsumer } from '@jobber/pulsar';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { iterate } from 'fibonacci';

@Injectable()
export class FibonacciConsumer
  extends PulsarConsumer<FibonacciMessage>
  implements OnModuleInit
{
  constructor(pulsarClinet: PulsarClient) {
    super(pulsarClinet, Jobs.FIBONACCI);
  }

  protected async onMessage(data: FibonacciMessage): Promise<void> {
    const result = iterate(data.iterations);
    this.logger.log(result);
  }
}
