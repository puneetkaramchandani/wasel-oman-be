const { isEmpty } = require("lodash");
const { COMPLAINT_FILTER } = require("../constants");
const Complaint = require("../models/complaint");
const { ExpressError } = require("../utils");

module.exports = {
  createNewComplaint,
  getMyComplaints,
  getAllComplaints,
  editComplaint,
};

async function getAllComplaints(filters) {
  let complaints = [];
  const filterGroup = {};
  Object.keys(filters).forEach((key) => {
    if (COMPLAINT_FILTER.includes(`${key}`))
      filterGroup[`${key}`] = filters[`${key}`];
    else throw new ExpressError(`Filter type ${key} is not supported`, 400);
  });
  if (isEmpty(filters)) {
    complaints = await Complaint.find();
  } else {
    complaints = await Complaint.find({ ...filterGroup });
  }
  return { complaints };
}

async function getMyComplaints(user, filters) {
  let complaints = [];
  const filterGroup = {};
  Object.keys(filters).forEach((key) => {
    if (COMPLAINT_FILTER.includes(`${key}`))
      filterGroup[`${key}`] = filters[`${key}`];
    else throw new ExpressError(`Filter type ${key} is not supported`, 400);
  });
  if (isEmpty(filters)) {
    complaints = await Complaint.find({ user });
  } else {
    complaints = await Complaint.find({ ...filterGroup, user });
  }
  return { complaints };
}

async function createNewComplaint(data, user) {
  const complaint = new Complaint({
    ...data,
    user: user,
  });
  await complaint.save();
  return { complaint };
}

async function editComplaint(data) {
  const { complaint_id, complaint_data } = data;
  await checkIfComplaintExists(complaint_id);
  const complaint = await Complaint.findByIdAndUpdate(
    complaint_id,
    { ...complaint_data },
    { new: true, runValidators: true }
  );
  return { complaint };
}

async function checkIfComplaintExists(complaint_id) {
  const complaint = await Complaint.findById(complaint_id);
  if (isEmpty(complaint)) {
    throw new ExpressError("Complaint not found", 400);
  } else return;
}
