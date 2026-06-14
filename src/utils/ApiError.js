
class ApiError extends Error {
    constructor(
        stausCode,
        message="something want to wrong",
        error=[],
        stack=""
    ){
        super(message)
        this.stausCode=stausCode
        this.data=null
        this.message=message
        this.success=false
        this.errors=errors

        if(this.stack){
            this.stack=stack
        } else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
};
export {ApiError};