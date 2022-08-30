import { gql } from "@urql/core";

export const insert_registros_sensores = gql`
  mutation registrarValorPunto($point_id: String, $registro: jsonb) {
    insert_registros_sensores(
      objects: { point_id: $point_id, registro: $registro }
    ) {
      affected_rows
    }
  }
`;
