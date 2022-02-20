import service from '../service';
import Repo from '../../__mocks__/repo';

const repo = Repo();

describe('getSessionOpenCart service', () => {
  it('should create a cart for the session', async () => {
    const result = await service(repo, {
      sessionId: 'session-id-without-cart',
    });

    expect(result).toBeTruthy();
    expect(result.id).toBe('test-id');
    expect(result.sessionId).toBe('session-id-without-cart');
    expect(result.createdAt).toBe('test-created-at');
    expect(result.updatedAt).toBe('test-updated-at');
    expect(result.closedAt).toBe('');
    expect(repo.carts).toHaveLength(1);
  });

  it('should get the session id cart', async () => {
    const result = await service(repo, {
      sessionId: 'session-id-without-cart',
    });

    expect(result).toBeTruthy();
    expect(result.id).toBe('test-id');
    expect(result.sessionId).toBe('session-id-without-cart');
    expect(result.createdAt).toBe('test-created-at');
    expect(result.updatedAt).toBe('test-updated-at');
    expect(result.closedAt).toBe('');
    expect(repo.carts).toHaveLength(1);
  });
});
