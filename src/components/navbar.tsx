"use client";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import "./navbar.css";
import {
  AiOutlineUser,
  AiOutlineInstagram,
  AiOutlineFacebook,
  AiOutlineWhatsApp,
  AiOutlineYoutube,
  AiOutlineReddit,
} from "react-icons/ai";
interface PropsType {
  className?: string;
}

export default function NavBar({ className = "" }: PropsType) {
  const navbarRef = useRef<HTMLDivElement>(null);

  const scrollHandler = (e: Event) => {
    if (navbarRef && navbarRef.current) {
      if (window.scrollY > 60) {
        navbarRef.current.classList.add("sticky-navbar");
        navbarRef.current.classList.remove("not-sticky-navbar");
      } else {
        navbarRef.current.classList.remove("sticky-navbar");
        navbarRef.current.classList.add("not-sticky-navbar");
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
  }, []);

  const mouseEnterHandler = (e: React.MouseEvent<HTMLElement>) => {
    let item = e.currentTarget;
    let width = item.offsetWidth;
    let x = item.offsetLeft;
    let y = item.offsetTop + item.offsetHeight;
    console.log(x, width);
    let underLine = document.getElementById("navbar-underline");
    if (underLine) {
      underLine.style.left = String(x) + "px";
      underLine.style.width = String(width) + "px";
      underLine.style.top = String(y) + "px";
      underLine.style.opacity = "1";
    }
  };

  const mouseLeaveHandler = (e: React.MouseEvent<HTMLElement>) => {
    let underLine = document.getElementById("navbar-underline");
    if(underLine){
      underLine.style.opacity = "0";
    }
  };

  return (
    <div className="min-h-[60px] z-50">
      <div
        ref={navbarRef}
        className={`grid grid-cols-12 grid-flow-col px-5 py-4 ${className} transition-colors left-0 w-full not-sticky-navbar  z-50`}
      >
        <div className="col-span-2 flex gap-2 items-center">
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
        <div className="flex bg-red gap-5 items-center justify-center font-light col-span-8 col-start-3">
          <div
            id="navbar-underline"
            className="absolute bg-black h-[2px] top-[40px] opacity-0 transition-all"
          ></div>
          <div className="flex gap-5">
            <Link
              href="/"
              onMouseEnter={mouseEnterHandler}
              onMouseLeave={mouseLeaveHandler}
            >
              HOME
            </Link>
            <Link
              href="/recepies"
              onMouseEnter={mouseEnterHandler}
              onMouseLeave={mouseLeaveHandler}
            >
              RECEPIES
            </Link>
          </div>
          <div className="text-xl font-normal">SHIRIN BLOG</div>
          <div className="flex gap-5">
            <Link
              href="/contact"
              onMouseEnter={mouseEnterHandler}
              onMouseLeave={mouseLeaveHandler}
            >
              CONTACT
            </Link>
            <Link
              href="/about"
              onMouseEnter={mouseEnterHandler}
              onMouseLeave={mouseLeaveHandler}
            >
              ABOUT
            </Link>
          </div>
        </div>
        <div className="col-span-2 ml-auto ">
          <Link href="/user/login">
            <div className="flex gap-2 items-center">
              <span>
                <AiOutlineUser />
              </span>
              Login
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
