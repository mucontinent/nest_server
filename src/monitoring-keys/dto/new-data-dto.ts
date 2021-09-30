import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';
import { IsFQDN, IsIP, IsNotEmpty } from 'class-validator';
import { City, Protocol } from 'src/env-constants';


registerEnumType(City, {
    name: 'City'
})

registerEnumType(Protocol, {
    name: 'Protocol'
})

@InputType()
export class MonitoringKeysDTO {

    @Field(type => City)
    @IsNotEmpty()
    city: City;

    @Field(type => Protocol)
    @IsNotEmpty()
    protocol: Protocol;

    @Field()
    @IsNotEmpty()
    @IsIP()
    ip_address: string;

    @Field()
    @IsNotEmpty()
    username_credentials: string;

    @Field()
    @IsNotEmpty()
    password_credentials: string;

    @Field()
    @IsFQDN()
    dns: string;

    @Field(type => Int, { nullable: true, defaultValue: 0 })
    port?: number;
}