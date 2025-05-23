import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,

    b: (props) => (
      <strong {...props} className="text-white">
        {props.children}
      </strong>
    ),
    strong: (props) => (
      <strong {...props} className="text-white">
        {props.children}
      </strong>
    ),
    pre: (props) => <pre {...props} className="bg-neutral-900" />,

    a: (props) => (
      <a {...props} className="text-blue-400 hover:text-blue-500">
        {props.children}
      </a>
    ),

    code: (props) => (
      <code {...props} className="rounded-md bg-transparent text-white">
        {props.children}
      </code>
    ),

    hr: (props) => <hr {...props} className="border-neutral-700" />,
  };
}
