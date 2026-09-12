import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import api from './services/api';

jest.mock('./services/api', () => ({
  __esModule: true,
  default: { get: jest.fn().mockResolvedValue({ data: [] }) },
}));

beforeEach(() => {
  localStorage.clear();
  api.get.mockResolvedValue({ data: [] });
});

test.each([
  ['/', /sobre o yep 4510/i],
  ['/calendario', /^calendário$/i],
  ['/classificacao', /^classificação$/i],
  ['/classificacao/atribuir', /^atribuir notas$/i],
  ['/inscricao', /^inscrição$/i],
  ['/materiais', /^materiais$/i],
  ['/paises', /^países$/i],
  ['/clubes', /^clubes$/i],
])('abre a tela recuperada %s', async (path, heading) => {
  await act(async () => {
    render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>);
  });
  expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
  expect(screen.queryByText(/learn react/i)).not.toBeInTheDocument();
});

test('navega para o login pelo menu', () => {
  render(<MemoryRouter><App /></MemoryRouter>);
  fireEvent.click(screen.getByRole('link', { name: /^usuário$/i }));
  expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
});

test('logout remove todos os formatos de token antes de abrir o login', () => {
  localStorage.setItem('usuario', JSON.stringify({ nome: 'Usuário de teste' }));
  localStorage.setItem('token', 'token-de-teste');
  localStorage.setItem('jwt_token', 'token-legado-de-teste');
  render(<MemoryRouter><App /></MemoryRouter>);
  fireEvent.click(screen.getByRole('button', { name: 'Sair' }));
  expect(localStorage.getItem('usuario')).toBeNull();
  expect(localStorage.getItem('token')).toBeNull();
  expect(localStorage.getItem('jwt_token')).toBeNull();
  expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
});
