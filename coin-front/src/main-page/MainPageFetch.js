export async function getCoinList() {
  const response = await fetch("http://172.30.92.184:8080/coin-list");
  const body = await response.json();
  return body;
}
