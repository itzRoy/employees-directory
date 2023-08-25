import {Schema, model} from 'mongoose';

export type TDepartment = {
  label: string;
}
const departmentSchema = new Schema<TDepartment>(
  {
    label: {
      type: String,
      unique: true
    }
  }
);


const Department = model('departments', departmentSchema);

export default Department;
