import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { MonitoringKeys } from './dto/new-data';
import { MonitoringKeysDTO } from './dto/new-data-dto';
import * as bcrypt from 'bcrypt';
import { MonitoringKeysUpdateDTO } from './dto/update-data.dto';
const saltOrRounds = 10;
@Injectable()
export class MonitoringKeysService {
    constructor(
        @InjectRepository(MonitoringKeys)
        private monitoringKey: Repository<MonitoringKeys>
    ) { }

    async findMonitoringKey(searchText?: String): Promise<MonitoringKeysDTO[] | undefined> {
        var monitoringKey = null;

        searchText.toLocaleLowerCase();

        if (searchText != null) {
            monitoringKey = await this.monitoringKey.find({
                where: [
                    {
                        dns: Like(`%${searchText}%`)
                    },
                    {
                        ip_address: Like(`%${searchText}%`)
                    }
                ]
            });
        } else {
            monitoringKey = await this.monitoringKey.find();
        }

        return monitoringKey;
    }


    async createMonitoringKey(data: MonitoringKeysDTO): Promise<MonitoringKeys> {
        const newMonitoringKey = this.monitoringKey.create(data);
        newMonitoringKey.password_credentials = await bcrypt.hash(newMonitoringKey.password_credentials, saltOrRounds);

        return this.monitoringKey.save(newMonitoringKey);
    }


    async updateMonitoringKey(newItem: MonitoringKeysUpdateDTO): Promise<MonitoringKeys> {
        const monitoringKey = await this.monitoringKey.findOneOrFail({
            where: { id: newItem.id }
        });

        if (monitoringKey.protocol == 'WEB') {
            monitoringKey.port = 80;
        } else if (monitoringKey.protocol == 'SSH') {
            monitoringKey.port = 22;
        }

        const newObject = {
            ...monitoringKey,
            ...newItem
        }


        console.log("PASO TODO")


        return this.monitoringKey.save(newObject);
    }


    async findById(id: number) {
        return await this.monitoringKey.findOneOrFail(id);
    }
}
