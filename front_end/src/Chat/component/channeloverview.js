import Member from "./Member"

function Channeloverview({setChannel,channel}){

    return (
            <div className={"absolute left-0 top-0 flex h-full lg:h-[90%] w-[16rem] lg:w-72   flex-col z-30 -translate-x-full transition duration-200 ease-in-out bg-side "+(channel.checked?'-translate-x-0':'')}>
    <div className="flex  text-center items-center px-4 py-2 justify-start shadow-ol box-border  relative">
       <span className="material-icons-outlined bg-transparent cursor-pointer text-xl" onClick={()=>setChannel({...channel,checked:!channel.checked})}>arrow_back_ios</span>
       <span className="text-xl font-sans font-bold ml-6">Channels</span>  
    </div> 
    <div className="overflow-y-scroll scroll-hide px-4">
    <div className="mt-6">
      <span className="text-txt font-bold text-lg font-sans mb-4 block">{channel.channelName}</span>
      <p className="text-base leading-5 font-sans font-normal text-txt mb-4">{channel.channelDesc}</p>
    </div>
    <span className="my-2 uppercase font-bold text-base block text-txt font-sans">Members</span>
    <div className="my-1">
    <Member src="https://cdn.pixabay.com/photo/2016/03/26/22/13/man-1281562_960_720.jpg" name="Xanthe Neal" status="Online"/>
    <Member src="https://cdn.pixabay.com/photo/2016/03/26/22/13/man-1281562_960_720.jpg" name="Annaliese Huynh" status="Off"/>
    </div>
    </div>
    </div>
    )
}

export default Channeloverview;