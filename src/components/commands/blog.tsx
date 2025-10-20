import { JSX, useEffect, useState } from "react";
import Image from "next/image";
import { iconMap } from "./iconMap";
import { LuClock2 } from "react-icons/lu";


import MarkdownViewer from "../markdownViewer";
import { GITHUB_ALL_BLOGS_URL, GITHUB_MARKDOWN_URL } from "@/config";

function getCategoryIcon(name: string) {
  const entry = iconMap[name];
  if (!entry) return null;

  const Icon = entry.icon;
  const color = entry.color;

  return <Icon color={color} />;
}
interface blogI {
  name: string;
  desc: string;
  img: string;
  categories: string[];
  date: string;
}

export default function BlogCommand({
  args,
  onLoadEnd,
  setInputVal,
}: {
  args?: string;
  onLoadEnd?: () => void;
  setInputVal: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  const [fileText, setfileText] = useState<string | null>(null);
  const [blog, setBlog] = useState<blogI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${GITHUB_ALL_BLOGS_URL}`)
      .then((res) => {
        if (!res.ok) {
          setBlog([]);
          setLoading(false);
          return Promise.reject();
        }
        return res.json();
      })
      .then((data) => {
        setBlog(data);

        if (args) {
          const found = data.some(
            (blog: { name: string }) =>
              blog.name.toLowerCase() === args.toLowerCase(),
          );

          if (!found) {
            setfileText(null);
            setLoading(false);
            return;
          }

          fetch(`${GITHUB_MARKDOWN_URL}/blogs/${args}.md?nocache=1`)
            .then((res) => {
              if (!res.ok) {
                setLoading(false);
                return Promise.reject();
              }
              return res.text();
            })
            .then((text) => {
              setfileText(text);
              setLoading(false);
              setTimeout(() => {
                onLoadEnd?.();
              }, 30);
            })
            .catch(() => {
              setfileText(null);
              setLoading(false);
            });
        } else {
          setLoading(false);
          setTimeout(() => {
            onLoadEnd?.();
          }, 30);
        }
      })
      .catch(() => {
        setfileText(null);
        setLoading(false);
      });
  }, [args, onLoadEnd]);

  if (!args) {
    if (blog.length > 0) {
      return (
        <>
          <h1 className="font-bold mb-6 text-yellow-400 flex items-center gap-2">
            📂 {blog.length} blogs found:
          </h1>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mr-4">
            {blog.map((blog, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setInputVal(`blog ${blog.name}`)}
                  className="relative rounded-lg border-2 border-dashed border-[#be8d84]/40 bg-[#1e1e1e] shadow-md overflow-hidden hover:border-[#be8d84]/80 hover:scale-[1.005] transition-all cursor-pointer"
                  style={{ height: "300px" }}
                >
                  <Image
                    src={blog.img}
                    alt={`Image of ${blog.name}`}
                    fill
                    priority
                    sizes="100%"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />

                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(0,0,0,0), rgba(190, 141, 132, 0.1) 60%, rgba(190, 141, 132, 0.5) 100%)",
                      backdropFilter: "blur(5px) brightness(90%)",
                      WebkitBackdropFilter: "blur(5px)  brightness(90%)",
                    }}
                  />

                  <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center p-4 text-center">
                    <h2 className="font-bold text-3xl text-white">
                      {blog.name}
                    </h2>
                    <p className="mt-2 text-base text-white">{blog.desc}</p>

                    <div className="mt-2 flex flex-wrap justify-center gap-2">
                      {blog.categories.map((category) => (
                        <span
                          key={category}
                          className="flex items-center gap-1 text-sm bg-white/10 text-white px-2 py-1 rounded"
                        >
                          {getCategoryIcon(category)} {category}
                        </span>
                      ))}
                    </div>

                  </div>

                  {blog.date && (
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full font-mono tracking-wide bg-gray-200/10 flex flex-row gap-1  items-center">
                      <LuClock2 size={20} />

                      {blog.date}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <p className="mt-2">
            Type <span className="blue-output">blog &lt;name&gt;</span> to
            view details.
          </p>
        </>
      );
    } else {
      return <span>Error, no blog found.</span>;
    }
  }

  if (fileText !== null) {
    return (
          <MarkdownViewer markdownContent={fileText} />
        );
  }

  if (!loading) {
    return <span>No blog : {args}</span>;
  }

  if (!args) {
    return <span>fetching blogs...</span>;
  } else {
    return <span>Loading {args}...</span>;
  }
}
