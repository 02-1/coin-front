import { useEffect } from "react";

function CoinListProvider({setList}) {

  useEffect(() => {
    const newSocket = new WebSocket("ws://172.30.92.184:8080/coin-list");

    newSocket.onopen = () => {
      console.log("WebSocket connected");
    };

    newSocket.onmessage = (event) => {
      setList(JSON.parse(event.data));
    };

    newSocket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      newSocket.close();
    };
  }, []);

}

export default CoinListProvider;
