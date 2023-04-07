const NewsletterJoinBox = () => {
  return (
    <div
      className="bg-white shadow-md mx-[100px] px-4 py-9 text-center grid items-center justify-center gap-4 bg-no-repeat"
      style={{ backgroundImage: "url(/home/newsletter-bg.png)" }}
    >
      <h3 className="font-light text-lg">
        Join our Newsletter to get most recent Recipes!
      </h3>
      <div className="grid grid-cols-5 w-full gap-4">
        <div className="col-span-2 grid justify-center items-center">
          <input
            type="text"
            className="border-[1px] border-zin-500 focus-visible:outline-none focus-visible:bg-zinc-100 transition-colors px-1 h-full"
            placeholder="Your Name"
          />
        </div>
        <div className="col-span-2 grid justify-center items-center">
          <input
            type="text"
            className="border-[1px] border-zin-500 focus-visible:outline-none focus-visible:bg-zinc-100 transition-colors px-1 h-full"
            placeholder="Your Email"
          />
        </div>
        <button className="px-3 py-1 border-[1px] border-black bg-transparent hover:bg-black hover:text-white transition-colors max-w-max justify-self-center col-span-1">
          Join Now!
        </button>
      </div>
    </div>
  );
};

export default NewsletterJoinBox;
