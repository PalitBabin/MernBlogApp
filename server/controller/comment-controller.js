import Comment from "../model/comment.js"


export const newComment = async (request, response) => {
    try {
        const comment = new Comment(request.body);
        comment.save();

        response.status(200).json('Comment saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}


export const getComments = async (request, response) => {
    try {
        const comments = await Comment.find({ postId: request.params.id });
        
        response.status(200).json(comments);
    } catch (error) {
        response.status(500).json(error)
    }
}

export const deleteComment = async(req,res)=>{
    try{
        const comment = await Comment.findById(req.params.id);
        await comment.deleteOne();
        res.status(200).json({msg:'comment successfully deleted!'});
    }catch(err){
        res.status(500).json(error)
    }
}