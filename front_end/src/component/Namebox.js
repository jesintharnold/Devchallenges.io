

function nameSpace(name){
let o=name.split(" ",2);
return o[0].charAt(0)+o[1].charAt(0);
}


function Namebox({channelName,channelID,setChannel}){
    return(
        <div className="flex items-center box-border my-2" onClick={()=>setChannel({
            channelName:channelName,
            channelId:channelID,
            checked:true
          })}>
         <span className="text-lg font-bold bg-search px-2 py-1 rounded-md uppercase">{`${nameSpace(channelName)}`}</span>
         <span className="ml-4 text-base font-semibold  text-txt uppercase">{channelName}</span>
        </div>
    )
}
export default Namebox;