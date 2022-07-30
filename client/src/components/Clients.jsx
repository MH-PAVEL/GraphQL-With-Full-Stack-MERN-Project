import { gql, useQuery } from "@apollo/client";
import { Container } from "@mui/material";
import React from "react";
import { GET_CLIENTS } from "../queries/ClientQuery";
import ClientTable from "./ClientTable";

// const GET_CLIENTS = gql`
//   query getClient {
//     clients {
//       id
//       name
//       email
//       phone
//     }
//   }
// `;

const Clients = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( somethings went wrong!</p>;

  console.log(data);
  return (
    <div>
      <Container>
        {!loading && data && <ClientTable data={data.clients} />}
      </Container>
    </div>
  );
};

export default Clients;
