import { Text } from "../models/text.model.js";


export const createText = async(req,res)=>{

    try{
       const {content} = req.body;
       console.log("content",content);

        if(!content){
            return req.status(400).json({message:"Text is required"})
        }
        const text = await Text.create({
            content:content,
        })
        console.log("Text is successfully uploaded",text)
        return res.status(201).json(text)
  

     }catch(error){
      console.error("Something went wrong",error)
      return res.status(500).json({ message: "Something went wrong in the backend" });
    }
}

export const deltext = async(req,res)=>{
    try{
       const {id} = req.params;
     
       const content = await Text.findByPk(id);
       if(!content){
        return req.status(400).json({message:"Text is required"})
    }
    await content.destroy();
    res.status(200).json({ message: "text deleted successfully" });




    }catch(error){
        console.error("Something went wrong",error)

    }

}

export const gettextId = async(req,res)=>{
    try{
         const{id} = req.params;
        
         console.log("All data",id);

         const text = await Text.findByPk(id);
         if(!text){
            res.status(200).json({message:"couldnt get text by id "})

         }
         res.status(200).json(text);



    }catch(error){

        console.log("Something went wrong",error)

    }
  }
  
  export const updatetext =async(req,res)=>{
    try{
         const {id} = req.params;
         console.log("textid",id)
         const{content}=req.body;
         console.log("content",content)
         
         
         const contents = await Text.findByPk(id);
         console.log("textid",id)
         if(!contents){
            res.status(404).json({error:"text Id not found"});
         }
         
         contents.content=content;
         
         
         await contents.save();
         
         res.status(200).json({message:"Succesfully text updated"})


    }catch(error){
        console.error("Error updating text", error);
        res.status(500).json({ message: "Internal error" });



    }
  }
  export const getAllText = async (req, res) => {
    try {
      const texts = await Text.findAll();
      res.status(200).json(texts);
    } catch (error) {
      console.error("Error getting all texts:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };