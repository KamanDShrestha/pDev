import { http, HttpResponse } from 'msw';

const handlers = [
  http.get('/video', () => {
    return HttpResponse.json({
      id: 'abc-123',
      username: 'admin',
      email: 'kaman.shrestha@gmail.com',
    });
  }),
];

export default handlers;
