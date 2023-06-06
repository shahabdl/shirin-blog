import { gql } from "@apollo/client";

const GetSlider = gql`
  query GetSlider($page: String) {
    getSlider(page: $page) {
      id
      page
      slide {
        title
        description
        image
      }
    }
  }
`;
const sliderQueries = {
  Queries: {
    getSlider: GetSlider,
  },
};

export default sliderQueries;
