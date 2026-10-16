import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "../enum/roles.enum.js";

@Entity('users')

export class User {
    
    @PrimaryGeneratedColumn()
    id : number

    @Column({type : 'varchar', length : 120})
    username : string

    @Column({type : 'varchar' ,length : 120, unique: true})
    email : string

    @Column({type: 'varchar', length : 120})
    password : string

    @Column({type : 'enum', enum : Role, default : Role.UNDEFINED})
    role : Role

    // @Column({type : 'varchar', length: 255, unique:true, nullable: true})
    // googleId : string

    // @Column({type :'varchar', length : 255, unique: true, nullable: true})
    // githubId : string

    // @Column({type : 'varchar', length: 512, nullable : true})
    // avatarUrl : string

    // @Column({type : 'varchar', length: 255})
    // refreshToken : string

    // @Column({type : 'varchar', length: 255})
    // passwordResetToken : string

    // @Column({type : 'timestamp', nullable: true})
    // passwordResetTokenExpiresAt : Date | null

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt : Date
}