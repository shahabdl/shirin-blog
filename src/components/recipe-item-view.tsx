import Link from "next/link";
import Image from "next/image";
import { RecipeDataType } from "./recipe-grid-view";
import { getFirstFewWords } from "./utilities/functions";

export type RecipeViewBoxType = "small" | "medium" | "big";

interface PropsType {
  type: RecipeViewBoxType;
  data: RecipeDataType;
}

const RecipeViewBox = ({ type, data }: PropsType) => {
  let containerTypeSpecificClasses = "";
  let imageTypeSpecificClasses = "";
  let descriptionTypeSpecificClasses = "";
  let imageWidth = 150;
  let imageHeight = 150;
  let descriptionContent = "";
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
      imageTypeSpecificClasses = "h-[50%] w-full";
      if (data.description)
        descriptionContent = getFirstFewWords(data.description, 20);
      imageWidth = 400;
      imageHeight = 400;
      break;
    case "small":
      containerTypeSpecificClasses = "min-h-[300px]";
      imageTypeSpecificClasses = "h-[50%] w-full";
      imageWidth = 300;
      imageHeight = 300;
      break;
    default:
      containerTypeSpecificClasses = "min-h-[300px]";
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
            src={`/recipes/${data.image}`}
            alt={data.title}
            width={imageWidth}
            height={imageHeight}
            className={`object-cover h-full group-hover:scale-105 transition-transform duration-300 w-full`}
          />
        </div>
        <div className={`p-4 ${descriptionTypeSpecificClasses}`}>
          <h2 className="font-noraml text-xl">{data.title}</h2>
          {type !== "small" ? (
            <p className="mt-3 font-light text-md">
              {data.description
                ? descriptionContent + "..."
                : ""}
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </Link>
  );
};

export default RecipeViewBox;
