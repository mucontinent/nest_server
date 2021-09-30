import { Module } from '@nestjs/common';
import { MonitoringKeysService } from './monitoring-keys.service';
import { MonitoringKeysResolver } from './monitoring-keys.resolver';
import { MonitoringKeys } from './dto/new-data';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([MonitoringKeys]),
  ],
  providers: [MonitoringKeysService, MonitoringKeysResolver]
})
export class MonitoringKeysModule { }
