import { Jobs } from '@jobber/nestjs';
import {
  LoadProductsMessage,
  PulsarClient,
  PulsarConsumer,
} from '@jobber/pulsar';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoadProductsConsumer extends PulsarConsumer<LoadProductsMessage> {
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient, Jobs.LOAD_PRODUCTS);
  }

  protected async onMessage(data: LoadProductsMessage) {
    console.log(data);
  }
}
