import React from "react";
import ActionMenu from "../ActionMenu";

const TaskDetails = ({task}) => {
  return (
    <div className="w-full border border-[#E5E7EB] rounded-lg py-2.5 px-3">
      <div className="w-full flex justify-between items-center">
        <p className="font-medium text-base leading-5 tracking-0">
          {task.name}
        </p>
        <div className="flex items-center">
          <p className="font-normal text-14 leading-25 tracking-0 text-[#9CA3AF] mr-2.5">
            {task.hours} hrs
          </p>
          <p className="bg-[#E1EFFE] py-0.5 px-2.5 rounded-md mr-4">
            <span className="font-medium text-12 leading-5 tracking-0 text-[#1E429F]">
              {task.projectName}
            </span>
          </p>
          <ActionMenu />
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
