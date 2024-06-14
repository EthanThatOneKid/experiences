import { join } from "@std/path";
import { copy } from "@std/fs";
import { parseArgs } from "@std/cli";
import type { Project } from "#/lib/projects/mod.ts";
import {
  renderProjectPageHTML,
  renderProjectsPageHTML,
  walkProjects,
} from "#/lib/projects/mod.ts";

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

  // Create projects directory if it does not exist.
  await Deno.mkdir(join(flags.outdir, "projects"), { recursive: true });

  // Render projects assets.
  const projects: Project[] = [];
  for await (
    const project of walkProjects(join(flags.indir, "projects", "*.md"))
  ) {
    projects.push(project);
    const html = renderProjectPageHTML(project, flags["base-url"]);
    await Deno.writeTextFile(
      join(flags.outdir, "projects", `${project.id}.html`),
      html,
    );
    const json = JSON.stringify(project, null, 2);
    await Deno.writeTextFile(
      join(flags.outdir, "projects", `${project.id}.json`),
      json,
    );
  }

  // Render index page.
  const projectsIndexHTML = await renderProjectsPageHTML(projects);
  await Deno.writeTextFile(
    join(flags.outdir, "index.html"),
    projectsIndexHTML,
  );

  // Copy contents of static directory to outdir.
  await copy(flags.staticdir, flags.outdir, { overwrite: true });
}
