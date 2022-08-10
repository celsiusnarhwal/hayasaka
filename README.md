# Hayasaka

Hayasaka generates secure keys from your command line.

## Installation

```bash
$ npm i hayasaka -g
```

You must install Hayasaka globally to be able to use it from the command line.

## Options

- `-s, --strength`: The strength of the key(s). See [Key Strengths](#key-strengths).
- `-n, --number`: The number of keys to generate. Defaults to, and must be at least, 1.
- `-c, --copy`: Copy the key to the clipboard.
- `-f, --file`: The file to write the key to.
- `-r, --redact`: Redact the key from the console.
- `-h, --help`: Show the help message.

## Key Strengths

Hayasaka supports 10 key strengths - four "standard" strengths and six "special" strengths.

### Standard Strengths

| **Strength** | **Description**                                                                                                     | **Length** | **Example**                                                                        | **URL Safe?** |
|--------------|---------------------------------------------------------------------------------------------------------------------|------------|------------------------------------------------------------------------------------|---------------|
| `decent`     | Short keys suitable for securing your personal devices.                                                             | 10         | <code>1SVVvjDwsN</code>                                                            | Yes           |
| `good`       | More robust keys, suitable for securing things like web hosting accounts.                                           | 15         | <code>M%:?!J2+CjGifL*</code>                                                       | No            |
| `great`      | Very robust keys, suitable for administrative passwords or almost anything else.                                    | 30         | <code>8$A>Blm?dzkzEPa0!8HET)rNe2'LS_</code>                                        | No            |
| `epic`       | Extremely robust keys, suitable for any 256-bit key requirement that cannot be satisfied by the previous strengths. | 32         | <code>bPXapgKhC9PMXkxNwAvSjA54gBVnA7kn</code>                                      | Yes           |

### Special Strengths

| **Strength** | **Description**                                                                                                     | **Length** | **Example**                                                                         | **URL Safe?** |
|--------------|---------------------------------------------------------------------------------------------------------------------|------------|-------------------------------------------------------------------------------------|---------------|
| `wpa160`     | 160-bit WPA encryption keys.                                                                                        | 20         | <code>u}EE_B`Wvir>Xt&&#124;6&#124;D[</code>                                         | No            |
| `wpa504`     | 504-bit WPA encryption keys.                                                                                        | 63         | <code>=sK(g,<L?q&#124;$M^VMOuaBMe-D*<==13L59N5S0,DX4\`zDBRz[4S>PP_p$p4\`P(EG</code> | No            |
| `wep64`      | 64-bit WEP encryption keys.                                                                                         | 5          | `C116B`                                                                             | Yes           |
| `wep152`     | 152-bit WEP encryption keys.                                                                                        | 16         | `B7F7783BBBE5F9DE`                                                                  | Yes           |
| `wep256`     | 256-bit WEP encryption keys.                                                                                        | 29         | `1A9C47C8A924D69F17EFD991A532C`                                                     | Yes           |


## Examples

Generate a `decent` key:

```bash
$ hayasaka -s decent
```

Generate a `good` key and copy it to the clipboard:

```bash
$ hayasaka -s good -c
```

Generate a `great` key, copy it to the clipboard, and redact it from the console:

```bash
$ hayasaka -s great -c -r
```

Generate five `epic` keys and write them to `keys.txt`:

```bash
$ hayasaka -s epic -n 5 -f keys.txt
```

## Acknowledgements

Hayasaka uses a substantial amount of code from [RandomKeygen](https://github.com/circlecell/randomkeygen.com).

## License

Haysaka is licensed under the [MIT License](LICENSE.md).