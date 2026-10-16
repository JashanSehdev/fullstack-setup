import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')

export class users {
    
    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column({type : 'varchar', length : '70'})
    username : string

    @Column({type : 'varchar' ,length : '120', unique: true})
    email : string

    @Column({type: 'varchar', length : 100})
    paswordHash : string

    @Column({type : 'varchar', length: 255, unique:true, nullable: true})
    googleId : string

    @Column({type :'varchar', length : 255, unique: true, nullable: true})
    githubId : string

    @Column({type : 'varchar', length: 512, nullable : true})
    avatarUrl : string

    @Column({type : 'varchar', length: 255})
    refreshToken : string

    @Column({type : 'varchar', length: 255})
    passwordResetToken : string

    @Column({type : 'timestamp', nullable: true})
    passwordResetTokenExpiresAt : Date | null

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt : Date
}