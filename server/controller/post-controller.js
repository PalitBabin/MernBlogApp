import Post from "../model/post.js";


export const createPost = async (req, res) => {
    try {
        const post = await new Post(req.body);
        post.save();

        return res.status(200).json('Post saved successfully');

    } catch (err) {
        return res.status(500).json(err);
    }
}

export const getAllPosts = async (req, res) => {
    let category = req.query.category;
    let posts;
    try {
        if (category) {
            posts = await Post.find({ categories: category });
        } else {
            posts = await Post.find({});
        }
        return res.status(200).json(posts);
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post);
    } catch (err) {
        return res.status(500).json({ msh: err.msg });
    }
}

export const updatePost = async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
             return res.status(404).json({msg:'post not found!'});
        }
        await Post.findByIdAndUpdate(req.params.id,{$set:req.body});

         return res.status(200).json({msg:'post successfully updated.'})

    }catch(err){
         return res.status(500).json({error:err.message});
    }
}

export const deletePost = async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({msg:'post not found!'});
        }

        await post.deleteOne();

        return res.status(200).json({msg:'post deleted successfully!'})
    }catch(err){
        return res.status(500).json({error:err.message});
    }
}