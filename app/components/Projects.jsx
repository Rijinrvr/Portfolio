import Image from "next/image";

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "Whizpot",
      subtitle: "Web Design, App Design",
      img: "/portfolio/Whizpot.png",
      link: "https://www.whizpot.com/",
    },
    {
      id: 2,
      title: "Belocated",
      subtitle: "Web Design, App Design",
      img: "/portfolio/Blocated.png",
      link: "https://belocated.com/",
    },
    {
      id: 3,
      title: "Sage",
      subtitle: "Web Design, App Design",
      img: "/portfolio/Sage.png",
      link: "https://sageresearch.oneteamus.com/",
    },
  ];

  return (
    <section
      id="Projects"
      className="w-full py-12 sm:py-20 px-4 sm:px-6 md:px-16 bg-gradient-to-b from-white via-yellow-100 to-white"
    >
      {/* Section Title */}
      <div className="mb-8 sm:mb-12">
        <h3 className="text-sm font-semibold tracking-wider text-yellow-300">
          MY WORK
        </h3>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">RECENT PROJECT</h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {projects.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-xl rounded-2xl p-3 sm:p-4 hover:-translate-y-1 hover:shadow-2xl transition text-black cursor-pointer"
          >
            {/* Image */}
            <div className="w-full h-40 sm:h-52 overflow-hidden rounded-xl">
              <Image
                src={item.img}
                width={500}
                height={300}
                alt="Project"
                className="object-cover w-full h-full"
              />
            </div>

            {/* Content */}
            <div className="mt-4 sm:mt-5 flex justify-between items-center">
              <div>
                <h3 className="text-base sm:text-lg font-bold">{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500">{item.subtitle}</p>
              </div>

              {/* Small Blue Button */}
              <button
                className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-yellow-400 text-white hover:bg-yellow-300 flex-shrink-0"
                onClick={() => window.open(item.link, "_blank")}
              >
                ↗
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dot */}
      <div className="flex justify-center mt-8 sm:mt-10">
        <div className="w-12 h-2 bg-yellow-400 rounded-full"></div>
      </div>
    </section>
  );
}
