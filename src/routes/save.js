import * as fs from 'fs';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request }) {
	const data = await request.json();
	const path = `data/${new Date().getFullYear()}`;
	const file = `${path}/${new Date().getMonth() + 1}.json`;
	const newEntry = {
		...data,
		date: new Date().toJSON()
	};

	if (!fs.existsSync(path)) {
		fs.mkdirSync(path, { recursive: true });
	}
	if (!fs.existsSync(file)) {
		fs.writeFileSync(file, JSON.stringify([newEntry]));
	} else {
		fs.readFile(file, function (err, fileData) {
			const json = JSON.parse(fileData);
			json.push(newEntry);
			fs.writeFileSync(file, JSON.stringify(json));
		})
	}

	return {
		status: 200,
		body: {
			message: 'saved'
		}
	};
}
