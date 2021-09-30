
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { MonitoringKeys } from './dto/new-data';
import { MonitoringKeysDTO } from './dto/new-data-dto';
import { MonitoringKeysUpdateDTO } from './dto/update-data.dto';
import { MonitoringKeysService } from './monitoring-keys.service';


@Resolver()
export class MonitoringKeysResolver {
    constructor(private monitoringKeyService: MonitoringKeysService) { }

    @Query(returns => [MonitoringKeys])
    findMonitoringKey(@Args('searchText') searchText?: String): Promise<MonitoringKeys[] | any> {
        return this.monitoringKeyService.findMonitoringKey(searchText);
    }

    @Mutation(returns => MonitoringKeys)
    async createMonitoringKey(@Args('data') data: MonitoringKeysDTO): Promise<MonitoringKeys> {

        const newMonitoringKey = await this.monitoringKeyService.createMonitoringKey(data);

        if (newMonitoringKey.protocol == 'WEB') {
            newMonitoringKey.port = 80;
        } else if (newMonitoringKey.protocol == 'SSH') {
            newMonitoringKey.port = 22;
        }

        return newMonitoringKey;
    }


    @Mutation(returns => MonitoringKeys)
    async updateMonitoringKey(@Args('id') id: number, @Args('newData') newData: MonitoringKeysUpdateDTO): Promise<MonitoringKeys> {
        const oldData = await this.monitoringKeyService.findById(id);
        const newItem: MonitoringKeysUpdateDTO = {
            ...oldData,
            ...newData
        }
        return this.monitoringKeyService.updateMonitoringKey(newItem);
    }
}
