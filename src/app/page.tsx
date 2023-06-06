import { Inter } from "next/font/google";
import Slider from "../components/main-page/slider";
import SearchBox from "shb/components/main-page/search-box";
import RecipeGridView from "shb/components/recipe-grid-view";
import NewsletterJoinBox from "shb/components/main-page/newsletter-join-box";
import apolloClient from "shb/apollo/apollo-client";
import sliderQueries from "shb/apollo/queries/slider";

const inter = Inter({ subsets: ["latin"] });

const getSliderData = async () => {
  const { error, data } = await apolloClient.query({
    query: sliderQueries.Queries.getSlider,
    variables: { page: "home" },
    fetchPolicy: "no-cache"
  });
  console.log(data.getSlider.slide)
  return { error, data };
};

export default async function Home() {
  const { error, data } = await getSliderData();

  return (
    <main>
      <Slider slides={[...data.getSlider.slide]} />
      <SearchBox />
      <div className="px-[100px] max-lg:px-[20px] grid gap-5">
        <h1 className="text-3xl text-center mb-4 font-light">
          Most Recent Recipes!
        </h1>
        <RecipeGridView
          largeScreenRows={[
            ["big", "small", "small"],
            ["small", "medium", "medium"],
            ["medium", "medium", "medium"],
            ["small", "small", "small", "small", "small", "small"],
            ["small", "small", "small", "small", "small", "small"],
          ]}
          mediumScreenRows={[
            ["medium", "small", "small"],
            ["small", "medium", "small"],
            ["medium", "medium", "small"],
            ["small", "small", "small", "small", "small"],
            ["small", "small", "small", "small", "small"],
          ]}
          smallScreenRows={[
            ["medium", "small"],
            ["small", "medium"],
            ["medium", "small"],
            ["small", "small", "small"],
            ["small", "small", "small"],
          ]}
          mobileScreenRows={[
            ["medium"],
            ["medium"],
            ["medium"],
            ["medium"],
            ["medium"],
            ["medium"],
          ]}
        />
        <NewsletterJoinBox />
      </div>
    </main>
  );
}
