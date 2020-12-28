import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn } from 'typeorm'
// * Tabla/entidad de producto
// TODO: crear una relacion entre producto y categorias como clave foranea (1 - 1)

@Entity()
export class Producto {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    @Column()
    referencia: string

    @Column()
    descripcion: string

    @Column()
    imformacion: string
}