import { useEffect, useState } from "react";
import { useLoaderData, LoaderFunction } from "remix";
import { compile } from "xdm";
import { useMDXComponents } from "@mdx-js/react";
import runMarkdown from "../mdx.client";
import Counter from "../counter";

export let loader: LoaderFunction = async () => {
  // Source the MDX Markdown from wherever you want here (e.g. database).
  const markdown = `# XDM  
    ### This is Markdown rendered with XDM on a [Cloudflare Pages Function](https://blog.cloudflare.com/cloudflare-pages-goes-full-stack/).  
    You can even import JSX from other files!
    <Counter />`;

  return String(
    await compile(markdown, {
      outputFormat: "function-body",
      format: "mdx",
      providerImportSource: "@mdx-js/react",
    })
  );
};

export default function Markdown() {
  // Get the data from the Remix server.
  const input = useLoaderData();

  // Add all of the custom components you want to use in your MDX here.
  const components = useMDXComponents({ Counter: Counter });

  // useEffect holds the Markdown after rendering.
  let [markdown, setMarkdown] = useState(
    "Loading... enable Javascript if the page doesn't appear."
  );

  useEffect(() => {
    // This all happens in useEffect because otherwise the CF Pages Function runs it, which doesn't support eval().
    const { default: Content } = runMarkdown(input, components);
    setMarkdown(Content);
  }, [input]);

  return markdown;
}
