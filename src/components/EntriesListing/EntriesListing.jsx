"use client";
import { getMonthDate } from "@/lib/utils";
import React, { useState } from "react";
import TaskDetails from "../TaskDetails";
import { FiPlus } from "react-icons/fi";
import AddEntryPopup from "../AddEntryPopup";

const EntriesListing = ({ allEntries }) => {

    const [showModal,setShowModal] = useState(false)

  return (
    <div className="w-full flex flex-col gap-6">
      {!allEntries || allEntries.length === 0 ? (
        <div className="w-full h-[200px] flex justify-center items-center">
          <p className="text-secondary font-medium text-14 leading-5 tracking-0">
            No records found.
          </p>
        </div>
      ) : (
        allEntries?.map((entry, index) => (
          <div
            key={`entry-${index}`}
            className="w-full grid [grid-template-columns:minmax(100px,1fr)_minmax(100px,8.625fr)] "
          >
            <div>
              <p className="font-semibold text-18 leading-5 tracking-0">
                {getMonthDate(entry.date)}
              </p>
            </div>
            <div className="w-full flex flex-col gap-2.5">
              {entry.tasks.length > 0 &&
                entry.tasks.map((task, taskIndex) => {
                  return <TaskDetails key={`task-${taskIndex}`} task={task} />;
                })}
              <div onClick={()=>setShowModal(true)} className="w-full hover:bg-[#E1EFFE] rounded-lg border border-[#D1D5DB] hover:border-primary-dark transition-colors border-dashed py-2.5 flex justify-center items-center cursor-pointer">
                <div className="flex items-center gap-2">
                  <FiPlus className="text-primary-dark" />
                  <p className="font-medium text-base leading-5 tracking-0 text-primary-dark">
                    Add new task
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      <AddEntryPopup showModal={showModal} setShowModal={setShowModal}/>
    </div>
  );
};

export default EntriesListing;
