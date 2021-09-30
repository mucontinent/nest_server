import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsFQDN, IsIP, IsNotEmpty, IsString, validateOrReject } from 'class-validator';
import { City, Protocol } from 'src/env-constants';
import { Entity, Column, PrimaryGeneratedColumn, Unique, BeforeUpdate } from 'typeorm';

@Entity('monitoring_keys')
@Unique("name_ip_protocol", ["ip_address", "dns"])
@ObjectType()
export class MonitoringKeys {

    @PrimaryGeneratedColumn()
    @Field()
    id: number;


    @Column({
        type: "enum",
        enum: City,
        default: City.CULIACAN
    })
    @Field()
    @IsNotEmpty()
    city: City;


    @Column({
        type: "enum",
        enum: Protocol,
        default: Protocol.WEB
    })
    @Field()
    @IsNotEmpty()
    protocol: Protocol;


    @Column()
    @Field()
    @IsIP()
    @IsNotEmpty()
    ip_address: string;


    @Column()
    @Field()
    @IsString()
    @IsNotEmpty()
    username_credentials: string;


    @Column()
    @Field()
    @IsString()
    @IsNotEmpty()
    password_credentials: string;

    @Column()
    @Field()
    @IsFQDN()
    dns?: string;


    @Column()
    @Field(type => Int, { nullable: true, defaultValue: 0 })
    port?: number;


    @BeforeUpdate()
    async validate() {
        await validateOrReject(this);
    }
}