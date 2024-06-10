import { A, B, LI, TABLE, TD, TH, TR, UL } from "@fartlabs/htx";
import { render } from "@deno/gfm";
import { withLayout } from "#/lib/shared/layout/mod.ts";
import { PageHeading } from "#/lib/shared/page_heading/mod.ts";
import type { Project } from "./projects.ts";

/**
 * makeRepositoryURL returns a URL for the given repository.
 * The given repository string may be a URL or a repository name.
 * If the given repository is a URL, it is returned as is.
 * If the given repository is a repository name, it is converted to a URL
 * by assuming the repository is owned by the acmcsufoss organization.
 */
function makeRepositoryURL(repository: string) {
  if (repository.startsWith("https://")) {
    return repository;
  }

  return `https://github.com/acmcsufoss/${repository}`;
}

function ParticipantComponent(props: { participant: string }) {
  if (props.participant.startsWith("@")) {
    const url = `https://github.com/${props.participant.slice(1)}`;
    return <A href={url}>{props.participant}</A>;
  }

  return props.participant;
}

function ParticipantsComponent(props: { participants: string[] }) {
  return (
    <UL>
      {props.participants.map((participant) => (
        <LI>
          <ParticipantComponent participant={participant} />
        </LI>
      ))}
    </UL>
  );
}

function GitHubRepositoryComponent(props: { repository: string }) {
  return (
    <A
      href={makeRepositoryURL(props.repository)}
    >
      {makeRepositoryURL(props.repository)}
    </A>
  );
}

function ProjectMetadataTableComponent(props: { project: Project }) {
  return (
    <TABLE>
      <TR>
        <TD colspan="2">
          <B>Metadata</B>
        </TD>
      </TR>

      {props.project.attrs?.title && (
        <TR>
          <TD>Title</TD>
          <TD>{props.project.attrs.title}</TD>
        </TR>
      )}

      {props.project.attrs?.description && (
        <TR>
          <TD>Description</TD>
          <TD>{props.project.attrs.description}</TD>
        </TR>
      )}

      {props.project.attrs?.labels?.length && (
        <TR>
          <TD>Labels</TD>
          <TD>{props.project.attrs.labels.join(", ")}</TD>
        </TR>
      )}

      {props.project.attrs?.participants?.length && (
        <TR>
          <TD>Participants</TD>
          <TD>
            <ParticipantsComponent
              participants={props.project.attrs.participants}
            />
          </TD>
        </TR>
      )}

      {props.project.attrs?.repository && (
        <TR>
          <TD>GitHub repository</TD>
          <TD>
            <GitHubRepositoryComponent
              repository={props.project.attrs.repository}
            />
          </TD>
        </TR>
      )}
    </TABLE>
  );
}

function ProjectPageComponent(props: { baseURL: string; project: Project }) {
  const html = render(props.project.md, { baseUrl: props.baseURL });
  return (
    <main>
      <Helmet>
        <html lang="en" amp />
        <title>
          {props.project.attrs?.title} - Open Source Software projects
        </title>
        <meta
          name="description"
          content={props.project.attrs?.description}
        />
      </Helmet>

      <article
        class="markdown-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <ProjectMetadataTableComponent project={props.project} />

      <footer>
        <a href="../projects.html">↩ Projects</a>
      </footer>
    </main>
  );
}

function ProjectsTableComponent(props: { projects: Project[] }) {
  return (
    <TABLE>
      <TR>
        <TH>Title</TH>
        <TH>Labels</TH>
        <TH>Participants</TH>
      </TR>
      {props.projects.map((project) => (
        <TR>
          <TD>
            <A href={`projects/${project.id}.html`}>{project.attrs?.title}</A>
          </TD>
          <TD>{project.attrs?.labels?.join(", ")}</TD>
          <TD>{project.attrs?.participants?.length ?? "N/A"}</TD>
        </TR>
      ))}
    </TABLE>
  );
}

export function ProjectsPageComponent(props: { projects: Project[] }) {
  return (
    <main>
      <Helmet>
        <html lang="en" amp />
        <title>Open Source Software projects</title>
        <meta
          name="description"
          content="List of initiatives owned by the Open Source Software team."
        />
      </Helmet>

      <PageHeading title="projects" />
      <ProjectsTableComponent projects={props.projects} />
      <footer>
        <a href="./index.html">↩ Docs</a>
      </footer>
    </main>
  );
}

export function renderProjectsPageHTML(projects: Project[]) {
  return withLayout(<ProjectsPageComponent projects={projects} />);
}

export function renderProjectPageHTML(project: Project, baseURL = "/") {
  return withLayout(
    <ProjectPageComponent project={project} baseURL={baseURL} />,
  );
}
