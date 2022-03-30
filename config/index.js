const dev = process.env.NODE_ENV !== 'production';
export default function handler(request, response) {
    response.status(200).json({
        body: request.body,
        query: request.query,
        cookies: request.cookies,
    });
}
export const server = dev ? 'http://localhost:3000/' : 'https://grocerycostco.vercel.app';