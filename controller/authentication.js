import jwt from 'jsonwebtoken'
import User from '../schema/userSchema.js'




export const addToken =async(req,res)=>{

const email = req.body.email

const secretKey="hello"
const expiresIn='1h'



const role = await User.findOne({email:email})

const type = role.role
console.log(role, role.role , "this is it")

const token = jwt.sign({email,type},secretKey, { expiresIn })

console.log(token)
res.status(200).json(token)
}



export const authentication = async(req,res,next)=>{
try{

    console.log(req.body.token)
   const token = req.body.token
    const verify = jwt.verify(token,"hello")

    if(verify){
        console.log("token verified",verify.type)

      
        next()
    }else{
        console.log("unauthorized user")
        res.status(404).json("you are not authenticated")
    }

}catch(error){
    console.error(error)
}

}



export const checker = async(req,res)=>{

try{
const token = req.body.token
    const verify = jwt.verify(token,"hello")
    const tokens =verify.type
console.log(tokens,"at admin")
    if(tokens==="Admin"){
        res.status(200).json("you are an admin")
    }else{
        res.status(401).json("you are not an admin")
    }


}catch(error){
    console.error(error)
}

}