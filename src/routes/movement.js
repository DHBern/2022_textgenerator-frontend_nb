import { Gpio } from 'onoff';

let sensor;

if (import.meta.env.VITE_LINUX === 'true') {
    sensor = new Gpio(17, 'in');
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export function GET() {
    if (import.meta.env.VITE_LINUX === 'true') {
        return new Response(JSON.stringify({ movement: sensor.readSync() === 1 }));
    } else {
        return new Response(JSON.stringify({ movement: true }));
    }
}