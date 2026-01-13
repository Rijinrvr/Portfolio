import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="py-8 sm:py-12 px-4 sm:px-6 bg-gradient-to-r from-yellow-100 via-white to-yellow-100 text-gray-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        {/* About Section */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-lg sm:text-xl font-bold">About Me</h3>
          <p className="text-sm sm:text-base">
            I am a passionate front-end developer creating visually appealing
            and interactive web experiences. Let's build something amazing
            together!
          </p>
          <div className="flex space-x-4 mt-2">
            <a
              href="https://www.instagram.com/_eleven_._?igsh=MTV6dmN1MDNsa2gwbg=="
              className="hover:text-pink-500 transition-colors text-xl"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.linkedin.com/in/r-v-r/"
              className="hover:text-blue-700 transition-colors text-xl"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://github.com/Rijinrvr"
              className="hover:text-blue-700 transition-colors text-xl"
            >
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-lg sm:text-xl font-bold">Quick Links</h3>
          <ul className="space-y-2 text-sm sm:text-base">
            <li>
              <a href="#Home" className="hover:text-gray-900 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a
                href="#AboutMe"
                className="hover:text-gray-900 transition-colors"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#Experience"
                className="hover:text-gray-900 transition-colors"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-gray-900 transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 sm:space-y-4 sm:col-span-2 md:col-span-1">
          <h3 className="text-lg sm:text-xl font-bold">Contact</h3>
          <p className="text-sm sm:text-base break-words">
            Email:{" "}
            <a
              href="mailto:rijin.connect@gmail.com
"
              className="hover:text-gray-900 transition-colors"
            >
              rijin.connect@gmail.com
            </a>
          </p>
          <p className="text-sm sm:text-base">
            Phone:{" "}
            <a
              href="tel:+1234567890"
              className="hover:text-gray-900 transition-colors"
            >
              +91 9061788964
            </a>
          </p>
          <p className="text-sm sm:text-base">Location: Kerala, India</p>
        </div>
      </div>

      <div className="mt-8 sm:mt-12 text-center border-t border-yellow-500 pt-4 sm:pt-6 text-xs sm:text-sm text-gray-700">
        &copy; {new Date().getFullYear()} rvr. All rights reserved.
      </div>
    </footer>
  );
}
