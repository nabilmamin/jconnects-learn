import { logger } from './logger';

describe('logger.info', () => {
  test('outputs JSON with level "info" and the message', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});

    logger.info('hello world');

    expect(spy).toHaveBeenCalledOnce();
    const output = JSON.parse(spy.mock.calls[0][0] as string);
    expect(output.level).toBe('info');
    expect(output.message).toBe('hello world');
    expect(output.timestamp).toBeDefined();

    spy.mockRestore();
  });

  test('spreads extra context into the log object', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});

    logger.info('with context', { userId: '123', action: 'login' });

    const output = JSON.parse(spy.mock.calls[0][0] as string);
    expect(output.userId).toBe('123');
    expect(output.action).toBe('login');

    spy.mockRestore();
  });
});

describe('logger.warn', () => {
  test('outputs JSON with level "warn"', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    logger.warn('something fishy');

    const output = JSON.parse(spy.mock.calls[0][0] as string);
    expect(output.level).toBe('warn');
    expect(output.message).toBe('something fishy');

    spy.mockRestore();
  });
});

describe('logger.error', () => {
  test('outputs JSON with level "error" and error details', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const err = new Error('kaboom');

    logger.error('something broke', err);

    const output = JSON.parse(spy.mock.calls[0][0] as string);
    expect(output.level).toBe('error');
    expect(output.message).toBe('something broke');
    expect(output.errorName).toBe('Error');
    expect(output.errorMessage).toBe('kaboom');
    expect(output.stack).toBeDefined();

    spy.mockRestore();
  });

  test('handles missing error gracefully', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    logger.error('no error object');

    const output = JSON.parse(spy.mock.calls[0][0] as string);
    expect(output.level).toBe('error');
    expect(output.message).toBe('no error object');
    expect(output.errorName).toBeUndefined();
    expect(output.errorMessage).toBeUndefined();

    spy.mockRestore();
  });

  test('merges extra context alongside error details', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const err = new Error('fail');

    logger.error('request failed', err, { requestId: 'abc' });

    const output = JSON.parse(spy.mock.calls[0][0] as string);
    expect(output.requestId).toBe('abc');
    expect(output.errorMessage).toBe('fail');

    spy.mockRestore();
  });
});
