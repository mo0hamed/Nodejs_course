import Job from '../models/job.model.js'
import Company from '../models/company.model.js'
import Application from '../models/App.model.js'
import User from '../models/user.model.js'


export const addJob = async (req, res) => {
  const {
    companyName,
    jobTitle,
    jobDescription,
    jobLocation,
    seniorityLevel,
    workingTime,
    technicalSkills,
    salary
  } = req.body
  const addedBy = req.user.id
  try {
    const company = await Company.findOne({ companyName })
    if (!company) {
      return res.status(404).json({ message: 'Company not found' })
    }

    if (req.user.role !== 'Company_HR' || company.companyHR.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    const newJob = new Job({
      companyName,
      jobTitle,
      jobDescription,
      jobLocation,
      seniorityLevel,
      workingTime,
      technicalSkills,
      salary,
      addedBy
    })

    await newJob.save()

    res.status(201).json({ message: 'Job added successfully', job: newJob })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}


export const updateJob = async (req, res) => {
  const { jobId } = req.params
  const {
    jobTitle,
    jobDescription,
    jobLocation,
    seniorityLevel,
    workingTime,
    technicalSkills,
    salary,
    addedBy
  } = req.body
  
  try {
    const job = await Job.findById(jobId)
    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }

    

    if (req.user.role !== 'Company_HR') {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    job.jobTitle = jobTitle || job.jobTitle
    job.jobDescription = jobDescription || job.jobDescription
    job.jobLocation = jobLocation || job.jobLocation
    job.seniorityLevel = seniorityLevel || job.seniorityLevel
    job.workingTime = workingTime || job.workingTime
    job.technicalSkills = technicalSkills || job.technicalSkills
    job.salary = salary || job.salary
    job.addedBy=job.addedBy

    await job.save()

    res.status(200).json({ message: 'Job updated successfully', job })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

export const deleteJob = async (req, res) => {
  const { jobId } = req.params

  try {
    const job = await Job.findById(jobId)
    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }

    await job.remove()

    res.status(200).json({ message: 'Job deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()

    res.status(200).json({ jobs })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}
