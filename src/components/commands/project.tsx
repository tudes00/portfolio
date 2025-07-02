import { JSX, useEffect, useState } from "react";
import Image from "next/image";

interface projectI {
  name: string;
  desc: string;
  img: string;
  link: string;
  github: string;
  status: string;
}

export default function ProjectCommand({
  args,
  onLoadEnd,
  setInputVal,
}: {
  args?: string;
  onLoadEnd?: () => void;
  setInputVal: React.Dispatch<React.SetStateAction<string>>;
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mr-4">
            {projects.map((project, index) => {
              const status = project.status?.toLowerCase();
              const statusStyles =
                status === "done"
                  ? "bg-green-600 text-green-100"
                  : status === "in progress"
                    ? "bg-yellow-600 text-yellow-100"
                    : status === "shelved"
                        ? "bg-purple-400 text-purple-100"
                        : status === "abandoned"
                            ? "bg-red-400 text-red-100"
                            : "bg-gray-700 text-gray-300";

              return (
                <div
                  key={index}
                  onClick={() => setInputVal(`project ${project.name}`)}
                  className="relative rounded-lg border-2 border-dashed border-[#be8d84]/40 bg-[#1e1e1e] shadow-md overflow-hidden hover:border-[#be8d84]/80 hover:scale-[1.005] transition-all cursor-pointer"
                  style={{ height: "300px" }}
                >
                   <Image
    src={project.img}
    alt={`Image of ${project.name}`}
    fill
    priority
    sizes="100%"
    style={{
      objectFit: 'cover',
      objectPosition: 'center',
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

                  <div className="absolute inset-0 bg-black/50 bg flex flex-col justify-center p-4 text-center">
                    <h2 className="font-bold text-3xl">{project.name}</h2>
                    <p className="mt-2 text-base text-white">
                      {project.desc}
                    </p>
                    <div className="mt-4 text-blue-400  text-lg transition-all">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mr-2 hover:text-blue-300"
                        >
                          🔗 Explore
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-300"
                        >
                            ⚡ Github
                        </a>
                      )}
                    </div>
                  </div>

                  {project.status && (
                    <div
                      className={`absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full font-mono tracking-wide ${
                        statusStyles
                      }`}
                    >
                      {project.status}
                    </div>
                  )}
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
