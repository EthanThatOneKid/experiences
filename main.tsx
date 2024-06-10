import { join } from "@std/path";
import { copy } from "@std/fs";
import { parseArgs } from "@std/cli";
import { TextNode } from "@fartlabs/htx/special";
import { A, LI, MAIN, META, P, STRONG, TITLE, UL } from "@fartlabs/htx";
import type { Project } from "#/lib/projects/mod.ts";
import {
  renderProjectPageHTML,
  renderProjectsPageHTML,
  walkProjects,
} from "#/lib/projects/mod.ts";
import { withLayout } from "#/lib/shared/layout/mod.ts";
import { PageHeading } from "#/lib/shared/page_heading/mod.ts";

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

  const projectsIndexHTML = await renderProjectsPageHTML(projects);
  await Deno.writeTextFile(
    join(flags.outdir, "projects.html"),
    projectsIndexHTML,
  );

  // Copy contents of static directory to outdir.
  await copy(flags.staticdir, flags.outdir, { overwrite: true });

  // Render index page.
  await Deno.writeTextFile(
    `${flags.outdir}/index.html`,
    withLayout(
      <TextNode>
        <TITLE>@EthanThatOneKid Experience</TITLE>
        <META
          name="description"
          content="Ethan's personal experience and projects"
        />
      </TextNode>,
      <MAIN>
        <PageHeading title="docs" />
        <P>
          This is a static documentation site for the{" "}
          <A href="https://github.com/acmcsufoss">
            <STRONG>@acmcsufoss</STRONG>
          </A>{" "}
          organization.
          <UL>
            <LI>
              <A href="projects.html">Projects</A>
            </LI>
          </UL>
        </P>
      </MAIN>,
    ),
  );
}
