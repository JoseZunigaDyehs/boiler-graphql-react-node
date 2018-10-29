import { gql } from "apollo-boost";

const getHomesQuery = gql`
  {
    homes {
      name
      id
      habitants {
        name
        age
      }
    }
  }
`;

const addHomeQuery = gql`
  mutation($name: String!) {
    addHome(name: $name) {
      name
    }
  }
`;

const getHabitants = gql`
{
  habitants{
    name,
    age
    home{
      id,
      name
    }
  }
}
`

export { getHomesQuery, addHomeQuery, getHabitants };
