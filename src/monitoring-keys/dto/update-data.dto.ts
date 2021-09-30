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
export class MonitoringKeysUpdateDTO {

    @Field({ nullable: true })
    id?: number;

    @Field(type => City, { nullable: true })
    city?: City;

    @Field({ nullable: true })
    protocol?: Protocol;

    @Field({ nullable: true })
    @IsIP()
    ip_address?: string;

    @Field({ nullable: true })
    username_credentials?: string;

    @Field({ nullable: true })
    password_credentials?: string;

    @Field({ nullable: true })
    @IsFQDN({ require_tld: false })
    dns?: string;

    @Field(type => Int, { nullable: true })
    port?: number;
}