import api from './api';

jest.mock('axios', () => ({
  create: () => ({ interceptors: { request: { use: jest.fn() } } }),
}));

beforeEach(() => localStorage.clear());
const interceptor = api.interceptors.request.use.mock.calls[0][0];

test('envia apenas o JWT da sessão, sem chave compartilhada', () => {
  localStorage.setItem('token', 'jwt-de-teste');
  const config = interceptor({ headers: {} });
  expect(config.headers['User-Token']).toBe('Bearer jwt-de-teste');
  expect(config.headers['X-Api-Key']).toBeUndefined();
});

test('não envia credenciais quando não existe sessão', () => {
  expect(interceptor({ headers: {} }).headers).toEqual({});
});
