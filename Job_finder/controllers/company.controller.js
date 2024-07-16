import Company from '../models/company.model.js'
import User from '../models/user.model.js'

export const addCompany = async (req, res) => {
  const { companyName, description, industry, address, numberOfEmployees, companyEmail } = req.body
  const companyHR = req.user.id
  try {
    if (req.user.role !== 'Company_HR') {
      console.log('Unauthorized access attempt')
      return res.status(403).json({ message: 'Unauthorized' })
    }

    const newCompany = new Company({ companyName, description, industry, address, numberOfEmployees, companyEmail, companyHR })
    await newCompany.save()

    res.status(201).json({ message: 'Company added successfully', company: newCompany })
  } catch (error) {
    console.error('Error adding company:', error)
    res.status(500).json({ message: 'Server error', error })
  }
}

export const updateCompany = async (req, res) => {
  const { companyId } = req.params
  const { companyName, description, industry, address, numberOfEmployees, companyEmail } = req.body

  try {
    if (req.user.role !== 'Company_HR') {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    const company = await Company.findById(companyId)

    if (!company) {
      return res.status(404).json({ message: 'Company not found' })
    }

    if (company.companyHR.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    company.companyName = companyName || company.companyName
    company.description = description || company.description
    company.industry = industry || company.industry
    company.address = address || company.address
    company.numberOfEmployees = numberOfEmployees || company.numberOfEmployees
    company.companyEmail = companyEmail || company.companyEmail

    await company.save()

    res.status(200).json({ message: 'Company updated successfully', company })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

export const deleteCompany = async (req, res) => {
  const { companyId } = req.params

  try {
    if (req.user.role !== 'Company_HR') {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    const company = await Company.findById(companyId)

    if (!company) {
      return res.status(404).json({ message: 'Company not found' })
    }

    if (company.companyHR.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    await company.remove()

    res.status(200).json({ message: 'Company deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

export const getCompanyData = async (req, res) => {
  const { companyId } = req.params

  try {
    if (req.user.role !== 'Company_HR') {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    const company = await Company.findById(companyId).populate('companyHR')

    if (!company) {
      return res.status(404).json({ message: 'Company not found' })
    }

    if (company.companyHR._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    res.status(200).json({ company })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

export const searchCompanyByName = async (req, res) => {
  const { name } = req.query

  try {
    if (req.user.role !== 'Company_HR' && req.user.role !== 'User') {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    const companies = await Company.find({ companyName: new RegExp(name, 'i') })

    res.status(200).json({ companies })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

export const getApplicationsForJob = async (req, res) => {
  const { jobId } = req.params

  try {
    if (req.user.role !== 'Company_HR') {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    const company = await Company.findOne({ companyHR: req.user.id })
    if (!company) {
      return res.status(404).json({ message: 'Company not found' })
    }

    const applications = await applications.find({ jobId }).populate('userId')

    res.status(200).json({ applications })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}
