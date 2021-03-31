import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway, WebSocketServer
} from "@nestjs/websockets";
import { CreateStockDto } from '../dto/create-stock.dto';
import { Socket } from 'socket.io';
import { StockService } from '../service/stock.service';
import { Stock } from '../shared/stock.model';

@WebSocketGateway()
export class StockGateway {
  constructor(private stockService: StockService) {}

  @WebSocketServer() server;

  @SubscribeMessage('stock-create')
  async handleStockCreate(
    @MessageBody() data: CreateStockDto,
    @ConnectedSocket() client: Socket,
  ) {
    const stock: Stock = {
      name: data.name,
      description: data.description,
      value: data.value,
    };
    try {
      const stockCreated = await this.stockService.createStock(stock);
      const stocks = await this.stockService.findAll();
      client.emit('stock-created-success', stockCreated);
      this.server.emit('stocks', stocks);
    } catch (e) {
      client.emit('stock-created-error', e.message);
    }
  }

  @SubscribeMessage('stock-update')
  async handleStockUpdate(
    @MessageBody() data: Stock, // change to dto
    @ConnectedSocket() client: Socket,
  ) {
    const stock: Stock = {
      id: data.id,
      name: data.name,
      description: data.description,
      value: data.value,
    };
    try {
      const stockUpdated = await this.stockService.updateStock(stock);
      const stocks = await this.stockService.findAll();
      client.emit('stock-updated-success', stockUpdated);
      this.server.emit('stocks', stocks);
    } catch (e) {
      client.emit('stock-updated-error', e.message);
    }
  }

  @SubscribeMessage('welcome')
  async handleWelcome(
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    try {
      const stocks = await this.stockService.findAll();
      client.emit('stocks', stocks); // only client needs stocks on welcome
    } catch (e) {
      client.error(e.message);
    }
  }
}
