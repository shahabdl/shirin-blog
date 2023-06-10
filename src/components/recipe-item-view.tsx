import Link from "next/link";
import Image from "next/image";
import {
  AiOutlineClockCircle,
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";
import { TbChefHat } from "react-icons/tb";
import { RecipeDataType } from "./recipe-grid-view";
import { getFirstFewWords } from "./utilities/functions";
import React, { useState } from "react";

export type RecipeViewBoxType = "small" | "medium" | "big";

interface PropsType {
  type: RecipeViewBoxType;
  data: RecipeDataType;
  likeHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const RecipeViewBox = ({ type, data, likeHandler }: PropsType) => {
  const [liked, setLiked] = useState(data.likedByThisUser);

  const sumTiming = () => {
    let sum =
      data.timing.additional + data.timing.cookTime + data.timing.preperation;
    const hours = Math.floor(sum / 60);
    const minutes = sum - hours * 60;
    let timingString = `${hours ? hours + " H " : ""}${
      minutes ? minutes + " M" : ""
    }`;
    return timingString;
  };

  let containerTypeSpecificClasses = "";
  let imageTypeSpecificClasses = "";
  let descriptionTypeSpecificClasses = "";
  let imageWidth = 150;
  let imageHeight = 150;
  let descriptionContent = "";
  const likeClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setLiked(!liked);
    likeHandler(e);
  };
  const imageLoader = ({ src }: { src: string }) => {
    return `http://localhost:5000/recipes/${data.image}`;
  };
  switch (type) {
    case "big":
      containerTypeSpecificClasses = "min-h-[400px] flex";
      descriptionTypeSpecificClasses = "w-[50%]";
      imageTypeSpecificClasses = "h-full w-[50%]";
      if (data.description)
        descriptionContent = getFirstFewWords(data.description, 60);
      imageWidth = 600;
      imageHeight = 600;
      break;
    case "medium":
      containerTypeSpecificClasses = "min-h-[300px]";
      descriptionTypeSpecificClasses = "h-[50%]";
      imageTypeSpecificClasses = "h-[50%] w-full";
      if (data.description)
        descriptionContent = getFirstFewWords(data.description, 20);
      imageWidth = 400;
      imageHeight = 400;
      break;
    case "small":
      containerTypeSpecificClasses = "min-h-[300px]";
      descriptionTypeSpecificClasses = "h-[50%]";
      imageTypeSpecificClasses = "h-[50%] w-full";
      imageWidth = 300;
      imageHeight = 300;
      break;
    default:
      containerTypeSpecificClasses = "min-h-[300px]";
      descriptionTypeSpecificClasses = "h-[50%]";
      imageTypeSpecificClasses = "h-[50%] w-full";
      imageWidth = 300;
      imageHeight = 300;
      break;
  }
  return (
    <Link href="#">
      <div
        className={`h-full max-h-[450px] block ${containerTypeSpecificClasses} shadow-md  bg-white hover:shadow-xl transition-shadow group duration-300`}
      >
        <div className={`overflow-hidden ${imageTypeSpecificClasses}`}>
          <Image
            loader={imageLoader}
            src={`http://localhost:5000/recipes/${data.image}`}
            alt={data.title}
            width={imageWidth}
            height={imageHeight}
            className={`object-cover h-full group-hover:scale-105 transition-transform duration-300 w-full`}
          />
        </div>
        <div className={`p-4 ${descriptionTypeSpecificClasses}`}>
          <div className="flex mb-2">
            <div className="flex gap-2">
              <AiOutlineClockCircle color="#888" width={10} />
              <span className="font-light text-xs text-zinc-600">
                {sumTiming()}
              </span>
            </div>
            <div className="flex gap-2 ml-auto">
              <TbChefHat color="#888" />
              <span className="font-light text-xs text-zinc-600">
                {data.difficulty}
              </span>
            </div>
          </div>
          <div className="h-[calc(100%-75px)]">
            <h2 className="font-noraml text-xl">{data.title}</h2>
            {type !== "small" ? (
              <p className="mt-1 font-light text-md">
                {data.description ? descriptionContent + "..." : ""}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="flex items-center">
            <div className="flex gap-2 items-center">
              <div className="w-[50px] h-[50px] overflow-hidden rounded-full bg-red-300">
                <Image
                  src={`http://localhost:5000/users/${data.author.image}`}
                  width={50}
                  height={50}
                  alt={`${data.author.name} profile image`}
                />
              </div>
              <p className="text-sm font-light">
                {data.author.name.toUpperCase()}
              </p>
            </div>
            <div
              className="ml-auto text-center grid justify-items-center items-center"
              onClick={likeClickHandler}
              data-index={data.id}
            >
              {liked ? (
                <AiFillHeart color="rgb(220,48,48)" />
              ) : (
                <AiOutlineHeart color="#999" />
              )}
              <p className="text-xs font-light text-zinc-600 min-w-max">
                {data.likesCount + (data.likesCount > 1 ? " Likes" : " Like")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeViewBox;
