import Link from "next/link";

export type RecipeViewBoxType = "small" | "medium" | "big";

interface PropsType {
  type: RecipeViewBoxType;
}

const RecipeViewBox = ({ type }: PropsType) => {
  let typeSpecificClass = "";
  switch (type) {
    case "big":
      typeSpecificClass = "min-h-[450px]";
      break;
    case "medium":
      typeSpecificClass = "min-h-[350px]";
      break;
    case "small":
      typeSpecificClass = "min-h-[300px]";
      break;
    default:
      typeSpecificClass = "min-h-[300px]";
      break;
  }
  return (
    <Link href="#" className={`bg-red-500 min-h-[300px] h-full block ${typeSpecificClass}`}>
      {type}
    </Link>
  );
};

export default RecipeViewBox;
