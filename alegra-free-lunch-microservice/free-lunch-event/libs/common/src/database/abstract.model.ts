import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  CreatedAt,
  UpdatedAt,
  AllowNull,
} from 'sequelize-typescript';

@Table({
  underscored: true,
  timestamps: true,
})
export abstract class AbstractModel<T> extends Model<T> {
  // Se debe usar migraciones para hacer apropiadamente el defaultValue usando pg 🙈
  //  No tengo tanto tiempo así que para esta pequeña app, funciona jaja😅😂
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @AllowNull(false)
  @CreatedAt
  @Column({
    type: DataType.DATE,
  })
  created_at: Date;

  @AllowNull(false)
  @UpdatedAt
  @Column({
    type: DataType.DATE,
  })
  updated_at: Date;
}
