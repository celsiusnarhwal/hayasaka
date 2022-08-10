#! /usr/bin/env node

import commandLineArgs from "command-line-args";
import clipboard from "clipboardy";
import * as fs from "fs";
import commandLineUsage from "command-line-usage";


const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '1234567890';
const special = '`~!@#$%^&*()-=_+[]{}|;\':",./<>?';
const hex = '123456789ABCDEF';


function keyGen(
    length,
    useLowerCase = true,
    useUpperCase = true,
    useNumbers = true,
    useSpecial = true,
    useHex = false
) {
    let chars = '';
    let key = '';

    if (useLowerCase) chars += lowerCase;
    if (useUpperCase) chars += upperCase;
    if (useNumbers) chars += numbers;
    if (useSpecial) chars += special;
    if (useHex) chars += hex;

    for (let i = 0; i < length; i++) {
        key += chars[Math.floor(Math.random() * chars.length)];
    }

    return key;
}

function getKey(strength) {
    switch (strength) {
        case 'decent':
            return keyGen(10, true, true, true, false, false);
        case 'good':
            return keyGen(15, true, true, true, true, false);
        case 'great':
            return keyGen(30, true, true, true, true, false);
        case 'epic':
            return keyGen(32, true, true, true, false, false);
        case 'wpa160':
            return keyGen(20, true, true, true, true, false);
        case 'wpa504':
            return keyGen(63, true, true, true, true, false);
        case 'wep64':
            return keyGen(5, false, false, false, false, true);
        case 'wep128':
            return keyGen(13, false, false, false, false, true);
        case 'wep152':
            return keyGen(16, false, false, false, false, true);
        case 'wep256':
            return keyGen(29, false, false, false, false, true);
        default:
            throw Error(`No such strength "${strength}"`);
    }
}

const optionDefinitions = [
    {
        "name": "strength",
        alias: "s",
        type: String,
        typeLabel: "{underline strength}",
        description: "The strength of the key."
    },
    {
        "name": "number",
        alias: "n",
        type: Number,
        typeLabel: "{underline number}",
        defaultValue: 1,
        description: "The number of keys to generate. Defaults to 1."
    },
    {
        "name": "copy",
        alias: "c",
        type: Boolean,
        defaultValue: false,
        description: "Copy the key to the clipboard."
    },
    {
        "name": "file",
        alias: "f",
        type: String,
        typeLabel: "{underline path}",
        description: "The file to write the key to."
    },
    {
        "name": "redact",
        alias: "r",
        type: Boolean,
        defaultValue: false,
        description: "Redact the key from the console."
    },
    {
        name: "help",
        alias: "h",
        type: Boolean,
        description: "Print this help message."
    }
]

const options = commandLineArgs(optionDefinitions);

const helptext = [
    {
        header: "Hayasaka",
        content: "Generate secure keys from your command line.",
    },
    {
        header: "Options",
        optionList: optionDefinitions,
    },
    {
        header: "Documentation",
        content: "See Hayasaka's README on NPM. https://npmjs.com/package/hayasaka"
    },
    {
        header: "License",
        content: "Hayasaka is MIT-licensed. https://github.com/celsiusnarhwal/hayasaka/blob/master/LICENSE"
    }
]

if (!options.strength) {
    console.log(commandLineUsage(helptext));
} else if (options.help && (options.strength || options.number || options.copy || options.file || options.obscure)) {
    console.error("You cannot use --help with any other options.");
} else if (options.number < 1) {
    console.error("You must generate at least one key.");
} else {
    let keys = [];
    for (let i = 0; i < options.number; i++) {
        keys.push(getKey(options.strength));
    }

    let plurality = keys.length > 1 ? "Keys" : "Key";


    if (!options.obscure) {
        console.log(keys.join('\n'));
    }

    if (options.copy) {
        clipboard.writeSync(keys.join('\n'));
        console.log(`${plurality} copied to clipboard.`);
    }

    if (options.file) {
        fs.writeFileSync(options.file, keys.join('\n'));
        console.log(`${plurality} written to ${options.file}.`);
    }
}


