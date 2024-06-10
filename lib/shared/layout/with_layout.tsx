import { BODY, HEAD, HTML, LINK, META, STYLE } from "@fartlabs/htx";

export function withLayout(head: string, slot: string) {
  return `<!DOCTYPE html>` + (
    <HTML>
      <HEAD>
        <META charset="UTF-8" />
        <META name="viewport" content="width=device-width, initial-scale=1.0" />
        <LINK
          rel="stylesheet"
          type="text/css"
          href="https://ethanthatonekid.github.io/dropin-minimal-css/min/hack.min.css"
        />
        <STYLE>{`html, body { margin: auto 2em; padding: 0; }`}</STYLE>
        {head}
      </HEAD>
      <BODY>{slot}</BODY>
    </HTML>
  );
}
