import Link from "next/link";
import {
  AiOutlineUser,
  AiOutlineInstagram,
  AiOutlineFacebook,
  AiOutlineWhatsApp,
  AiOutlineYoutube,
  AiOutlineReddit,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className="min-h-[50px] flex items-center px-[15%] max-md:grid max-md:gap-3 py-3">
      <div className="mr-auto font-light text-sm max-md:mr-0 max-md:justify-self-center max-md:text-center">
        Copyright © shinshin {new Date().getFullYear()}
      </div>
      <div className="flex gap-4 items-center justify-center">
        <Link href="/" className="text-xs font-light hover:font-normal">HOME</Link>
        <Link href="/recepies" className="text-xs font-light hover:font-normal">RECEPIES</Link>
        <Link href="/contact" className="text-xs font-light hover:font-normal">CONTACT</Link>
        <Link href="/about" className="text-xs font-light hover:font-normal">ABOUT</Link>
      </div>
      <div className="flex gap-2 items-center ml-auto max-md:ml-0 max-md:justify-self-center max-md:text-center">
        <Link href="#">
          <AiOutlineInstagram className="fill-zinc-700 stroke-none" />
        </Link>
        <Link href="#">
          <AiOutlineFacebook className="fill-zinc-700 stroke-none" />
        </Link>
        <Link href="#">
          <AiOutlineWhatsApp className="fill-zinc-700 stroke-none" />
        </Link>
        <Link href="#">
          <AiOutlineYoutube className="fill-zinc-700 stroke-none" />
        </Link>
        <Link href="#">
          <AiOutlineReddit className="fill-zinc-700 stroke-none" />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
