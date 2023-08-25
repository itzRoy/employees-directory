import {Schema, Types, model} from 'mongoose';

export type TEmployee = {
    name?: string;
    title?: string;
    department: Types.ObjectId; 
    country: Types.ObjectId; 
    image?: string;
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
    }
  },
  {
    timestamps: true
  }
);


const Employee = model('employees', employeeSchema);

export default Employee;
