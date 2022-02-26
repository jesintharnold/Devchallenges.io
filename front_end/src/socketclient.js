
let socketcon;
class Client{
   
    static setSocket(socket){
        socketcon=socket;
    }
    static sendMessage(payload){
        socketcon.emit("SENDMESSAGE",payload);
    }
    static joinRoom(payload){
        socketcon.emit("JOINROOM",payload);
    }
      
}


export default Client;
