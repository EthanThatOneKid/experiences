import { A, H1, STRONG } from "@fartlabs/htx";

export function PageHeading(props: { title: string }) {
  return (
    <H1>
      <A href="https://acmcsuf.com/teams#oss">
        <STRONG style="color: #21d19f;">Open Source Software</STRONG>
      </A>{" "}
      {props.title}
    </H1>
  );
}
