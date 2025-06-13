/* eslint-disable prettier/prettier */
import Link from "next/link";
import {
  PiFacebookLogoFill,
  PiInstagramLogoFill,
  PiTwitterLogoFill,
  PiEnvelopeSimpleFill,
  PiPhoneFill,
} from "react-icons/pi"; // PrimeReact icons
import Image from "next/image";

import { siteConfig } from "@/config/site";

export const FooterComponent = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Navigation Sections */}
        {siteConfig.footerNav.map((section, index) => (
          <div key={index}>
            <h3 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2 tracking-wide uppercase">
              {section.header}
            </h3>
            <ul className="space-y-2">
              {section.links.map((item, idx) => (
                <li key={idx}>
                  {item.link ? (
                    <Link
                      className="hover:text-cyan-400 transition-colors duration-200 flex items-center gap-2"
                      href={item.link}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="flex items-center gap-2 text-gray-300">
                      {/* Show icons for email/phone */}
                      {item.label.includes("@") && (
                        <PiEnvelopeSimpleFill className="text-cyan-400" />
                      )}
                      {item.label.match(/^\d{6,}$/) && (
                        <PiPhoneFill className="text-cyan-400" />
                      )}
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Social Media Section */}
        <div className="flex flex-col items-start md:items-end gap-4 md:col-span-1">
          <h3 className="text-lg font-bold mb-2 border-b border-gray-700 pb-2 tracking-wide uppercase">
            Connect with us
          </h3>
          <div className="flex gap-4">
            <Link
              aria-label="Facebook"
              className="hover:text-cyan-400 transition-colors text-2xl"
              href="https://facebook.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <PiFacebookLogoFill />
            </Link>
            <Link
              aria-label="Instagram"
              className="hover:text-cyan-400 transition-colors text-2xl"
              href="https://instagram.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <PiInstagramLogoFill />
            </Link>
            <Link
              aria-label="Twitter"
              className="hover:text-cyan-400 transition-colors text-2xl"
              href="https://twitter.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <PiTwitterLogoFill />
            </Link>
            <Image
              alt="WhatsApp Logo"
              height={100}
              src="/whasapp-image.png"
              width={100}
            />
          </div>
          <p className="text-gray-400 text-sm mt-4">
            G-211, UPSIDC Industrial Area Phase-1 M. G. Road, Dholana GHAZIABAD
            -201015, UP
          </p>
        </div>
      </div>
      <div className="text-center mt-10 pb-8 text-xs border-t border-gray-700 pt-5">
        &copy; {new Date().getFullYear()} Aman Enterprises. All rights reserved.
      </div>
    </footer>
  );
};
