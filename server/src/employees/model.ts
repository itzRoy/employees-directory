import {Schema, Types, model} from 'mongoose';

export type TEmployee = {
    name?: string;
    title?: string;
    department: Types.ObjectId; 
    country: Types.ObjectId; 
    image?: string;
    isActive?: boolean;
}
const employeeSchema = new Schema<TEmployee>(
  {
    name: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: 'departments'
    },
    country: {
      type: Schema.Types.ObjectId,
      ref: 'countries'
    },
    image: {
      type: String
    },
    
    isActive: {
      type: Boolean,
      default: true
    }
    
  },
  {
    timestamps: true
  }
);

employeeSchema.index({ name: 'text', title: 'text', isActive: 'text' });

const Employee = model('employees', employeeSchema);

export default Employee;
