const MainPageSocket = (onMessageReceived) => {
    const socket = new WebSocket('ws://172.30.92.184:8080/coin-list');
  
    socket.onopen = () => {
      console.log('MainPageSocket 연결됨');
      socket.send('conin-list 내놔');
    };
  
    socket.onmessage = (event) => {
      console.log('서버로부터의 응답:', event.data);
      if (onMessageReceived) {
        onMessageReceived(event.data);
      }
      socket.close();
    };
  
    socket.onclose = () => {
      console.log('MainPageSocket 연결이 종료됨');
    };
  };
  
  export default MainPageSocket;
  