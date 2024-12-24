import React from "react";
import Link from "next/link";
import Image from "next/image";
import { highlight } from "sugar-high";
import { renderMDX } from "@/lib/mdx-utils";

function Table({ data }) {
  let headers = data.headers.map((header, index) => (
    <th
      key={index}
      className="px-4 py-2 border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800"
    >
      {header}
    </th>
  ));
  let rows = data.rows.map((row, index) => (
    <tr key={index} className="border-b border-slate-200 dark:border-slate-700">
      {row.map((cell, cellIndex) => (
        <td
          key={cellIndex}
          className="px-4 py-2 border-r border-slate-200 dark:border-slate-700"
        >
          {cell}
        </td>
      ))}
    </tr>
  ));

  return (
    <div className="overflow-x-auto">
      <table className="w-full mb-4 border border-slate-300 dark:border-slate-700">
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

function CustomLink(props) {
  let href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link
        href={href}
        {...props}
        className="text-orange-500 hover:text-orange-600 transition-colors duration-200"
      >
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a
        {...props}
        className="text-orange-500 hover:text-orange-600 transition-colors duration-200"
        href={href}
      >
        {props.children}
      </a>
    );
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      {...props}
      className="text-orange-500 hover:text-orange-600 transition-colors duration-200"
      href={href}
    >
      {props.children}
    </a>
  );
}

function RoundedImage(props) {
  return (
    <div className="w-full flex justify-center">
      <Image
        alt={props.alt}
        className="rounded-lg max-w-full !my-6"
        width={props.width || 800}
        height={props.height || 400}
        {...props}
      />
    </div>
  );
}

function Callout(props) {
  return (
    <div className="px-4 py-3 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-lg p-4 flex items-center text-slate-900 dark:text-slate-50 mb-8">
      <div className="flex items-center w-8 mr-4">{props.emoji}</div>
      <div className="w-full">{props.children}</div>
    </div>
  );
}

function ProsCard({ title, pros }) {
  return (
    <div className="border border-emerald-200 dark:border-emerald-900 bg-slate-50 dark:bg-slate-900 rounded-xl p-6 my-4 w-full">
      <span className="font-semibold text-slate-800 dark:text-slate-200">{`You might use ${title} if...`}</span>
      <div className="mt-4">
        {pros.map((pro) => (
          <div
            key={pro}
            className="flex font-medium items-baseline mb-2 text-slate-700 dark:text-slate-300"
          >
            <div className="h-4 w-4 mr-2">
              <svg className="h-4 w-4 text-emerald-500" viewBox="0 0 24 24">
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </g>
              </svg>
            </div>
            <span>{pro}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConsCard({ title, cons }) {
  return (
    <div className="border border-red-200 dark:border-red-900 bg-slate-50 dark:bg-slate-900 rounded-xl p-6 my-6 w-full">
      <span className="font-semibold text-slate-800 dark:text-slate-200">{`You might not use ${title} if...`}</span>
      <div className="mt-4">
        {cons.map((con) => (
          <div
            key={con}
            className="flex font-medium items-baseline mb-2 text-slate-700 dark:text-slate-300"
          >
            <div className="h-4 w-4 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-red-500"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </div>
            <span>{con}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Code({ children, className }) {
  const language = className ? className.replace(/language-/, "") : "";
  const isInline = typeof children === "string" && !children.includes("\n");

  if (isInline) {
    return <code className={className}>{children}</code>;
  }

  const codeString = Array.isArray(children)
    ? children.join("")
    : children || "";
  const highlightedCode = highlight(codeString);

  return <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />;
}

function slugify(str) {
  if (str == null) return "";
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

function Paragraph({ children }) {
  return (
    <p className="mb-4 text-slate-800 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
      {children}
    </p>
  );
}

function createHeading(level) {
  return ({ children }) => {
    const headingText = React.Children.toArray(children).join("");
    let slug = slugify(headingText);
    return React.createElement(
      `h${level}`,
      {
        id: slug,
        className: `text-slate-900 dark:text-slate-50 font-bold tracking-tight mt-8 mb-4 ${
          level === 1
            ? "text-3xl"
            : level === 2
              ? "text-2xl"
              : level === 3
                ? "text-xl"
                : "text-lg"
        }`,
      },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className:
            "anchor absolute invisible no-underline ml-[-1em] pr-2 cursor-pointer hover:visible",
        }),
      ],
      children,
    );
  };
}

function UnorderedList({ children }) {
  return (
    <ul className="list-disc pl-8 mb-4 text-slate-800 dark:text-slate-300 space-y-2">
      {children}
    </ul>
  );
}

function OrderedList({ children }) {
  return (
    <ol className="list-decimal pl-8 mb-4 text-slate-800 dark:text-slate-300 space-y-2">
      {children}
    </ol>
  );
}

function ListItem({ children }) {
  return <li className="pl-2">{children}</li>;
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  Callout,
  ProsCard,
  ConsCard,
  code: Code,
  Table,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  p: Paragraph,
};

export function CustomMDX({ source }) {
  return renderMDX(source);
}

export { components };
