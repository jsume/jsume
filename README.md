# jsumé

**J**SON Ré**sumé** — A schema-validated, developer-friendly format for storing résumé/CV data as JSON.

## Packages

| Package | Description |
|---------|-------------|
| [`@jsume/schemas`](./packages/schemas) | Zod schemas & JSON Schema drafts for résumé validation |
| [`@jsume/cli`](./packages/cli) | CLI tool to create and validate jsume files |

## Installation

```bash
npm install -g @jsume/cli
```

## Quick Start

```bash
# Create an example résumé file
jsume new my-resume.jsume.json --example

# Validate the file
jsume validate my-resume.jsume.json
```

## CLI

### `jsume new [files...]` (alias: `n`)

Create new jsume JSON files.

| Flag | Description |
|------|-------------|
| `-e, --example` | Populate the file with example content |
| `-r, --recursive` | Create parent directories if they don't exist |

```bash
jsume new                               # creates jsume.json
jsume new resume.jsume.json -e          # creates with example content
jsume new -e -r path/to/resume.json     # with recursive directory creation
```

### `jsume validate [files...]` (alias: `v`)

Validate jsume files against the schema. Auto-discovers `*.jsume.json` and `jsume.json` if no files are specified.

| Flag | Description |
|------|-------------|
| `-z, --zod` | Validate using Zod only |
| `-j, --jsonschema` | Validate using JSON Schema (AJV) only |

```bash
jsume validate                          # auto-discover and validate all jsume files
jsume validate my-resume.jsume.json
jsume validate file.json -z             # Zod only
jsume validate file.json -j             # JSON Schema only
```

## Schema

A jsume file has the following top-level structure:

```json
{
  "$schema": "https://unpkg.com/@jsume/schemas/dist/draft-2020-12.json",
  "basics": { "name": "John Doe" },
  "work": [],
  "projects": [],
  "publications": [],
  "education": [],
  "certificates": [],
  "awards": [],
  "skills": [],
  "languages": []
}
```

Only `basics.name` is required; all other sections are optional.

**Date format** — dates can be ISO 8601 strings or structured objects:

```json
{ "year": 2023, "month": 1, "day": 15 }
```

Use `false` as an `endDate` to indicate an ongoing position/project.

## Using `@jsume/schemas` as a Library

```ts
import type { Jsume } from '@jsume/schemas'
import { jsumeSchema } from '@jsume/schemas'

const result = jsumeSchema.safeParse(data)
```

JSON Schema (for AJV or editor validation):

```json
{
  "$schema": "https://unpkg.com/@jsume/schemas/dist/draft-2020-12.json"
}
```

Available drafts: `draft-7.json`, `draft-2020-12.json`.

## Ecosystem

### [jsume-typst](https://github.com/jsume/jsume-typst)

A [Typst](https://typst.app) template that turns a jsume JSON file into a beautifully typeset PDF résumé. It is published on the [Typst Universe](https://typst.app/universe/package/jsume) as `@preview/jsume`.

**Workflow:**

```
jsume new resume.jsume.json --example   # 1. Create & edit your data file
jsume validate resume.jsume.json        # 2. Validate it
typst compile resume.typ                # 3. Generate the PDF
```

**`resume.typ`:**

```typst
#import "@preview/jsume:0.1.0": *

#show: jsume.with(
  lang: "en-US",
  jsume-data: json("resume.jsume.json"),
)
```

Supported languages: `en-US`, `zh-CN`, `zh-HK`, `zh-TW`, `ja-JP`, `es-ES`, `fr-FR`, `de-DE`, `ru-RU`, `ko-KR`.

You can also customise paper size, margins, and fonts:

```typst
#show: jsume.with(
  lang: "zh-CN",
  jsume-data: json("resume.jsume.json"),
  paper: "a4",
  font: "Noto Serif CJK SC",
  font-size: 11pt,
)
```

## License

[MIT](./LICENSE) License &copy; 2025-PRESENT [Moozon Wei](https://github.com/moo-w)
