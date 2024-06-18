import { join } from "@std/path";
import { copy } from "@std/fs";
import { parseArgs } from "@std/cli";
import type { Experience } from "#/lib/experiences/mod.ts";
import {
  renderExperiencePageHTML,
  renderExperiencesPageHTML,
  walkExperiences,
} from "#/lib/experiences/mod.ts";

if (import.meta.main) {
  await main(Deno.args);
}

// Build script for generating static site from markdown files
// in the projects directory.
async function main(args: string[]) {
  const flags = parseArgs(args, {
    string: ["indir", "outdir", "staticdir", "base-url"],
    alias: {
      indir: ["i"],
      outdir: ["o"],
      staticdir: ["s"],
    },
    default: {
      indir: "./",
      outdir: "generated",
      staticdir: "static",
    },
  });

  // Render experiences hypermedia.
  const experiences: Experience[] = [];
  for await (
    const experience of walkExperiences(
      join(flags.indir, "experiences", "*.md"),
    )
  ) {
    experiences.push(experience);
    await Deno.writeTextFile(
      join(flags.outdir, `${experience.id}.html`),
      renderExperiencePageHTML(experience, flags["base-url"]),
    );
    await Deno.writeTextFile(
      join(flags.outdir, `${experience.id}.json`),
      JSON.stringify(experience, null, 2),
    );
  }

  // Render experiences JSON.
  await Deno.writeTextFile(
    join(flags.outdir, "experiences.json"),
    JSON.stringify(experiences, null, 2),
  );

  // Render index page.
  const experiencesIndexHTML = await renderExperiencesPageHTML(experiences);
  await Deno.writeTextFile(
    join(flags.outdir, "index.html"),
    experiencesIndexHTML,
  );

  // Copy contents of static directory to outdir.
  await copy(flags.staticdir, flags.outdir, { overwrite: true });
}
