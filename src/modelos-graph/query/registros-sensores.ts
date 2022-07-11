import { gql } from "@apollo/client/core/core.cjs";

export const GET_REGISTRO_SENSORES = gql`
  query query(
    $order_by: [registros_sensores_order_by!] = { timestamp_registro: desc }
    $where: registros_sensores_bool_exp = {}
  ) {
    registros_sensores(order_by: $order_by, where: $where) {
      point_id
      timestamp_registro
      registro
      point {
        dis
        equip {
          id
          dis
          site {
            id
            dis
          }
        }
      }
    }
  }
`;
