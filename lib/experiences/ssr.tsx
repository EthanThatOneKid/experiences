import { render } from "@deno/gfm";
import {
  A,
  ARTICLE,
  B,
  FOOTER,
  LI,
  MAIN,
  META,
  TABLE,
  TD,
  TH,
  TITLE,
  TR,
  UL,
} from "@fartlabs/htx";
import { TextNode } from "@fartlabs/htx/special";
import { withLayout } from "#/lib/shared/layout/mod.ts";
import { PageHeading } from "#/lib/shared/page_heading/mod.ts";
import type { Experience } from "./experiences.ts";

function ExperienceMetadataTableComponent(props: { experience: Experience }) {
  return (
    <TABLE>
      <TR>
        <TD colspan="2">
          <B>Metadata</B>
        </TD>
      </TR>

      {props.experience.attrs?.title && (
        <TR>
          <TD>Title</TD>
          <TD>{props.experience.attrs.title}</TD>
        </TR>
      )}

      {props.experience.attrs?.highlights && (
        <TR>
          <TD>Highlights</TD>
          <TD>
            <UL>
              {props.experience.attrs.highlights.map((highlight) => (
                <LI>{highlight}</LI>
              )).join("")}
            </UL>
          </TD>
        </TR>
      )}

      {props.experience.attrs?.labels?.length && (
        <TR>
          <TD>Labels</TD>
          <TD>{props.experience.attrs.labels.join(", ")}</TD>
        </TR>
      )}

      {props.experience.attrs?.url && (
        <TR>
          <TD>URLs</TD>
          <TD>
            <UL>
              {props.experience.attrs.url.map((url) => (
                <LI>
                  <A href={url}>{url}</A>
                </LI>
              )).join("")}
            </UL>
          </TD>
        </TR>
      )}
    </TABLE>
  );
}

function ExperiencePageComponent(
  props: { baseURL: string; experience: Experience },
) {
  const html = render(props.experience.md, { baseUrl: props.baseURL });
  return (
    <MAIN>
      <ARTICLE class="markdown-body">{html}</ARTICLE>

      <ExperienceMetadataTableComponent experience={props.experience} />

      <FOOTER>
        <A href="..">↩ Experiences</A>
      </FOOTER>
    </MAIN>
  );
}

function ExperiencesTableComponent(props: { experiences: Experience[] }) {
  return (
    <TABLE>
      <TR>
        <TH>Title</TH>
        <TH>Labels</TH>
      </TR>
      {props.experiences.map((experience) => (
        <TR>
          <TD>
            <A href={`${experience.id}.html`}>
              {experience.attrs?.title}
            </A>
          </TD>
          <TD>{experience.attrs?.labels?.join(", ")}</TD>
        </TR>
      )).join("")}
    </TABLE>
  );
}

export function ExperiencesPageComponent(props: { experiences: Experience[] }) {
  return (
    <MAIN>
      <PageHeading title="experiences" />
      <ExperiencesTableComponent experiences={props.experiences} />
    </MAIN>
  );
}

export function renderExperiencesPageHTML(experiences: Experience[]) {
  return withLayout(
    <TextNode>
      <TITLE>Experiences | Ethan Davidson</TITLE>
      <META
        name="description"
        content="List of Ethan Davidson's experiences."
      />
    </TextNode>,
    <ExperiencesPageComponent experiences={experiences} />,
  );
}

export function renderExperiencePageHTML(
  experience: Experience,
  baseURL = "/",
) {
  return withLayout(
    <TextNode>
      <TITLE>
        {experience.attrs?.title} | Ethan Davidson
      </TITLE>
      <META name="description" content="An Ethan Davidson experience." />
    </TextNode>,
    <ExperiencePageComponent experience={experience} baseURL={baseURL} />,
  );
}
