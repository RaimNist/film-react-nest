import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: {
            createOrder: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create order', async () => {
    const item: CreateOrderDto = {
      tickets: [
        {
          film: '1',
          session: '1',
          daytime: '2024-01-01T12:00:00Z',
          row: 1,
          seat: 1,
          price: 10,
        },
      ],
      email: 'test@test.test',
      phone: '1234567890',
    };

    controller.postOrder(item);

    expect(service.createOrder).toHaveBeenCalledWith(item);
  });
});
