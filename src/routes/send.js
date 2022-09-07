import crypto from 'crypto';
import axios from 'axios';
import FormData from 'form-data';

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

	const config = {
		method: 'post',
		url: 'http://www.nationalbibliothek.ch/admin/app/nb/action/speechtotextupload/',
		headers: {
			...data.getHeaders()
		},
		data: data
	};
	console.log(data);

	const nbRequest = await axios(config);
	console.log(nbRequest);
	return {
		status: 200,
		body: {
			message: 'sent'
		}
	};
	/*
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
	*/
}
