import { gql } from "@apollo/client";

const GetRecipes = gql`
  query GetManyRecipes($first: Int, $offset: Int) {
    Recipes(first: $first, offset: $offset) {
      id
      image
      title
      description
      timing {
        preperation
        cookTime
        additional
      }
      difficulty
      likesCount
      likedByThisUser
      author {
        username
        name
        image
      }
      steps
    }
  }
`;
const recipesQueries = {
  Queries: {
    getRecipes: GetRecipes,
  },
};

export default recipesQueries;
