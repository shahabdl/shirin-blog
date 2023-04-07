const NewsletterJoinBox = () => {
  return (
    <div
      className="bg-white shadow-md px-4 py-9 text-center grid items-center justify-center gap-4 bg-no-repeat"
      style={{ backgroundImage: "url(/home/newsletter-bg.png)" }}
    >
      <div>
        <h3 className="font-normal text-2xl">Join our Newsletter</h3>
        <p className="text-md font-light mt-1">to get most recent Recipes!</p>
      </div>
      <div className="grid grid-cols-5 xl:grid-cols-5 w-full gap-4 mt-4 md:grid-cols-4 max-md:grid-cols-1 max-md:gap-2">
        <div className="col-span-2 grid justify-center items-center min-h-[34px] w-full">
          <input
            type="text"
            className="border-[1px] border-zin-500 focus-visible:outline-none focus-visible:bg-zinc-100 transition-colors px-1 h-full w-full"
            placeholder="Your Name"
          />
        </div>
        <div className="col-span-2 grid justify-center items-center min-h-[34px] w-full">
          <input
            type="text"
            className="border-[1px] border-zin-500 focus-visible:outline-none focus-visible:bg-zinc-100 transition-colors px-1 h-full w-full"
            placeholder="Your Email"
          />
        </div>
        <button className="px-3 py-1 border-[1px] border-black bg-transparent hover:bg-black hover:text-white transition-colors max-w-max justify-self-center col-span-1 md:col-start-2 md:col-span-2 xl:col-span-1">
          Join Now!
        </button>
      </div>
    </div>
  );
};

export default NewsletterJoinBox;
