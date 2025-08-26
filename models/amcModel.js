const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AMCContractSchema = new Schema({
  customer: { type: String, required: true }, 
  equipmentProducts: [{ type: String }],      
  emergencyContactHours: { type: String },    
  coverageArea: { type: String },             
  responseTime: { type: Number },            
  survey: {
    date: { type: Date },
    siteConditions: { type: String },
    surveyor: { type: String },
    accessibility: { type: String },
    powerRequirements: { type: String },
    environmentalFactors: { type: String },
    recommendations: { type: String }
  },                                         
  equipmentAssessment: [{
    equipmentName: { type: String },
    age: { type: Number },
    maintenanceHistory: { type: String },
    recommendedSchedule: { type: String, enum: ['Monthly', 'Weekly', 'Quarterly', 'Bi-annual'] },
    overallCondition: { type: String, enum: ['Excellent', 'Good', 'Fair', 'Poor'] },
    estimatedAnnualPartsCost: { type: Number }
  }],                                         // Assessment for each equipment [attached_file:1]
  servicePlanning: {
    visitFrequency: { type: String, enum: ['Monthly', 'Weekly', 'Quarterly', 'Bi-annual'] },
    serviceTypesIncluded: [{ type: String, enum: ['Preventive Maintenance', 'Predictive Maintenance', 'Emergency Response'] }],
    visitDuration: { type: Number },
    requiredSkills: [{ type: String, enum: ['Electrical', 'Mechanical', 'Electronics', 'Fuel Systems', 'Controls'] }],
    partsWarrantyMonths: { type: Number },
    partsConsumablesIncluded: { type: Boolean }
  },                                          // Service plan details [attached_file:1]
  contractDetails: {
    startDate: { type: Date },
    endDate: { type: Date },
    contractValue: { type: Number },
    termsAndConditions: { type: String },
    renewalTerms: { type: String },
    billingCycle: { type: String, enum: ['Monthly', 'Quarterly', 'Half-yearly', 'Yearly'] },
    scheduledVisits: { type: Number },
    discountPercent: { type: Number }
  },                                         
  products: [{ type: String }],               
  durationMonths: { type: Number },           
  status: { type: String, enum: ['Draft', 'Active', 'Expired', 'Renewed'], default: 'Draft' }
}, { timestamps: true });

module.exports = mongoose.model('AMCContract', AMCContractSchema);