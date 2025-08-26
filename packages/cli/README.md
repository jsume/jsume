# @jsume/cli

[![npm version][ver-img-src]][pkg-href]
[![npm downloads][dls-img-src]][pkg-href]

A command-line interface (CLI) for managing and interacting with the `jsume` ecosystem.

## Installation

```bash
npm install -g @jsume/cli
```

## Usage

```bash
jsume -h                                    # show help
jsume new 1.jsume.json 2.jsume.json         # create new jsume JSON files
jsume validate 1.jsume.json 2.jsume.json    # validate jsume JSON files
```

### Commands

#### `n, new`

```bash
jsume n [...files]
jsume new -e -r [...files]
```

> [!TIP]
> `[...files]` are optional, `jsume.json` will be created under cwd if none are provided.

##### Flags

- `-e, --example`: create example jsume JSON files instead of empty ones.
- `-r, --recursive`: create files recursively in directories.

<br>

#### `v, validate`

```bash
jsume v [...files]
jsume validate -j [...files]
```

> [!TIP]
> `[...files]` are optional, `jsume.json` & `*.jsume.json` will be validated under cwd if none are provided.

##### Flags

- `-z, --zod`: use [Zod](https://zod.dev) for validation.
- `-j, --jsonschema`: use JSON Schema ([ajv](https://ajv.js.org)) for validation.

> [!TIP]
> If neither `-z` nor `-j` is provided, both validators will be used.

<!-- Badges -->

[ver-img-src]: <https://img.shields.io/npm/v/%40jsume%2Fcli> "npm version image"
[dls-img-src]: <https://img.shields.io/npm/dm/%40jsume%2Fcli> "npm version image"
[pkg-href]: <https://npmjs.com/package/@jsume/cli> "npm packge page"
