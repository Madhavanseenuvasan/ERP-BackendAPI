const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AMCContractSchema = new mongoose.Schema(
  {
    contractName: {
      type: String,
      required: true,
      trim: true,
    },
    customer: {
      type: String,
      required: true,
      trim: true,
    },
    contractValue: {
      type: String, // Could also be Number if it's monetary
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    billingCycle: {
      type: String,
      enum: ["Monthly", "Quarterly", "Half-Yearly", "Yearly"], // example cycles
    },
    scheduledVisits: {
      type: String,
    },
    termsConditions: {
      type: String,
    },
    renewalTerms: {
      type: String,
    },
    contractEquipment: {
      type: String,
    },
    inquiryEquipment: {
      type: String,
    },
    coverageArea: {
      type: String,
    },
    emergencyHours: {
      type: String,
    },
    responseTime: {
      type: String,
    },
    surveyDate: {
      type: Date,
    },
    surveyor: {
      type: String,
    },
    siteConditions: {
      type: String,
    },
    accessibility: {
      type: String,
    },
    powerRequirements: {
      type: String,
    },
    environmentalFactors: {
      type: String,
    },
    recommendations: {
      type: String,
    },
    equipmentAge: {
      type: String,
    },
    overallCondition: {
      type: String,
    },
    maintenanceHistory: {
      type: String,
    },
    recommendedSchedule: {
      type: String,
    },
    annualPartsCost: {
      type: String,
    },
    visitFrequency: {
      type: String,
    },
    visitDuration: {
      type: String,
    },
    partsWarranty: {
      type: String,
    },
    requiredSkills: {
      type: [String],
      default: [],
    },
    partsIncluded: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Draft", "Active", "Expired", "Terminated"],
      default: "Draft",
    },
    progress: {
      type: String,
      enum: ["Not Started", "Ongoing", "Completed"],
      default: "Not Started",
    },
  },
  {
    timestamps: true, // Automatically add createdAt & updatedAt
  }
);


module.exports = mongoose.model('AMCContract', AMCContractSchema);