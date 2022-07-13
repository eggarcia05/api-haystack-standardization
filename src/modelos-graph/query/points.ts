import { gql } from "@apollo/client/core/core.cjs";

export const point = gql`
  query point($id: String, $clave_esperada: String) {
    point(
      where: {
        equipRef: { _eq: $id }
        clave_esperada: { _eq: $clave_esperada }
      }
    ) {
      id
      tags
    }
  }
`;
