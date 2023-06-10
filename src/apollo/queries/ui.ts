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
const GetGridViewStructure = gql`
  query GetGridViewStructure($page: String) {
    getGridViewStructure(page: $page) {
      id
      page
      structureLarge
      structureMedium
      structureSmall
      structureMobile
    }
  }
`
const sliderQueries = {
  Queries: {
    getSlider: GetSlider,
    getGridViewStructure: GetGridViewStructure,
  },
};

export default sliderQueries;
