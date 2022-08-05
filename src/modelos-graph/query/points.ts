import { gql } from "@apollo/client/core/core.cjs";

export const point = gql`
  query point($equipRef_id: String, $clave_esperada: String) {
    point(
      where: {
        equipRef: { _eq: $equipRef_id }
        clave_esperada: { _eq: $clave_esperada }
      }
    ) {
      id
      tags
    }
  }
`;
