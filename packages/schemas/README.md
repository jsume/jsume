# @jsume/schemas

[![npm version][ver-img-src]][pkg-href]
[![npm downloads][dls-img-src]][pkg-href]

Zod schema and JSON schema for Jsume.

If you want to use Zod schema, you can import them like this:

```js
import { jsumeSchema } from '@jsume/schemas'
```

Import individual schemas:

```js
import {
  awardsSchema,
  basicsSchema,
  certificatesSchema,
  educationSchema,
  languagesSchema,
  projectsSchema,
  publicationsSchema,
  skillsSchema,
  workSchema
} from '@jsume/schemas'
```

You can also import JSON schema:

```js
import jsonSchema7 from '@jsume/schemas/draft-7.json'
import jsonSchema2020 from '@jsume/schemas/draft-2020-12.json'
```

## Schema Details

<details>
<summary>Structure of the schema</summary>

<br>

```
jsume.json
├── basics
│   ├── name
│   ├── label
│   ├── image
│   ├── email
│   ├── phone
│   ├── url
│   ├── summary
│   ├── location
│   └── profiles
├── work
│   ├── company
│   ├── positon
│   ├── website
│   ├── location
│   ├── startDate
│   ├── endDate
│   ├── summary
│   └── highlights
├── projects
│   ├── name
│   ├── summary
│   ├── description
│   ├── githubUrl
│   ├── website
│   └── keywords
├── publications
│   ├── name
│   ├── releaseDate
│   ├── publisher
│   ├── summary
│   └── url
├── education
│   ├── institution
│   ├── description
│   ├── major
│   ├── degree
│   ├── location
│   ├── startDate
│   ├── endDate
│   ├── activities
│   ├── gpa
│   └── courses
├── certificates
│   ├── name
│   ├── issueDate
│   ├── expDate
│   ├── issuer
│   └── url
├── awards
│   ├── title
│   ├── summary
│   ├── description
│   ├── awarder
│   └── date
├── skills
│   ├── name
│   └── keywords
└── languages
    ├── language
    └── fluency
```

</details>

### Jsume Schema

There are some special data types in the schema that you should be aware of at the beginning:

<details>
<summary>TOC</summary>

<br>

1. [basics](#basics)
2. [work](#work)
3. [projects](#projects)
4. [publications](#publications)
5. [education](#education)
6. [certificates](#certificates)
7. [awards](#awards)
8. [skills](#skills)
9. [languages](#languages)

</details>

1. #### basics

    Basic information about yourself.

    | property | type | required | desc | e.g. |
    |:---:|:---:|:---:|---|---|
    | name | `string` | ✅ | Your name | `"John Doe"` |
    | label | `string` | ❌ | Your professional label or title | `"Software Engineer"` |
    | image | `url` | ❌ | URL to your profile image | `"https://example.com/profile.jpg"` |
    | email | `email` | ❌ | Your email address | `"john@example.com"` |
    | phone | `string` | ❌ | Your phone number | `"(912) 555-4321"` |
    | url | `url` | ❌ | URL to your website or portfolio | `"https://johndoe.com"` |
    | summary | `string` | ❌ | Write a short 2-3 sentence biography about yourself | `"I am John Doe, a software engineer with 5 years of experience in web development..."` |
    | location | `location` | ❌ | Your current location | `"United States"` , `{"city": "New York", "country": "United States"}` |
    | profiles | `object` | ❌ | Specify any number of social networks that you participate in | `{"network": "X/Twitter", "username": "john", "url": "https://x.com/john"}` |

    <details>
    <summary>Example</summary>

    ```json
    {
      "name": "John Doe",
      "label": "Software Engineer",
      "image": "https://example.com/profile.jpg",
      "email": "john@example.com",
      "phone": "(912) 555-4321",
      "url": "https://johndoe.com",
      "summary": "I am John Doe, a software engineer with 5 years of experience in web development...",
      "location": {
        "city": "New York",
        "country": "United States"
      },
      "profiles": [
        {
          "network": "X/Twitter",
          "username": "john",
          "url": "https://x.com/john"
        }
      ]
    }
    ```

    </details>

2. #### work

    List of your working experiences.

    | property | type | required | desc | e.g. |
    |:---:|:---:|:---:|---|---|
    | company | `string` | ✅ | Company name | `"Then Company"` |
    | location | `location` | ❌ | Where you worked or where the company is located | `"Remote"` , `{"city": "New York", "country": "United States"}` |
    | position | `string` | ✅ | Your position at the company | `"Software Engineer"` |
    | website | `url` | ❌| URL to the company website | `"https://company.com"` |
    | startDate | `date` | ✅ | Start date of your employment at the company | `{"year": 2023, "month": 1}` , `{"year": 2023, "month": 1, "day": 1}` |
    | endDate | `fales` or `date` | ✅| End date of your employment at the company. If you are still working there, set this to false | `false` , `{"year": 2023, "month": 1}` |
    | summary | `string` | ❌ | Give an overview of your responsibilities at the company | `"Here is the summary of my work..."` |
    | highlights | `array` | ❌ | List of highlights or achievements during your time at the company | `["Highlight 1", "Highlight 2"]` |

    <details>
    <summary>Example</summary>

    ```json
    [{
      "company": "The Company",
      "location": "Remote",
      "position": "Software Engineer",
      "website": "https://company.com",
      "startDate": {
        "year": 2023,
        "month": 1
      },
      "endDate": false,
      "summary": "Here is the summary of my work...",
      "highlights": [
        "Highlight 1",
        "Highlight 2"
      ]
    }]
    ```

    </details>

3. #### projects

    List your projects and personal work experience, including open source contributions and side projects.

    | property | type | required | desc | e.g. |
    |:---:|:---:|:---:|---|---|
    | name | `string` | ✅ | Project name | `"My First Project"` |
    | website | `url` | ❌ | Url to the project website | `"https://projects.johndoe.com/my-first-project"` |
    | githubUrl | `githubUrl` | ❌ | URL to the project  repository on GitHub | `"https://github.com/johndoe/my-first-project-repo"` |
    | startDate | `date` | ✅* | Start date of the project | `{"year": 2023, "month": 1}` |
    | endDate | `fales` or `date` | ✅*| End date of the project, or false if the project is ongoing | `false` , `{"year": 2023, "month": 1}` |
    | summary | `string` | ❌ | Give an overview of your project | `"Here is the summary of my project..."` |
    | highlights | `array` | ❌ | Specify multiple accomplishments | `["Highlight 1", "Highlight 2"]` |

    > `startDate` and `endDate` are dependent required fields.

    <details>
    <summary>Example</summary>

    ```json
    [{
      "name": "Project",
      "website": "https://project.com",
      "githubUrl": "https://github.com/johndoe/reponame",
      "startDate": {
        "year": 2023,
        "month": 1
      },
      "endDate": false,
      "summary": "Here is the summary of my project...",
      "highlights": [
        "Highlight 1",
        "Highlight 2"
      ]
    }]
    ```

    </details>

4. #### publications

    Specify your publications through your career.

    | property | type | required | desc | e.g. |
    |:---:|:---:|:---:|---|---|
    | name | `string` | ✅ | Name of the publication | `"The World Wide Web"` |
    | releaseDate | `date` | ✅ | Date when the publication released | `{"year": 2023, "month": 1}` |
    | publisher | `string` | ❌ | Name of the publisher or organization that released the publications | `"IEEE, Computer Magazine"` |
    | summary | `string` | ❌ | Short summary of publication | `"Discussion of the World Wide Web, HTTP, HTML."` |
    | url | `url` | ❌| URL to the publication | `"https://www.computer.org.example.com/csdl/mags/co/1996/10/rx069-abs.html"` |

    > `startDate` and `endDate` are dependent required fields.

    <details>
    <summary>Example</summary>

    ```json
    [{
      "name": "The World Wide Web",
      "releaseDate": {
        "year": 2023,
        "month": 1
      },
      "publisher": "IEEE, Computer Magazine",
      "summary": "Discussion of the World Wide Web, HTTP, HTML.",
      "url": "https://www.computer.org.example.com/csdl/mags/co/1996/10/rx069-abs.html"
    }]
    ```

    </details>

5. #### education

    List of your educations.

    | property | type | required | desc | e.g. |
    |:---:|:---:|:---:|---|---|
    | institution | `string` | ✅ | Institution name | `"University of Example"` |
    | location | `location` | ❌ | Where the institution is located or where you studied | `"United States"` , `{"city": "New York", "country": "United States"}` |
    | major | `string` | ✅ | Field of study or major | `"Computer Science"` |
    | degree | `string` | ✅ | Degree obtained or pursued | `"Bachelor of Science"` |
    | gpa | `number` | ❌ | Grade Point Average (GPA) | `3.8` |
    | startDate | `date` | ✅ | Start date of the education period | `{"year": 2023, "month": 1}` |
    | endDate | `fales` or `date` | ✅ | End date of the education period, or false if currently studying there | `false` , `{"year": 2023, "month": 1}` |
    | activities | `array` | ❌ | Specify multiple activities you participated in during your education | `["Activity 1", "Activity 2"]` |
    | courses | `array` | ❌ | Specify multiple relevant courses you took during your education | `["Course 1", "Course 2"]` |

    <details>
    <summary>Example</summary>

    ```json
    [{
      "institution": "University of Example",
      "location": "Online",
      "major": "Computer Science",
      "degree": "Bachelor of Science",
      "gpa": 3.8,
      "startDate": {
        "year": 2023,
        "month": 1
      },
      "endDate": {
        "year": 2023,
        "month": 1
      },
      "activities": [
        "Activity 1",
        "Activity 2"
      ],
      "courses": [
        "Course 1",
        "Course 2"
      ]
    }]
    ```

    </details>

6. #### certificates

    Specify any certificates you have received throughout your professional career.

    | property | type | required | desc | e.g. |
    |:---:|:---:|:---:|---|---|
    | name | `string` | ✅ | Name of the certificate | `"Certified Kubernetes Administrator"` |
    | issueDate | `date` | ✅ | Date when the certificate was received | `{"year": 2023, "month": 1}` |
    | expDate | `fales` or `date` | ✅ | Expiration date of the certificate, or false if it does not expire | `false` , `{"year": 2023, "month": 1}` |
    | issuer | `string` | ✅ | Organization or individual who granted the certificate | `"CNCF"` |
    | url | `url` | ❌ | URL to the certificate or credential | `"https://www.youracclaim.com/badges/xxxx"` |

    <details>
    <summary>Example</summary>

    ```json
    [{
      "name": "Certified Kubernetes Administrator",
      "issueDate": {
        "year": 2023,
        "month": 1
      },
      "expDate": false,
      "issuer": "CNCF",
      "url": "https://www.youracclaim.com/badges/xxxx"
    }]
    ```

    </details>

7. #### awards

    List of your awards or honors.

    | property | type | required | desc | e.g. |
    |:---:|:---:|:---:|---|---|
    | title | `string` | ✅ | The title of the award or honor | `"Employee of the month"` |
    | date | `date` | ✅ | Date when the award or honor was received | `{"year": 2023, "month": 1, "day": 1}` |
    | awarder | `string` | ✅ | Organization or individual who granted the award or honor | `"Tech Company Inc."` |
    | summary | `string` | ✅ | Summary of the award or honor | `"Awarded for outstanding performance and dedication to the team."` |
    | description | `string` | ❌ | Detailed description of the award or honor | `"I play a key role in the team and help the team achieve its goals..."` |

    <details>
    <summary>Example</summary>

    ```json
    [{
      "title": "Employee of the month",
      "date": {
        "year": 2023,
        "month": 1,
        "day": 1
      },
      "awarder": "Tech Company Inc.",
      "summary": "Awarded for outstanding performance and dedication to the team.",
      "description": "I play a key role in the team and help the team achieve its goals..."
    }]
    ```

    </details>

8. #### skills

    List of your skills.

    | property | type | required | desc | e.g. |
    |:---:|:---:|:---:|---|---|
    | name | `string` | ✅ | Name of the skill | `"Frontend"` |
    | keywords | `array` | ✅ | List of keywords related to the skill | `["JavaScript", "React", "Vue"]` |

    <details>
    <summary>Example</summary>

    ```json
    [{
      "name": "Frontend",
      "keywords": [
        "JavaScript",
        "React",
        "Vue"
      ]
    }]
    ```

    </details>

9. #### languages

    List the languages you speak.

    | property | type | required | desc | e.g. |
    |:---:|:---:|:---:|---|---|
    | language | `string` | ✅ | Language name | `"English"` |
    | fluency | `string`* | ✅ | Fluency level | `"Fluent"` |

    <details>
    <summary>Example</summary>

    ```json
    [
      {
        "language": "English",
        "fluency": "Fluent"
      },
      {
        "language": "Chinese",
        "fluency": "Native"
      }
    ]
    ```

    </details>

<!-- Badges -->

[ver-img-src]: <https://img.shields.io/npm/v/%40jsume%2Fschemas> "npm version image"
[dls-img-src]: <https://img.shields.io/npm/dm/%40jsume%2Fschemas> "npm version image"
[pkg-href]: <https://npmjs.com/package/@jsume/schemas> "npm packge page"
