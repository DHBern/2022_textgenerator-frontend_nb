import crypto from 'crypto';
import nodeFetch from 'node-fetch';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request }) {
	const { sentence, author } = await request.json();

	const n = Date.now();
	const hash = crypto
		.createHash('md5')
		.update(`${n}-${import.meta.env.VITE_SECRET}`)
		.digest('hex');
	const data = new FormData();
	data.append('text', sentence);
	data.append('author', author);
	data.append('source', 'unibe');
	data.append('secret', `${n}|${hash}`);
	console.log(data);

	const nbRequest = await nodeFetch(
		'http://www.nationalbibliothek.ch/admin/app/nb/action/speechtotextupload/',
		{
			method: 'POST',
			body: data
		}
	);
	console.log(nbRequest);
	return {
		status: 200,
		body: {
			message: 'sent'
		}
	};
}
