import { gql } from "@urql/core";

export const GET_REGISTRO_SENSORES = gql`
  query query(
    $order_by: [registros_sensores_order_by!] = { timestamp_registro: desc }
    $where: registros_sensores_bool_exp = {}
    $limit: Int = 250
  ) {
    registros_sensores(order_by: $order_by, where: $where, limit: $limit) {
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

export const DATA_REALTIME = gql`
  query realTimeData {
    registros_sensores(limit: 10, order_by: { timestamp_registro: desc }) {
      id
      timestamp_registro
      registro
    }
  }
`;
