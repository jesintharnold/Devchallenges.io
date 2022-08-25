import Chatmsg from "./Message";
const Chatmessage=({channel,chats})=>{
    const options={year:'numeric',month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit',hour12:true}
    return (
        <>
        {
         chats[channel.channelId]?chats[channel.channelId].map((dat,index)=>
         <Chatmsg msg={dat.message} name={dat.IDNAME} key={index} date={new Date(parseInt(dat.timestamp)).toLocaleString('en-GB',options)} profileURL={`${dat.PROFILEURL}`}/>):<h1>No Message found</h1>
        } 
        </>
    )
}

export default Chatmessage;