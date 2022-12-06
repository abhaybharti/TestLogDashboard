import { BASE_API_URL } from "./Config";

export const getApiResponse = async (query, endpoint, subscriptionkey) => {
  console.log(
    "ApiCall->getApiResponse() start, query",
    query,
    "endpoint",
    endpoint,
    "subscriptionkey",
    subscriptionkey
  );
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: query,
        endpoint: endpoint,
        subscriptionkey: subscriptionkey,
      }),
    };
    const response = await fetch(BASE_API_URL + "/" + endpoint, requestOptions);
    const json = await response.json();
    console.log("ApiCall->getApiResponse() end :", json);
    return json;
  } catch (error) {
    console.log(error);
  }
};
