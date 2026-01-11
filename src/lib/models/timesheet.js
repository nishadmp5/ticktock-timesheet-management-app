import { model, models, Schema } from "mongoose"

const TimeEntrySchema = new Schema({
    project:{
        type:Schema.Types.ObjectId,
        ref:"Project",
        required:true
    },
    taskDescription:{type: String,required:true},
    workType:{
        type:String,
        enum:["Development", "Meeting", "Testing", "Documentation"],
        default: "Development"
    },
    hours:{type:Number,required:true,min:0},
    date:{type:Date,required:true}
})

const TimesheetSchema= new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    year:{type:Number,required:true},
    weekNumber:{type:Number,required:true},

    weekStartDate: { type: Date, required: true },
    weekEndDate: { type: Date, required: true },

    status: { 
      type: String, 
      enum: ["DRAFT", "SUBMITTED", "APPROVED"], 
      default: "DRAFT" 
    },
    
    entries: [TimeEntrySchema],
},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
})

TimesheetSchema.virtual('totalHours').get(function(){
    return this.entries.reduce((total,entry)=> total + entry.hours,0)
})

TimesheetSchema.index({user:1,year:1,weekNumber:1},{unique:true})

const Timesheet = models.Timesheet || model("Timesheet",TimesheetSchema);

export default Timesheet