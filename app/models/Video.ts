import mongoose,{Schema,model,models} from "mongoose";

export const VIDEO_DIMANTIONS = {
    width: 1080,
    height: 1920
} as const;

export interface IVideo {
    _id?: mongoose.Types.ObjectId;
    title: string;
    description: string;
    videoUrl: string;
    thumbnaiUrl: string;
    controls?: boolean;
    transformation?: {
        height : number;
        width : number;
        quality : number;
    }
}


const videoSchema = new Schema<IVideo>({
    title: {type: String, required: true},
    description:{type: String, required: true},
    videoUrl:{type: String, required: true},
    thumbnaiUrl: {type: String, required: true},
    controls: {type: Boolean, default: true},
    transformation: {
        height: {type: Number, default: VIDEO_DIMANTIONS.height},
        width: {type: Number, default: VIDEO_DIMANTIONS.width},
        quality: {type: Number, min:1, max: 100 }
    }
},{timestamps: true});


export const Video = models?.Video || model<IVideo>('Video', videoSchema);