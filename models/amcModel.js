const mongoose = require("mongoose");
const { Schema } = mongoose;

const clientSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
  },
  { timestamps: true }
);

const equipmentSchema = new Schema(
  {
    name: { type: String },
    serialNumber: { type: String },
    model: { type: String },
    location: { type: String },
  },
  { timestamps: true }
);

const amcSchema = new Schema(
  {
    client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
    equipment: [{ type: Schema.Types.ObjectId, ref: 'Equipment' }],
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    amount: { type: Number },
    currency: { type: String },
    status: {
      type: String,
      enum: ["Active", "Expired", "Terminated"],
      default: "Active",
    },
    term: { type: String },
    autoRenew: { type: Boolean, default: false },
    lastServiceDate: { type: Date },
    nextServiceDate: { type: Date },
  },  
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

amcSchema.virtual("contractDuration").get(function () {
  if (this.startDate && this.endDate) {
    const msPerDay = 1000 * 60 * 60 * 24;
    const duration = Math.ceil((this.endDate - this.startDate) / msPerDay);
    return `${duration} days`;
  }
  return null;
});

amcSchema.pre("save", function (next) {
  const today = new Date();
  if (this.endDate < today && this.status === "Active") {
    this.status = "Expired";
  }
  next();
});

amcSchema.index({ contractNumber: 1 });
amcSchema.index({ client: 1 });
amcSchema.index({ status: 1 });

const client = mongoose.model("Client", clientSchema);
const equipment = mongoose.model("Equipment", equipmentSchema);
const amcModel = mongoose.model("AMC", amcSchema);
module.exports = {client, equipment,amcModel};
