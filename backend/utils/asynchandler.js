export const asynchandler=(handler)=>(async(req,res,next)=>{
    return await Promise.resolve(handler(req,res,next)).catch((err)=>next(err))
})