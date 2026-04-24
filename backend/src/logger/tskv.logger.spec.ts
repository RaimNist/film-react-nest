import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();
  });

  it('должен форматировать сообщение в TSKV формате', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();

    logger.log('Test message', { key: 'value' });
    const logOutput = spy.mock.calls[0][0];
    const parts = logOutput.split('\t');
    expect(parts[1]).toBe('level=log');
    expect(parts[2]).toBe('message=Test message');
    expect(parts[3]).toBe('optionalParams=[[{"key":"value"}]]');

    spy.mockRestore();
  });
});
