import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../schema/userSchema.js"

export const  signUp= async(req,res)=>{
    try{
const data = req.body

bcrypt.hash(data.password, 5,  (err, hash) => {
    if (err) {
      console.error('Error hashing password:', err);
      return;
    }
  
    const newUser = new User({name:data.name,password:hash,phone:data.phone,email:data.email,role:data.role})
 newUser.save()
   
  });


res.status(200).json("user added")



    }catch(error){
        console.error(error)

    }


}


export const login = async (req,res,next) => {
  try {
    console.log(req.body.email);
    const password = req.body.password;
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      // User not found
      console.log("User not found");
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const hashedPassword = user.password;

    const success = await bcrypt.compare(password, hashedPassword);

    if (success) {
      console.log('Password matched');
      
      next()










    
    } else {
      console.log('Password did not match');
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};



export const sendData =async(req,res)=>{
    const users = await User.find({})

  res.status(200).json({users})



}











export const updateData = async(req,res)=>{


try{
const data = req.body


const token = data.token

const verify =  jwt.verify(token,"hello")
const role = verify.type
console.log(role,"role of this")
if(role==='Basic'){

const emailIni = verify.email

const found =await User.findOneAndUpdate({email:emailIni},{data})

if(found){
  console.log(found,"user updated")
  res.status(200).json("user updated")
}else{
  console.log("user not updated")
}

}
if(role=="Admin"){

  const id =req.body.userId;
  console.log(id,data)
  const found =await User.findByIdAndUpdate(id,{phone:data.phone,email:data.email,name:data.name})
  
  if(found){
    console.log(found,"user updated")
    res.status(200).json("You have successfully updated")
  }else{
    console.log("user not updated")
  }
  

}




}catch(error){
  console.error(error)
}

}




export const deleteUser = async(req,res)=>{


  const userId = req.query.userId;
  console.log(userId)
  try{


    const user = await User.findByIdAndDelete(userId)

    if(user){
      res.status(200).json("user deleted success fully")

    }else{
      res.status(401).json("unable to delete")
    }

  }catch(error){
    console.error(error)
  }






}