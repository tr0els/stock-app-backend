import { Module } from '@nestjs/common';
import { StockService } from './service/stock.service';
import { StockGateway } from './gateway/stock.gateway';
import { MongoModule } from './infrastructure/mongo/mongo.module';
import { stocksProviders } from './infrastructure/mongo/stock.providers';
import { StockRepository } from './infrastructure/mongo/stock.repository';

@Module({
  providers: [StockService, StockGateway, StockRepository, ...stocksProviders],
  imports: [MongoModule],
})
export class StockModule {}
