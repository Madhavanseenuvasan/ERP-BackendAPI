const mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema({
    module: { type: String, required: true },
    read: { type: Boolean, default: false },
    write: { type: Boolean, default: false }
});

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    emailAddress: { type: String, required: true, unique: true },
    phoneNumber: { type: String },
    userRole: { type: String, enum: ['Super Admin', 'Admin', 'Manager', 'Field Operator', 'Viewer', 'HR'], required: true },
    department: { type: String },
    status: { type: String, enum: ['active', 'inactive', 'deleted'], default: 'active' },
    lastLogin: { type: Date },
    password: { type: String, required: true },
    actions: [{ type: String }],
    permissions: [PermissionSchema],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
