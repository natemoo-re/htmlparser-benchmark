import { parse } from 'ultrahtml';

export default function (html, callback) {
    parse(html);
	callback(null);
};
