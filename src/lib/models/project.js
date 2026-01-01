import { model, models, Schema } from "mongoose"

const ProjectSchema = new Schema({
    name:{
        type:String,required:true,unique:true
    },
    description:{type:String},
    active:{type:Boolean,default:true}
},{
    timestamps:true
})

const Project = models.Project || model("Project",ProjectSchema);

export default Project;