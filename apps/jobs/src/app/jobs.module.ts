import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { Packages } from '@jobber/grpc';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { JobsResolver } from './jobs.resolver';
import { PulsarModule } from '@jobber/pulsar';
import { JobsService } from './jobs.service';
import { FibonacciJob } from './jobs/fibonacci/fibonacci.job';
import { LoadProductsJob } from './jobs/products/load-products.job';

@Module({
  imports: [
    DiscoveryModule,
    PulsarModule,
    ClientsModule.registerAsync([
      {
        name: Packages.AUTH,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: configService.getOrThrow('AUTH_GRPC_SERVICE_URL'),
            package: Packages.AUTH,
            protoPath: join(__dirname, '../../libs/grpc/proto/auth.proto'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [FibonacciJob, JobsService, JobsResolver, LoadProductsJob],
})
export class JobsModule {}
