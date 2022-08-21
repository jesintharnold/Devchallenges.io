import axios from 'axios';

const baseURL=`${process.env.REACT_APP_URL}`;

class FetchData{
    static async getAllChats(payload){
        try{
            let res=await axios.post(`${baseURL}/chat/getChatmessages`,{
                channelID:payload
            });
            return res.data;
       }catch(e){
              console.log(e);
       }
    }

    static async getAllChannels(){
        try{
           return await axios.get(`${baseURL}/chat/channel`).then((data)=>{
                if(data.data.length>0){
                  return data.data;
                }
            })
        }catch(e){
            console.log(e);
        }
    }

    static async createChannel(payload,options){
      try{
        console.log(options);
        return await axios.post(`${baseURL}/chat/channel`,payload,{cancelToken:options});
      }catch(err){
        return err.response;
      }
    }

    // Authentication Requests
    
}

export default FetchData;