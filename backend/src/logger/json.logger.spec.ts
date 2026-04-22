import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
  });

  it('должен форматировать лог как JSON', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();

    logger.log('Test message', 'param1');

    expect(spy).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'log',
        message: 'Test message',
        optionalParams: [['param1']],
      }),
    );

    spy.mockRestore();
  });
});
