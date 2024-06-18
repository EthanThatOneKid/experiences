import { test } from "@std/front-matter";
import { extract } from "@std/front-matter/any";

export interface ExperienceAttrs {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  highlights: string[];
  labels: string[];
  url: string[];
}

export interface Experience {
  id: string;
  md: string;
  attrs?: ExperienceAttrs;
}

export function parseExperience(filename: string, md: string): Experience {
  const id = filename.replace(/\.md$/, "");
  if (!test(md)) {
    return { id, md };
  }

  const extracted = extract<ExperienceAttrs>(md);
  return {
    id,
    md: extracted.body,
    attrs: extracted.attrs,
  };
}
