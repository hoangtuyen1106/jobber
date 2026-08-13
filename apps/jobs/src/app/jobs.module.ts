import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { PulsarModule } from '@jobber/pulsar';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AUTH_PACKAGE_NAME } from '@jobber/grpc';
import { JobsResolver } from './jobs.resolver';
import { JobsService } from './jobs.service';
import { FibonacciJob } from './jobs/fibonacci/fibonacci.job';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DiscoveryModule,
    PulsarModule,
    ClientsModule.registerAsync([
      {
        name: AUTH_PACKAGE_NAME,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: configService.getOrThrow('AUTH_GRPC_SERVICE_URL'),
            package: AUTH_PACKAGE_NAME,
            protoPath: join(__dirname, '../../libs/grpc/proto/auth.proto'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [FibonacciJob, JobsService, JobsResolver],
})
export class JobsModule {}
