import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm'
import { IsString, IsNumber } from 'class-validator'
import { baseGrid } from './game'

type Player = 'user' | 'computer'
type Status = 'started' | 'finished'

// todo: make types for grids

@Entity()
export class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('json', {nullable: true})
  shipsGridUser: any

  @Column('json', {nullable: true})
  shipsGridComputer: any

  @Column('json', {default: [...baseGrid]})
  shotsGridUser: any

  @IsNumber()
  @Column('int', {default: 1})
  turn: number

  @IsNumber()
  @Column('int', { default: 0})
  scoreUser: number

  @IsNumber()
  @Column('int', { default: 0})
  scoreComputer: number
  
  @IsString()
  @Column('text', {default: ''})
  feedbackUser: string

  @IsString()
  @Column('text', {default: ''})
  feedbackComputer: string

  @IsString()
  @Column('text', {default: 'started'})
  status: Status

  @Column('text', {nullable: true})
  winner: Player

}



