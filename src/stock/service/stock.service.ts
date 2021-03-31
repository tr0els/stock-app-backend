import { Injectable } from '@nestjs/common';
import { Stock } from '../shared/stock.model';
import { StockRepository } from '../infrastructure/mongo/stock.repository';

@Injectable()
export class StockService {
  constructor(private stockRepository: StockRepository) {}

  async createStock(stock: Stock): Promise<Stock> {
    // Validering Af Data navn okay?
    if (stock.name.length < 2) {
      throw new Error('Stock name must be more then 2 chars');
    }
    const stockCreated = await this.stockRepository.add(stock);
    return stockCreated;
  }

  async updateStock(stock: Stock): Promise<Stock> {
    // Validering Af Data navn okay?
    if (stock.name.length < 2) {
      throw new Error('Stock name must be more then 2 chars');
    }
    const stockUpdated = await this.stockRepository.update(stock);

    return stockUpdated;
  }

  async findAll(): Promise<Stock[]> {
    return await this.stockRepository.findAll();
  }
}
