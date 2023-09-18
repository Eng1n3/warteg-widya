import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'seeders', schema: 'landing_page' })
export class SeederEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('int8')
  timestamp: number;

  @Column('varchar')
  name: string;
}
