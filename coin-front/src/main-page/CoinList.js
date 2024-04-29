export function getCoinList() {
    return new Promise((resolve, reject) => {
        const newSocket = new WebSocket("ws://172.30.92.184:8080/coin-list");

        newSocket.onopen = () => {
            console.log("WebSocket connected");
        };

        newSocket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                resolve(data);
            } catch (error) {
                reject(error);
            } finally {
                newSocket.close();
            }
        };

        newSocket.onclose = () => {
            console.log("WebSocket disconnected");
            reject("WebSocket disconnected");
        };
    });
}
