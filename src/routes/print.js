import * as fs from 'fs';
import { exec } from 'child_process';
import { loadConfigFromFile } from 'vite';

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
    const { sentence } = await request.json();
    const message = `${pre}
    \\"
    "${parse(sentence)}"
    \\" CR LF
    ${post}`
    let written = new Promise((resolve, reject) => {
        fs.writeFile('binary', message, (err) => {
            if(!err) {
                resolve('written');
            } else {
                reject(err);
                console.log(`error: ${err.message}`);
            }
         });
    });
    let sent = new Promise(async (resolve, reject) => {
        if (await written === 'written') {
            exec('senddat binary USBPRN', (err, stdout) => {
                if(!err) {
                    resolve('sent');
                } else {
                    reject(err);
                    console.log(`error: ${err.message}`);
                }
            });
        }
    });

    if (await sent === 'sent') {
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