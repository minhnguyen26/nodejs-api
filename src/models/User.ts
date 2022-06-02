import { model, Schema } from "mongoose";
import MongooseDelete, {
  SoftDeleteDocument,
  SoftDeleteModel,
} from "mongoose-delete";

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  UNDISCLOSED = "UNDISCLOSED",
}

export interface IUser extends SoftDeleteDocument {
  phone?: string;
  fullName: string;
  birthDate?: Date;
  address?: string;
  email: string;
  password?: string;
  gender: Gender;
  code:string
}

const UserSchema = new Schema<IUser>(
  {
    phone: {
      type: String,
      // required: false,
      // unique: true,
      validate: {
        validator: (value: string) =>
          RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$/).test(value),
        message: (props) => `${props.value} is not a valid phone number`,
      },
    },
    fullName: { type: String, required: true },
    birthDate: { type: Date },
    address: { type: String },
    email: { type: String, required: true },
    password: { type: String },
    gender: {
      type: String,
      enum: Gender,
      required: true,
      default: Gender.UNDISCLOSED,
    },
    code:{type: String}
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(MongooseDelete, {
  overrideMethods: true,
  deletedAt: true,
  deletedBy: true,
  deletedByType: Schema.Types.ObjectId,
});

const User = model<IUser>("User", UserSchema) as SoftDeleteModel<IUser>;
export default User;
