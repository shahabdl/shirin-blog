const SearchBox = () => {
  return (
    <div className="w-[100vw] grid items-center justify-center">
      <div className="w-[70vw] h-[80px] bg-white shadow-xl translate-y-[-50%] flex gap-5 justify-around items-center px-5 border-zinc-100 border-[1px]">
        <p className="text-xl font-light min-w-max">Search Recepies:</p>
        <input
          type="text"
          className="border-zinc-300 border-solid border-[1px] w-[100%] h-[35px] focus-visible:outline-none focus-visible:bg-zinc-100 px-2 transition-colors"
        />
        <button className="bg-transparent border-black border-[1px] text-black h-[35px] w-[200px] transition-colors hover:bg-black hover:text-white">Search</button>
      </div>
    </div>
  );
};

export default SearchBox;
