
let socketcon;
class Client{
   
    static setSocket(socket){
        socketcon=socket;
    }

    static sendMessage(payload){
        console.log(socketcon);
        socketcon.emit("sendMessage",payload);
    }


    static joinRoom(payload){
        socketcon.emit("join",payload);
    }

    
}
export default Client;
