import { rest } from 'msw';
import { mockResponse } from './mockResponse';

export const handlers = [
    rest.get('https://api.pexels.com/v1/search/', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(mockResponse)
        );
    }),
];