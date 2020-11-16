import {Entity, Column, PrimaryGeneratedColumn,Unique, CreateDateColumn, UpdateDateColumn} from  'typeorm'
import * as bcrypt from 'bcrypt'

@Entity("user")
@Unique(["email"])
export class user{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    apellido: string;
    
    @Column()
    email: string;
    
    @Column()
    telefono: string;

    @Column()
    password: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    comparePassword(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
      }
}