/**
 * Iba a usar el patron repositorio con sequelize 🙈
 * Pero ellos mismos se complican en como establecen el tipado con sequelize-typescript jajaja 😂
 *
 * No tengo el tiempo ahora 😅
 * Así que lo dejaré simple
 * (podría usar moongose o TypeORM, pero después quiero retomarlo)
 */

// import { Logger, NotFoundException } from '@nestjs/common';
// // import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
// // import { Model } from 'sequelize';
// import { Model, ModelCtor } from 'sequelize-typescript';
// import { AbstractModel } from './abstract.model';

// Intento 2
// // export default abstract class BaseRepository<M extends AbstractModel> {
// //   constructor(protected model: ModelCtor) {}

// //   public async all(attributes?: string[]): Promise<M[]> {
// //     // Type 'Model<{}, {}>[]' is not assignable to type 'M[]'.
// //     // Type 'Model<{}, {}>' is not assignable to type 'M'.
// //     // 'Model<{}, {}>' is assignable to the constraint of type 'M', but 'M' could be instantiated with a different subtype of constraint 'Model<any, any>'.
// //     return this.model.findAll({
// //       attributes,
// //     });
// // }

// Intento 1
// export abstract class AbstractRepository<TModel extends AbstractModel> {
//   protected abstract readonly logger: Logger;

//   constructor(
//     protected readonly model: Model<TModel>,
//     protected readonly model2: typeof Model<TModel>,
//   ) {}

//   async create(
//     item: Omit<TModel, 'id' | 'created_at' | 'updated_at'>,
//   ): Promise<TModel> {
//     // const createdDocument = new this.model({
//     //   ...document,
//     //   _id: new Types.ObjectId(),
//     // });
//     // return (await createdDocument.save()).toJSON() as unknown as TModel;
//     // const createdItem = await this.model.create(item);
//     // return createdItem;
//   }

//   // async findOne(filterQuery: FilterQuery<TModel>): Promise<TModel> {
//   //   const document = await this.model
//   //     .findOne(filterQuery, {})
//   //     .lean<TModel>(true);
//   //   if (!document) {
//   //     this.logger.warn('Document not found with filterQuery', filterQuery);
//   //     throw new NotFoundException('Document not found.');
//   //   }

//   //   return document;
//   // }

//   // async findOneAndUpdate(
//   //   filterQuery: FilterQuery<TModel>,
//   //   update: UpdateQuery<TModel>,
//   // ) {
//   //   const document = await this.model.findOneAndUpdate(filterQuery, update, {
//   //     lean: true,
//   //     new: true,
//   //   });
//   //   if (!document) {
//   //     this.logger.warn('Document not found with filterQuery', filterQuery);
//   //     throw new NotFoundException('Document not found.');
//   //   }
//   //   return document;
//   // }

//   // async find(filterQuery: FilterQuery<TModel>) {
//   //   // return this.model.find(filterQuery).lean<TModel[]>(true); // Try This later
//   //   return this.model.find(filterQuery, {}, { lean: true });
//   // }

//   // async findOneAndDelete(filterQuery: FilterQuery<TModel>) {
//   //   return this.model.findOneAndDelete(filterQuery, { lean: true });
//   // }
// }
