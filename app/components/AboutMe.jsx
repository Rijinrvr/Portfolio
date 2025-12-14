import Image from "next/image";

export default function AboutMe() {
  return (
    <section  id="AboutMe" className="w-full py-20 px-10 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10">
        
        {/* Profile Image */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-start">
          <Image
            src="/portfolio/p2.jpeg" // Replace with your image path
            alt="profile"
            width={300}
            height={400}
            className="rounded-lg object-cover"
          />
        </div>

        {/* About Me */}
        <div className="w-full md:w-2/3">
          <div className="mb-12">
        <h3 className="text-sm font-semibold tracking-wider text-yellow-300">
          Hi THERE
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold">ABOUT ME</h2>
      </div>
          <p className="text-gray-700 leading-relaxed">
            My name is Rijin, and I am a passionate Software Engineer with a strong background
             in front-end. I love building clean, user-friendly, and 
             visually engaging web applications that solve real-world problems. With experience in
              React, Next.js, Tailwind CSS, and Node.js, I enjoy turning complex ideas into functional
              digital experiences. I’m constantly learning new technologies, exploring UI/UX design 
              trends, and collaborating on projects that push the boundaries of creativity and performance.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
           I thrive in fast-paced environments where I can contribute innovative solutions and work closely with 
           teams to deliver high-quality products. I also enjoy mentoring junior developers, sharing knowledge, and 
           fostering a culture of continuous improvement. Outside of coding, I am passionate about exploring the latest 
           tech innovations, contributing to open-source projects, and creating portfolio projects that showcase both my
            technical and creative skills.My goal is to craft impactful digital experiences that make a difference 
            and leave a lasting impression.
          </p>
        </div>
      </div>
    </section>
  );
}
