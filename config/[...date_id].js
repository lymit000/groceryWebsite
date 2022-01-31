const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://localhost:3000' : 'https://grocery-od7qlad1d-lymit000.vercel.app';