
import { Book } from '../models/books.models.js';









export const createBook = async (req, res) => {
    try {
      
      const { title, author } = req.body;
      const { file } = req;
  
      if (!file) {
        return res.status(400).json({ message: 'File is required' });
      }
  
      const newBook = await Book.create({
        title,
        author,
        url: `/uploads/${file.filename}`,
      });
  
      res.status(201).json(newBook);
    } catch (error) {
      console.error('Error creating book:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

export const getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    console.log('bookid',bookId)

  
    if (!bookId) {
      return res.status(400).json({ message: "Book ID is required" });
    }

  
    const book = await Book.findByPk(  bookId  );

   
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }


    await Book.destroy({ where: { id: bookId } });


    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
   
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
 
 export const updatebook = async(req,res)=>{
     try{
       const bookId =  req.params.bookId;
       console.log('bookid',bookId)
       const{author,title}=req.body;
       const{file}=req;
       const book = await Book.findByPk(bookId);
       console.log("book",book)
       if(!book){
          return res.status(404).json({error:"file not found"});
       }
       book.author = author;
       book.title = title;
       book.url = file ? `/uploads/${file.filename}` : book.url;
       await book.save();

       res.status(200).json({message:"successfully updated book"})

  
  
   }catch(error){
    console.error("Error updating books", error);
    res.status(500).json({ message: "Internal error" });


   }
 

 }
