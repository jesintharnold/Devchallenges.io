function Chatmsg({msg}){
    return (
    <div className="bg-transparent flex gap-4 my-8 first:my-0 first:mb-8 first:mt-4 font-medium">
        <img src="https://unsplash.com/photos/2LowviVHZ-E/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHx8fDE2NDQ0MTg1MzI&force=true&w=640" className="w-10 h-10 rounded-md object-cover"/>
        <div className="flex flex-col">
            <div className="flex text-caert lg:gap-4 gap-3">
             <span className="font-bold text-sm md:text-base">Nellie Francis</span>
             <span className="text-xs md:text-sm self-start font-medium">yesterday at 2:29 AM</span>
            </div>
            <p className="text-txtOpac  leading-6 mt-1  lg:mt-0 text-lg font-normal tracking-tight">{msg}</p>
        </div>
    </div>
    );
}

export default Chatmsg;