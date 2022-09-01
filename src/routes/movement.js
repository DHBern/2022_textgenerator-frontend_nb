import { Gpio } from 'onoff';

const sensor = new Gpio(17, 'in');

/** @type {import('@sveltejs/kit').RequestHandler} */
export function GET() {
  return new Response(String(sensor.readSync()));
}