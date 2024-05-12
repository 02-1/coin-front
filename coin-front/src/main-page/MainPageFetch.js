export async function getCoinList() {
  const response = await fetch(`http://${process.env.REACT_APP_IP}/coin-list`);
  const body = await response.json();
  return body;
}

export async function getExchangeRate() {
  const response = await fetch(`http://${process.env.REACT_APP_IP}/exchange-rate`);
  const body = await response.json();
  return body;
}