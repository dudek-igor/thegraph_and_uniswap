import "dotenv/config";
import { gql, GraphQLClient } from "graphql-request";

const SUBGRAPH_API_KEY = process.env.SUBGRPH_API_KEY;
const UNISWAP_V3_GRAPH_ID = "5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV";
const UNISWAP_V3_FACTORY_ADDRES = "0x1F98431c8aD98523631AE4a59f267346ea31F984";
const UNISWAP_SUBGRAPH_ENDPOINT = `https://gateway.thegraph.com/api/${SUBGRAPH_API_KEY}/subgraphs/id/${UNISWAP_V3_GRAPH_ID}`;

const graphQLClient = new GraphQLClient(UNISWAP_SUBGRAPH_ENDPOINT);

const query = gql`
  {
    factories(id: $factoryId) {
      poolCount
      txCount
      totalVolumeUSD
      totalVolumeETH
      totalFeesUSD
      totalFeesETH
      untrackedVolumeUSD
      totalValueLockedUSD
      totalValueLockedETH
      totalValueLockedUSDUntracked
      totalValueLockedETHUntracked
      owner
    }
    bundles {
      id
      ethPriceUSD
    }
  }
`;

async function fetchData() {
  try {
    const data = await graphQLClient.request(query, {
      factoryId: UNISWAP_V3_FACTORY_ADDRES,
    });
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData();
