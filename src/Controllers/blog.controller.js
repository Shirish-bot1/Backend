
import { Blog } from "../models/blog.models.js"

 export const uploadblog = async(req,res)=>{
    try{
        const{title,content} = req.body;
        console.log("data",title);
        const imageUrl =req.imageUrl;
        console.log("imageurl",imageUrl)

        if(!imageUrl){
            res.status(400).json({message:"Image URL "})
        }
        const blogs = await Blog.create({title:title,content:content,
            imageUrl:`/uploads/${file.filename}`,
        })
        console.log("Uploaded successfulyy",blogs);
        res.status(201).json(blogs)


 
    }catch(error){
        console.error("Somethin went wrong");
        res.status(200).json({message:"Something went wrong in back"})
  
 
    }
}

  export const getblog = async(req,res)=>{
    try{
        const blogs = await Blog.findAll();
        console.log("Fetched",blogs)
        res.status(400).json(blogs);


    }catch(error){
        console.error("Something went wrong",error);



    }
}

  export const getblogId = async(req,res)=>{
    try{
         const{blogId} = req.params;
        
         console.log("All data",blogId);

         const blogs = await Blog.findByPk(blogId);
         if(!blogs){
            res.status(200).json({message:"couldnt get blog by id "})

         }
         res.status(200).json(getblogId);



    }catch(error){

        console.log("Something went wrong",error)

    }
  }