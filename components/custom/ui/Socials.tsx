import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function SocialLinks() {
  return (
    <div className="flex items-center justify-center gap-4">
      <a href="https://facebook.com" target="_blank" className="text-xl">
        <FaFacebook />
      </a>
      <a href="https://twitter.com" target="_blank" className="text-xl">
        <FaTwitter />
      </a>
      <a href="https://linkedin.com" target="_blank" className="text-xl">
        <FaLinkedin />
      </a>
      <a href="https://instagram.com" target="_blank" className="text-xl">
        <FaInstagram />
      </a>
    </div>
  );
}
