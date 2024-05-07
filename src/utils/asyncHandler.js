<<<<<<< HEAD
export const asyncHandler = (requestHandler) => {
=======
export const asynchandler = (requestHandler) => {
>>>>>>> d72ae087c06d951df90d36590d6aa829bd7237c6
    return async (req, res, next) => {
      try {
        await requestHandler(req, res, next);
      } catch (error) {
        next(error); 
      }
    };
  };
  