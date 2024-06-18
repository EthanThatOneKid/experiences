import { expandGlob } from "@std/fs";
import { parseExperience } from "./experiences.ts";

export async function* walkExperiences(glob: string | URL) {
  for await (const stat of expandGlob(glob)) {
    const md = await Deno.readTextFile(stat.path);
    yield parseExperience(stat.name, md);
  }
}
