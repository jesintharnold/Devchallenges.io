function Chatmsg({msg,name,profileURL,date}){
    return (
    <div className="bg-transparent flex gap-4 my-8 first:my-0 first:mb-8 first:mt-4 font-medium">
        <img src={`${profileURL}`} className="w-10 h-10 rounded-md object-cover"/>
        <div className="flex flex-col">
            <div className="flex text-caert lg:gap-4 gap-3">
             <span className="font-bold text-sm md:text-base">{name}</span>
             <span className="text-xs md:text-sm self-start font-medium">{date}</span>
            </div>
            <p className="text-txtOpac  leading-6 mt-1  lg:mt-0 text-lg font-normal tracking-tight">{msg}</p>
        </div>
    </div>
    );
}

export default Chatmsg;