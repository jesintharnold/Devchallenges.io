export const Search=()=>{
    return(
        <div className="mx-4 my-4 bg-search rounded-lg flex items-center p-2">
        <span className="material-icons-outlined ml-1 mr-4">search</span>
        <input type="text" placeholder="Search" className="flex-1 w-0 caret-caert overflow-hidden bg-transparent text-caert text-lg font-sans outline-none"/>
        </div>
    );
};
