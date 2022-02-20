import service from '../service';
import Repo from '../../__mocks__/repo';

const repo = Repo();

beforeEach(() => {
  repo.carts = [
    {
      id: 'stored-cart-id',
      sessionId: 'test-session-id',
      createdAt: 'test-created-at',
      updatedAt: 'test-updated-at',
      closedAt: '',
    },
  ];
});

describe('getCart service', () => {
  it('should get a cart by id', async () => {
    const result = await service(repo, { id: 'stored-cart-id' });
    expect(result).toBeTruthy();
    expect(result?.id).toBe('stored-cart-id');
    expect(result?.sessionId).toBe('test-session-id');
    expect(result?.createdAt).toBe('test-created-at');
    expect(result?.updatedAt).toBe('test-updated-at');
    expect(result?.closedAt).toBe('');
  });

  it('should return undefine when it does not found the cart', async () => {
    const result = await service(repo, { id: 'test-id' });
    expect(result).toBe(undefined);
  });
});
