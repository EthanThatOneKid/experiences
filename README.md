# Experiences

This is a static documentation site for the professional experiences of the user
[**@EthanThatOneKid**](https://github.com/EthanThatOneKid).

Ethan is the founder of communities such as
[**@FartLabs**](https://github.com/FartLabs),
[**@acmcsufoss**](https://github.com/acmcsufoss), and
[**@vaqcoders**](https://github.com/vaqcoders).

The [website](https://ethanthatonekid.github.io/experiences) enables visitors to
view Ethan's projects, workshops, and other professional experiences.

## Contributing

If you would like to contribute to the documentation, the markdown files are
located in the `experiences` directory. One markdown file represents one
experience. The file name should be a project ID with the `.md` extension.

```md
---
title: "acmcsuf.com"
repository: "https://acmcsuf.com/code"
participants: ["@EthanThatOneKid"]
labels: ["svelte", "typescript"]
---

# acmcsuf.com

## Description

Official website of CSUF's ACM club.
```

## Development

Make sure to install Deno:
<https://deno.land/manual/getting_started/installation>.

Build the project:

```sh
deno task generate
```

Build the project in development mode:

```sh
deno task watch
```

Serve the static site:

```sh
deno task serve
```

Format the project:

```sh
deno fmt
```

Check for common errors:

```sh
deno lint
deno task check
```

## References

- <https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax>

---

Documented with ❤️ by [**@EthanThatOneKid**](https://github.com/EthanThatOneKid)
