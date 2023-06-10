"use client";
import { useEffect, useState } from "react";
import RecipeViewBox, { RecipeViewBoxType } from "./recipe-item-view";
import apolloClient from "shb/apollo/apollo-client";
import recipesQueries from "shb/apollo/queries/recipe";

export const SCREEN_SIZE = {
  MOBILE: 640,
  SMALL: 768,
  MEDIUM: 1280,
  LARGE: 1536,
};

interface PropsType {
  largeScreenRows: RecipeViewBoxType[][];
  mediumScreenRows?: RecipeViewBoxType[][];
  smallScreenRows?: RecipeViewBoxType[][];
  mobileScreenRows?: RecipeViewBoxType[][];
}

export interface RecipeDataType {
  id: number;
  image: string;
  title: string;
  description?: string;
  timing: {
    preperation: number;
    cookTime: number;
    additional: number;
  };
  difficulty: string;
  likesCount: number;
  likedByThisUser: boolean;
  author: {
    name: string;
    image: string;
  };
}

const calculateColumneRatio = (row: RecipeViewBoxType[]) => {
  let colRatios = [];
  let totalWeight = 0;

  for (let col in row) {
    switch (row[col]) {
      case "big":
        colRatios.push(3);
        totalWeight += 3;
        break;
      case "medium":
        colRatios.push(2);
        totalWeight += 2;
        break;
      case "small":
        colRatios.push(1);
        totalWeight += 1;
        break;
      default:
        colRatios.push(1);
        totalWeight += 1;
        break;
    }
  }
  for (let col in row) {
    colRatios[col] /= totalWeight;
    colRatios[col] *= 100;
    colRatios[col] = Math.floor(colRatios[col]);
  }

  return colRatios;
};

const RecipeGridView = ({
  largeScreenRows,
  mediumScreenRows,
  smallScreenRows,
  mobileScreenRows,
}: PropsType) => {
  const [widnowSize, setWindowSize] = useState(SCREEN_SIZE.LARGE);
  const [rowsElement, setRowsElement] = useState<React.ReactNode[]>([]);
  const [recipes, setRescipes] = useState<RecipeDataType[]>([]);

  const recipeLikeHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    let index = e.currentTarget.getAttribute("data-index");
    if (index) {
      if (recipes[Number(index)].likedByThisUser) {
        recipes[Number(index)].likedByThisUser = true;
      } else {
        recipes[Number(index)].likedByThisUser = false;
      }
    }
  };

  const screenResizeHandler = () => {
    if (window.screen.width > SCREEN_SIZE.MEDIUM) {
      setWindowSize(SCREEN_SIZE.LARGE);
    } else if (window.screen.width <= SCREEN_SIZE.MOBILE) {
      setWindowSize(SCREEN_SIZE.MOBILE);
    } else if (window.screen.width <= SCREEN_SIZE.SMALL) {
      setWindowSize(SCREEN_SIZE.SMALL);
    } else if (window.screen.width <= SCREEN_SIZE.MEDIUM) {
      setWindowSize(SCREEN_SIZE.MEDIUM);
    }
  };

  /**
   * this useEffect calculates grid items width and heights;
   */
  useEffect(() => {
    const getCorrectRowByScreenSize = () => {
      let preferedRow = largeScreenRows;

      switch (widnowSize) {
        case SCREEN_SIZE.LARGE:
          preferedRow = largeScreenRows;
          break;
        case SCREEN_SIZE.MEDIUM:
          if (mediumScreenRows) {
            preferedRow = mediumScreenRows;
          }
          break;
        case SCREEN_SIZE.SMALL:
          if (smallScreenRows) {
            preferedRow = smallScreenRows;
          } else if (mediumScreenRows) {
            preferedRow = mediumScreenRows;
          }
          break;
        case SCREEN_SIZE.MOBILE:
          if (mobileScreenRows) {
            preferedRow = mobileScreenRows;
          } else if (smallScreenRows) {
            preferedRow = smallScreenRows;
          } else if (mediumScreenRows) {
            preferedRow = mediumScreenRows;
          }
          break;
        default:
          preferedRow = largeScreenRows;
          break;
      }
      return preferedRow;
    };

    let preferedRows = largeScreenRows;
    preferedRows = getCorrectRowByScreenSize();
    let tempRowsElement = [] as React.ReactNode[];
    let index = 0;
    for (let row in preferedRows) {
      let colRatios = calculateColumneRatio(preferedRows[row]);
      let cols: React.ReactNode[] = [];
      if (index < recipes.length) {
        for (let col in preferedRows[row]) {
          if (index < recipes.length) {
            cols.push(
              <div style={{ width: colRatios[col] + "%" }}>
                {index < recipes.length ? (
                  <RecipeViewBox
                    key={recipes[index].id}
                    type={preferedRows[row][col]}
                    data={recipes[index]}
                    likeHandler={recipeLikeHandler}
                  />
                ) : null}
              </div>
            );
          } else {
            break;
          }
          index++;
        }
        tempRowsElement.push(
          <div key={row} className="w-full flex gap-2">
            {cols}
          </div>
        );
      }
    }
    setRowsElement([...tempRowsElement]);
  }, [widnowSize, recipes]);

  /** this useEffect adds and event listener for window resize */
  useEffect(() => {
    screenResizeHandler();
    window.addEventListener("resize", screenResizeHandler);
    () => {
      window.removeEventListener("resize", screenResizeHandler);
    };
  }, []);

  /**
   * here we fetch recipe data
   */
  useEffect(() => {
    const fetchData = async () => {
      const { error, data } = await apolloClient.query({
        query: recipesQueries.Queries.getRecipes,
        variables: { first: 10, offset: 0 },
      });
      setRescipes([...data.Recipes]);
      return { error, data };
    };
    fetchData();
  }, []);
  return <div className={`grid gap-2`}>{rowsElement}</div>;
};

export default RecipeGridView;
