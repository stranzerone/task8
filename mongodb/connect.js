import mongoose from "mongoose";



 const Connect = async  (URL) => {
    
    try{
    await  mongoose.connect(URL).then(
        console.log("database connected")
    )


    } catch (err) {
        console.log("error while loding database",err)
    }

}

export default Connect;