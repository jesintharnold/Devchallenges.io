

function nameSpace(name){
let o=name.split(" ",2);
return o[0].charAt(0)+o[1].charAt(0);
}


function Namebox({channelName,channelID,setChannel}){
    return(
        <div className="flex items-center box-border my-3 last:lg:mb-6 last:mb-20" onClick={()=>setChannel({
            channelName:channelName,
            channelId:channelID,
            checked:true
          })}>
         <span className="text-base  font-bold bg-search px-2 py-1 rounded-md uppercase">{`${nameSpace(channelName)}`}</span>
         <span className=" text-sm ml-4  font-semibold  text-txt uppercase">{channelName}</span>
        </div>
    )
}
export default Namebox;