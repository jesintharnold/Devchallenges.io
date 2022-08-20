let socketcon;
class Client{
   
    static setSocket(socket){
        socketcon=socket;
    }
    static sendRoomsg(payload){
        socketcon.emit("roommessage",payload);
    }

    // static joinRoom(payload){
    //     socketcon.emit("JOINROOM",payload);
    // }

    static sendchannel(payload){
        socketcon.emit('channel',payload);
    }

    static socketinstance(){
        return socketcon;
    }
      
}


export default Client;