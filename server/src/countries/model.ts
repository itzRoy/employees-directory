import {Schema, model} from 'mongoose';

export type TCountry = {
  label: string;
}
const countrySchema = new Schema<TCountry>(
  {
    label: {
      type: String,
      unique: true
    }
  }
);


const Country = model('countries', countrySchema);

export default Country;
