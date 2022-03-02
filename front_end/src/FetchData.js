import axios from 'axios';

let baseURL="http://localhost:5000";
class FetchData{
    static async getAllChats(payload){
    
        try{
            let res=await axios.post(`${baseURL}/getmessage`,{
                channelID:payload
            });
            console.log(res);
            return res.data;
       }catch(e){
              console.log(e);
       }
    }

    static async getAllChannels(){
        try{
            await axios.get(`${baseURL}/channel`).then((data)=>{
                if(data.length>0){
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
        let res=await axios.post(`${baseURL}/channel`,payload,{cancelToken:options});
        return res;
      }catch(err){
        return err.response;
      }
    }
}

export default FetchData;