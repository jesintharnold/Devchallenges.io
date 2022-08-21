import {ADD_CHANNEL,GET_CHANNELS,MODAL,ADD_CHAT,SELECT_CHANNEL, GET_CHANNEL_CHATS,SELCT_CHANNEL_POPUP} from '../chatdispatchactions';

export const chatreducer=(state,action)=>{
switch(action.type){
    case GET_CHANNELS:
        return {...state,channellist:action.payload};
    case ADD_CHANNEL:
        return {...state,channellist:[...state.channellist,action.payload]};
    case MODAL:
        return {...state,modal:!state.modal};
    case ADD_CHAT:
        if(state.chats[action.payload.channelID.toString()]!==undefined){
    return {...state,...state.chats[action.payload.channelID.toString()].push({
        message:action.payload.message,
        timestamp:action.payload.timestamp,
        userID:action.payload.userID})};
        }else{
    return {...state,...state.chats[action.payload.channelID.toString()]=[{message:action.payload.message,
           timestamp:action.payload.timestamp,userID:action.payload.userID
           }]};
        };
    case SELECT_CHANNEL:
    return {...state,selectedchannel:{
        channelName:action.payload.channelName,
        channelId:action.payload.channelId,
        channelDesc:action.payload.channelDesc,
        checked:action.payload.bool
        }}
    case GET_CHANNEL_CHATS:
        return {...state,...state.chats[action.payload.channelID.toString()]=action.payload};
    case SELCT_CHANNEL_POPUP:
        return {...state,selectedchannel:{...state.selectedchannel,checked:!state.selectedchannel.checked}};
    default:
        return state;    
}
};