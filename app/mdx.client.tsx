import { runSync } from "xdm";
import * as runtime from "react/jsx-runtime";

export default function runMarkdown(mdx: string, components: any) {
  return runSync(mdx, {
    ...runtime,
    components,
  });
}
