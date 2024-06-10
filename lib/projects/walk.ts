import { expandGlob } from "@std/fs";
import { parseProject } from "./projects.ts";

export async function* walkProjects(glob: string | URL) {
  for await (const stat of expandGlob(glob)) {
    const md = await Deno.readTextFile(stat.path);
    yield parseProject(stat.name, md);
  }
}
