import { Complain } from "../models/complain.models.js";



export const registerComplain = async(req,res)=>{
    
        const{name,phone,address,age,sex,details} = req.body;
        console.log("received data",req.body)
        
  if (![name,phone,address,age,sex,details].every((field) => field && field.trim() !== "")) {
    console.log("Missing required fields:", name,phone,address,age,sex,details);
    throw new ApiError(400, "All fields are required");
  }
 if(!['male','female'].includes(sex)){
    return res.status(400).json({message:"sex mus be wither male or female"})
 }
  const complain = await Complain.create({
    name:name,
    phone:phone,
    address:address,
    age:age,
    sex:sex,
    details:details,
  })
  console.log("Registered",complain);
  res.status(202).json({message:"resgitered",complain})
  if(!complain){
    console.error("Complain submission failed")
  }}

   
  export const getcomplain = async (req, res) => {
    try {
        const complains = await Complain.findAll();
        if (!complains|| complains.length === 0) {
            return res.status(404).json({ message: "complain req not found" });
        }
        res.status(200).json(complains);
    } catch (error) {
        console.error("Error fetching complains", error);
        res.status(500).json({ message: "Internal server problems" });
    }
  };
   export const getyourcomplain = async(req,res)=>{
    try{
      const  complainId = req.params.complainId;
      console.log("id",complainId);
      const complains = await Complain.findByPk(complainId);
    
      if(!complains){
        return res.status(404).json({message:"cannot get your id "});
      }
      res.status(200).json(complains);
    }catch(error){
      console.error("error while fetching",error);
      res.status(404).json({message:"cannot get your complain"})

    }
  }
   

   export const delcomplain = async(req,res)=>{
     try{
         const complainId = req.params.complainId;
         const complains  = await Complain.findByPk(complainId);
         console.log("Complain ",complains);
         if(!complains){
            res.status(400).json({message:"complain if not found"})
         }
          
          await Complain.destroy(complainId);
          res.status(200).json({message:"successfullydleete"})
         
     }catch(error){
        console.log("something went wrong",error)

     }
   }