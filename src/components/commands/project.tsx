import { JSX, useEffect, useState } from "react";
import Image from "next/image";

interface projectI {
  name: string;
  desc: string;
  img: string;
  link: string;
  status: string;
}

export default function ProjectCommand({
  args,
  onLoadEnd,
}: {
  args?: string;
  onLoadEnd?: () => void;
}): JSX.Element {
  const [fileText, setfileText] = useState<string | null>(null);
  const [projects, setProjects] = useState<projectI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`/projects/allProjects.json`)
      .then((res) => {
        if (!res.ok) {
          setProjects([]);
          setLoading(false);
          return Promise.reject();
        }
        return res.json();
      })
      .then((data) => {
        setProjects(data);

        if (args) {
          const found = data.some(
            (project: { name: string }) =>
              project.name.toLowerCase() === args.toLowerCase(),
          );

          if (!found) {
            setfileText(null);
            setLoading(false);
            return;
          }

          fetch(`/projects/${args}.txt`)
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
    if (projects.length > 0) {
      return (
        <>
          <h1 className="font-bold mb-6 text-yellow-400 flex items-center gap-2">
            📂 {projects.length} projects found:
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mr-4">
            {projects.map((project, index) => {
              const status = project.status?.toLowerCase();
              const statusStyles =
                status === "done"
                  ? "bg-green-600 text-green-100"
                  : status === "in progress"
                    ? "bg-yellow-600 text-yellow-100"
                    : "bg-gray-700 text-gray-300";

              return (
                <div
                  key={index}
                  className="relative bg-[#1e1e1e] border border-[#be8d84]/40 hover:border-[#be8d84]/80 rounded-lg p-4 flex gap-4 shadow-md transition-all hover:scale-[1.005]"
                >
                  {project.status && (
                    <div
                      className={`absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full font-mono tracking-wide ${statusStyles}`}
                    >
                      {project.status}
                    </div>
                  )}

                  <div className="w-auto h-40 flex-shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={project.img}
                      alt={`Image of ${project.name}`}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col justify-between text-sm">
                    <span className="text-[#be8d84] font-bold text-base mb-1">
                      {project.name}
                    </span>
                    <span className="text-zinc-400 leading-snug line-clamp-3 ml-2">
                      {project.desc}
                    </span>
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 text-blue-400 hover:text-blue-300  text-sm transition"
                      >
                        🔗 Explore
                      </a>
                    ) : (
                      <p></p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-2">
            Type <span className="blue-output">project &lt;name&gt;</span> to
            view details.
          </p>
        </>
      );
    } else {
      return <span>Error, no project found.</span>;
    }
  }

  if (fileText !== null) {
    return <div className="" dangerouslySetInnerHTML={{ __html: fileText }} />;
  }

  if (!loading) {
    return <span>No project : {args}</span>;
  }

  if (!args) {
    return <span>fetching projects...</span>;
  } else {
    return <span>Loading {args}...</span>;
  }
}
