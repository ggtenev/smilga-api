const { StatusCodes } = require("http-status-codes")
const Job = require('../models/Job')
const {BadRequestError,NotFoundError} = require('../errors/index')

const getAllJobs = async (req, res) => {
  const userId = req.user.id
  console.log(userId);
  const jobs = await Job.find({createdBy:userId}).sort('createdAt')
  res.status(StatusCodes.OK).json({
    count:jobs.length,
    success: true,
    jobs
  })

}
const getJob = async (req, res) => {
  const userId = req.user.id
  const jobId = req.params.id
  const job = await Job.findOne({ _id: jobId, createdBy: userId })

  if (!job) {
    throw new NotFoundError('Job not found')
  }
  res.status(StatusCodes.OK).json({
    success: true,
    job
  })
}

const createJob = async (req, res) => {
  req.body.createdBy = req.user.id
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json(job)

}
const updateJob = async (req, res) => {
  const userId = req.user.id
  const jobId = req.params.id
  const { company, position } = req.body

  if (company === '' || position === '') {
    throw new BadRequestError('Company and position fields cannot be empty')
  }

  const job = await Job.findOneAndUpdate({ _id: jobId, createdBy: userId }, req.body, { new:true, runValidators: true })
  
  if (!job) {
    throw new NotFoundError('Job not found')
  }
  res.status(StatusCodes.OK).json({
    success: true,
    job
  })
}
const deleteJob = async (req, res) => {
  const userId = req.user.id
  const jobId = req.params.id

  const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId })
  if (!job) {
    throw new NotFoundError('No job with id ' + jobId + ' exists')
  }
  
  res.status(StatusCodes.OK).json({
    success:true
  })


}


module.exports = {getAllJobs,getJob,createJob,deleteJob,updateJob}