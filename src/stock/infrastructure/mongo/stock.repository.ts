import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { StockEntity } from './stock.entity';
import { Stock } from '../../shared/stock.model';

@Injectable()
export class StockRepository {
  constructor(
    @Inject('STOCK_MODEL')
    private stockDBModel: Model<StockEntity>,
  ) {}

  async add(stock: Stock): Promise<Stock> {
    //Convert to Entity
    const createdStock = new this.stockDBModel(stock);
    const stockEntitySaved = await createdStock.save();
    const stockToReturn: Stock = {
      id: stockEntitySaved._id,
      name: stockEntitySaved.name,
      description: stockEntitySaved.description,
      value: stockEntitySaved.value,
    };
    console.log('stock saved', stockToReturn);
    return stockToReturn;
  }

  async update(stock: Stock): Promise<Stock> {
    //Convert to Entity
    const stockEntityUpdated = await this.stockDBModel
      .findOneAndUpdate({ _id: stock.id }, stock, {
        new: true,
        useFindAndModify: false,
      })
      .exec();

    const stockToReturn: Stock = {
      id: stockEntityUpdated.id,
      name: stockEntityUpdated.name,
      description: stockEntityUpdated.description,
      value: stockEntityUpdated.value,
    };

    console.log('stock updated', stockToReturn);
    return stockToReturn;
  }

  async findAll(): Promise<Stock[]> {
    return this.stockDBModel.find().exec();
  }
}
