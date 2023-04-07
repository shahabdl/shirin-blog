"use client";
import { useEffect, useState } from "react";
import RecipeViewBox, { RecipeViewBoxType } from "./recipe-item-view";

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
  image: string;
  title: string;
  description?: string;
  createdTime?: string;
  difficulty: string;
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

const mockData: RecipeDataType[] = [
  {
    image: "item-1.jpg",
    title: "Doon Doon Mirza",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    createdTime: "10 min ago",
    difficulty: "Easy",
  },
  {
    image: "item-2.jpg",
    title: "Recipe 2",
    description: "Lorem ipsum",
    createdTime: "12 min ago",
    difficulty: "Hard",
  },
  {
    image: "item-3.jpg",
    title: "Recipe 3",
    description: "Lorem ipsum",
    createdTime: "12 min ago",
    difficulty: "Hard",
  },
  {
    image: "item-4.jpg",
    title: "Recipe 4",
    description: "Lorem ipsum",
    createdTime: "12 min ago",
    difficulty: "Hard",
  },
  {
    image: "item-5.jpg",
    title: "Recipe 5",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet molestias velit temporibus accusamus at quod magnam tempore aliquam quisquam doloribus perferendis eaque praesentium, quia modi, minima vitae dolores. Quos, facilis?",
    createdTime: "12 min ago",
    difficulty: "Hard",
  },
  {
    image: "item-6.jpg",
    title: "Recipe 6",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    createdTime: "12 min ago",
    difficulty: "Hard",
  },
];

const RecipeGridView = ({
  largeScreenRows,
  mediumScreenRows,
  smallScreenRows,
  mobileScreenRows,
}: PropsType) => {
  const [widnowSize, setWindowSize] = useState(SCREEN_SIZE.LARGE);
  const [rowsElement, setRowsElement] = useState<React.ReactNode[]>([]);
  const [recipes, setRescipes] = useState<RecipeDataType[]>([]);

  const screenResizeHandler = () => {
    if (window.screen.width > SCREEN_SIZE.MEDIUM) {
      console.log("Large");
      setWindowSize(SCREEN_SIZE.LARGE);
    } else if (window.screen.width <= SCREEN_SIZE.MOBILE) {
      console.log("Medium");
      setWindowSize(SCREEN_SIZE.MOBILE);
    } else if (window.screen.width <= SCREEN_SIZE.SMALL) {
      console.log("Small");
      setWindowSize(SCREEN_SIZE.SMALL);
    } else if (window.screen.width <= SCREEN_SIZE.MEDIUM) {
      console.log("Mobile");
      setWindowSize(SCREEN_SIZE.MEDIUM);
    }
  };

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
                    type={preferedRows[row][col]}
                    data={recipes[index]}
                  />
                ) : (
                  ""
                )}
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

  useEffect(() => {
    screenResizeHandler();
    window.addEventListener("resize", screenResizeHandler);
    () => {
      window.removeEventListener("resize", screenResizeHandler);
    };
  }, []);

  useEffect(() => {
    setRescipes([...mockData]);
  }, []);
  return <div className={`grid gap-2`}>{rowsElement}</div>;
};

export default RecipeGridView;