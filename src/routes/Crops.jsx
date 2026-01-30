import React, { useState } from "react";
import CropCard from "../components/CropCard.jsx";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { addCrop, removeCrop, updateCropStage } from "../store/slices/cropsSlice.js";

const Crops = () => {
  const dispatch = useDispatch();
  const crops = useSelector((state) => state.crops.crops);
  const { register, handleSubmit, reset } = useForm();
  
  // State for update stage modal
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [newStage, setNewStage] = useState("");

  const onSubmit = (data) => {
    const newCrop = {
      id: Date.now(),
      ...data,
      growthStage: "Seedling", // Default starting stage
      health: "Good",
      weatherImpact: "Low",
    };
    dispatch(addCrop(newCrop));
    reset();
  };

  const handleDelete = (id) => {
      if(window.confirm("Are you sure you want to delete this crop?")) {
          dispatch(removeCrop(id));
      }
  }

  const openUpdateModal = (crop) => {
      setSelectedCrop(crop);
      setNewStage(crop.growthStage);
      document.getElementById('update_stage_modal').showModal();
  }

  const handleUpdateStage = () => {
      if(selectedCrop) {
          dispatch(updateCropStage({ id: selectedCrop.id, stage: newStage }));
          document.getElementById('update_stage_modal').close();
      }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Crop Management</h1>
      </div>

      {/* Add New Crop Form */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Add New Crop</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Crop Name</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rice"
                  className="input input-bordered"
                  {...register("name", { required: true })}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Variety</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Basmati"
                  className="input input-bordered"
                  {...register("variety", { required: true })}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Planting Date</span>
                </label>
                <input
                  type="date"
                  className="input input-bordered"
                  {...register("plantingDate", { required: true })}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Area (acres)</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="1.0"
                  className="input input-bordered"
                  {...register("area", { required: true })}
                />
              </div>
            </div>
            <div className="form-control">
              <button type="submit" className="btn btn-primary w-full md:w-auto">
                Add Crop
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Crops Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {crops.map((crop) => (
          <CropCard
            key={crop.id}
            crop={crop}
            onDelete={handleDelete}
            onUpdate={openUpdateModal}
          />
        ))}
      </div>

        {/* Update Stage Modal */}
        <dialog id="update_stage_modal" className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg">Update Growth Stage for {selectedCrop?.name}</h3>
            <div className="py-4">
                <label className="label">Select New Stage:</label>
                <select 
                    className="select select-bordered w-full"
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value)}
                >
                    <option value="Seedling">Seedling</option>
                    <option value="Vegetative">Vegetative</option>
                    <option value="Flowering">Flowering</option>
                    <option value="Fruiting">Fruiting</option>
                    <option value="Maturation">Maturation</option>
                    <option value="Harvest">Harvest</option>
                </select>
            </div>
            <div className="modal-action">
            <form method="dialog">
                <button className="btn btn-ghost mr-2">Cancel</button>
                <button className="btn btn-primary" onClick={handleUpdateStage}>Update</button>
            </form>
            </div>
        </div>
        </dialog>

      {/* Crop Calendar (Static for now) */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Crop Calendar</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Crop</th>
                  <th>Planting</th>
                  <th>Germination</th>
                  <th>Vegetative</th>
                  <th>Flowering</th>
                  <th>Harvest</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Rice</td>
                  <td>Jan</td>
                  <td>Feb</td>
                  <td>Mar-Apr</td>
                  <td>May</td>
                  <td>Jun</td>
                </tr>
                <tr>
                  <td>Wheat</td>
                  <td>Nov</td>
                  <td>Dec</td>
                  <td>Jan-Feb</td>
                  <td>Mar</td>
                  <td>Apr</td>
                </tr>
                <tr>
                  <td>Corn</td>
                  <td>Jun</td>
                  <td>Jul</td>
                  <td>Aug-Sep</td>
                  <td>Oct</td>
                  <td>Nov</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crops;
