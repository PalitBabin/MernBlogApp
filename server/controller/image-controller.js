import grid from 'gridfs-stream';
import mongoose from 'mongoose';

let gfs,gridfsBucket;
const conn = mongoose.connection;
conn.once('open',()=>{
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db,{
        bucketName : 'photos'
    });
    gfs = grid(conn.db,mongoose.mongo);
    gfs.collection('photos');
})

const URL = 'http://localhost:8000';
export const uploadImage = (req,res)=>{
        if(!req.file){
            return res.status(404).json({msg:'file not found'});
        }
        const imageUrl = `${URL}/file/${req.file.filename}`;
        return res.status(200).json(imageUrl);
    
}

export const getImage = async(req,res)=>{
    try{
        const file = await gfs.files.findOne({filename:req.params.filename});
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
    }catch(err){
        res.status(500).json({ msg: err.message });
    }
}

