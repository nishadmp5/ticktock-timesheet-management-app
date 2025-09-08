"use client";
import React from "react";
import Modal from "../Modal";
import { IoIosClose } from "react-icons/io";
import { InformedForm, InformedReactSelect } from "../InformedForm";

const AddEntryPopup = ({ showModal, setShowModal }) => {
  const project_list = [
    {
      label: "Website Development for ABCD",
      id: 1,
      value: 1,
    },
    {
      label: "Bench Tasks",
      id: 2,
      value: 2,
    },
    {
      label: "Web Application -- KlPQ ",
      id: 3,
      value: 3,
    },
  ];

  const work_types_list = [
    {
      label: "Website Development for ABCD",
      id: 1,
      value: 1,
    },
    {
      label: "Bench Tasks",
      id: 2,
      value: 2,
    },
    {
      label: "Web Application -- KlPQ ",
      id: 3,
      value: 3,
    },
  ];
  return (
    <Modal show={showModal} handleClose={() => setShowModal(false)}>
      <div className="w-full bg-white flex flex-col rounded-lg overflow-hidden">
        <div className="p-5 flex items-center justify-between border-b border-b-[#E5E7EB]">
          <p className="text-18 font-semibold leading-5 text-secondary-dark">
            Add New Entry
          </p>
          <IoIosClose
            onClick={() => setShowModal(false)}
            className="text-[2rem] text-[#9CA3AF] cursor-pointer"
          />
        </div>
        <InformedForm>
        <div className="p-5 flex flex-col gap-4">
          <div className="max-w-91 w-full flex flex-col gap-4">
            <InformedReactSelect
              id="project *"
              name="project"
              label="Select Project *"
              options={project_list}
              placeholder="Project Name"
              required
            />
             <InformedReactSelect
              id="work_type *"
              name="work_type"
              label="Type of Work *"
              options={work_types_list}
              required
            />
          </div>
        </div>
        </InformedForm>
        <div className="p-5 flex items-center justify-between gap-4 border-t border-t-[#E5E7EB]">
          <button className="w-full rounded-lg bg-primary hover:bg-primary-dark transition-all. cursor-pointer text-14 font-medium leading-5  p-2 text-white">
            Add entry
          </button>
          <button className="w-full rounded-lg bg-white hover:bg-[#E5E7EB] transition-all cursor-pointer text-12 font-medium leading-5 border border-[#E5E7EB]  p-2 text-secondary-dark ">
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddEntryPopup;
