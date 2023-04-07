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

  const screenResizeHandler = () => {
    if (window.screen.width >= SCREEN_SIZE.LARGE) {
      setWindowSize(SCREEN_SIZE.LARGE);
    } else if (window.screen.width >= SCREEN_SIZE.MEDIUM) {
      setWindowSize(SCREEN_SIZE.MEDIUM);
    } else if (window.screen.width >= SCREEN_SIZE.SMALL) {
      setWindowSize(SCREEN_SIZE.SMALL);
    } else if (window.screen.width >= SCREEN_SIZE.MOBILE) {
      setWindowSize(SCREEN_SIZE.MOBILE);
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
    for (let row in preferedRows) {
      let colRatios = calculateColumneRatio(preferedRows[row]);
      let cols: React.ReactNode[] = [];
      for (let col in preferedRows[row]) {
        cols.push(
          <div style={{ width: colRatios[col] + "%" }} className="bg-red">
            <RecipeViewBox type={preferedRows[row][col]} />
          </div>
        );
      }
      tempRowsElement.push(
        <div key={row} className="w-full flex gap-2">
          {cols}
        </div>
      );
    }
    setRowsElement([...tempRowsElement]);
  }, [widnowSize]);

  useEffect(() => {
    window.addEventListener("resize", screenResizeHandler);
    () => {
      window.removeEventListener("resize", screenResizeHandler);
    };
  }, []);
  return <div className={`px-[100px] grid gap-2`}>{rowsElement}</div>;
};

export default RecipeGridView;
