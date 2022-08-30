import { gql } from "@urql/core";

export const point = gql`
  query point($where: point_bool_exp = {}) {
    point(where: $where) {
      id
      siteRef
      equipRef
      tags
    }
  }
`;

export const equip = gql`
  query equipo($where: equip_bool_exp = {}) {
    equip(where: $where) {
      id
      dis
      siteRef
      points {
        id
      }
    }
  }
`;

export const site = gql`
  query sitio {
    site {
      id
      dis
      equips {
        id
      }
      points {
        id
      }
    }
  }
`;
