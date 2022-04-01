class APIError extends Error{
constructor({name, message, isOperational=true, statusCode}){
super(message);
this.statusCode=statusCode;
this.name=name;
this.isOperational=isOperational;
Object.setPrototypeOf(this,new.target.prototype);
Error.captureStackTrace(this);
};

};

module.exports=APIError;