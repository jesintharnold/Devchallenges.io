

function nameSpace(name){
let o=name.split(" ",2);
if(o.length>1){
return `${o[0].charAt(0)+o[1].charAt(0)}`;
}
return `${o[0].charAt(0)}`;
}


function Namebox({channel,setChannel}){
    return(
        <div className="flex items-center box-border my-3 last:lg:mb-6 last:mb-20" onClick={()=>{setChannel({
            channelName:channel.channelName,
            channelId:channel._id,
            checked:true,
            channelDesc:channel.channelDesc
          });
          //fetchfunc(channel._id);
        }}>
         <span className="text-base w-10 h-10 flex justify-center items-center rounded-md  font-bold bg-search text-center uppercase">{`${nameSpace(channel.channelName)}`}</span>
         <span className=" text-sm ml-4  font-semibold  text-txt uppercase">{channel.channelName}</span>
        </div>
    )
}
export default Namebox;