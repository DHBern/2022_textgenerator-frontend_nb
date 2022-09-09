import * as fs from 'fs';
import receiptio from 'receiptio';

const imageAsBase64 = fs.readFileSync('./static/logo.png', 'base64');
const options = "-d /dev/usb/lp0 -t 0";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request }) {
	const { sentence, author } = await request.json();
	const message = `
	{image:${imageAsBase64}}

	^^${author}, Bern, ${new Date().toLocaleDateString('de-CH')}

	${sentence}

	Alle Texte auf "www.nationalbibliothek.ch

	{code:www.nationalbibliothek.ch; option:qrcode,6,M}

	`;

	const result = receiptio.print(message, options);
	console.log(result);
	if ((await result) === 'success') {
		return {
			status: 200,
			body: {
				message: 'sent'
			}
		};
	} else {
		return {
			status: 500,
			body: {
				message: 'failed'
			}
		};
	}
}
