import { A, H1, STRONG } from "@fartlabs/htx";

export function PageHeading(props: { title: string }) {
  return (
    <H1>
      <A href="https://etok.codes/">
        <STRONG style="color: #21d19f;">Ethan Davidson</STRONG>
      </A>{" "}
      {props.title}
    </H1>
  );
}
