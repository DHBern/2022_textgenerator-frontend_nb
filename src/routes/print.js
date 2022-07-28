import * as fs from 'fs';
import { exec } from 'child_process';

const pre = `ESC t 0
GS ( L 6 0 48 69 L1 1 1
LF
LF
LF
`; // select the correct character table and print the logo with code L1
const post = `
ESC d 5
ESC m
`;

const parse = (sentence) => {
    return sentence.replaceAll('ä', '"84h"').replaceAll('ö', '"94h"').replaceAll('ü', '"81h"');
}


/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request }) {
    let sent = false;
    const { sentence } = await request.json();
    const message = `${pre}
    \\"
    "${parse(sentence)}"
    \\" CR LF
    ${post}`
    fs.writeFile('binary', message, (err) => { console.log('written'); });
    exec('senddat binary USBPRN', (error, stdout) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        sent = true;
        console.log(`stdout: ${stdout}`);
    });
    if (sent) {
        return {
            status: 200,
            body: {
                message: 'sent',
            },
        };
    } else {
        return {
            status: 500,
            body: {
                message: 'failed',
            },
        };
    }
  }