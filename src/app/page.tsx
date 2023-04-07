import { Inter } from "next/font/google";
import Slider from "../components/main-page/slider";
import SearchBox from "shb/components/main-page/search-box";
import RecipeGridView from "shb/components/recipe-grid-view";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <Slider
        slides={[
          {
            image: "./slides/slide-1.webp",
            title: "Green veggies with butter",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          },
          {
            image: "./slides/slide-1.webp",
            title: "test title",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          },
        ]}
      />
      <SearchBox />
      <h1>shirin blog</h1>
      <RecipeGridView
        largeScreenRows={[
          ["big", "small", "small"],
          ["small", "medium", "medium", "small"],
          ["medium", "medium", "medium"],
          ["small", "small", "small", "small", "small", "small"],
          ["small", "small", "small", "small", "small", "small"],
        ]}
        mediumScreenRows={[
          ["medium", "small", "small"],
          ["small", "medium", "small", "small"],
          ["medium", "medium", "small"],
          ["small", "small", "small", "small", "small"],
          ["small", "small", "small", "small", "small"],
        ]}
        smallScreenRows={[
          ["small", "small"],
          ["small", "medium", "small"],
          ["medium", "medium"],
          ["small", "small", "small", "small"],
          ["small", "small", "small", "small"],
        ]}
        mobileScreenRows={[
          ["small"],
          ["small"],
          ["small"],
          ["small"],
          ["small"],
        ]}
      />
    </main>
  );
}
