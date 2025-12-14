

export default function Experience() {
  const experience = [
    {
      year: "2023 - Present",
      role: "Software Engineer",
      company: "Apps Team Technologies",
      desc: "Designing and developing responsive websites, UI components, and web applications for clients.",
    },
    {
      year: "2021 - 2021",
      role: "Software Engineer Intern",
      company: "Apps Team Technologies",
      desc: "Designed mobile apps, dashboards, website layouts, and improved user experience for client projects.",
    },
    // {
    //   year: "2020 - 2021",
    //   role: "Web Designer",
    //   company: "Startup Company",
    //   desc: "Created landing pages, wireframes, prototypes, and design systems.",
    // },
  ];

  return (
    <section id="Experience" className="w-full py-20 px-6 md:px-20 bg-gradient-to-b from-white via-yellow-100 to-white">
      {/* Title */}
      <div className="mb-12">
        <h3 className="text-sm font-semibold tracking-wider text-yellow-400">
          EXPERIENCE
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold">WORK HISTORY</h2>
      </div>

      {/* Timeline */}
      <div className="relative border-l-4 border-yellow-400 ml-4">
        {experience.map((exp, i) => (
          <div key={i} className="mb-10 ml-6">
            {/* Dot */}
            <div className="absolute -left-[10px] w-5 h-5 bg-yellow-500 rounded-full border-4 border-white shadow-md"></div>

            {/* Card */}
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer">
              <p className="text-yellow-600 font-semibold">{exp.year}</p>
              <h3 className="text-xl font-bold mt-2">{exp.role}</h3>
              <h4 className="text-gray-500 text-sm mt-1">{exp.company}</h4>
              <p className="text-gray-700 mt-3 leading-relaxed">{exp.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
