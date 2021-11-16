import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  nickName: {
    type: String,
    required: false,
    default: "",
  },
  emailAddress: {
    type: String,
    required: false,
    default: "",
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  languages: {
    type: [],
    required: false,
  },
  difficulty: {
    type: [],
    required: false,
  },
  lastUpdate: {
    type: Date,
    required: true,
  },
});

const Profile = mongoose.model("Profile", ProfileSchema);

export default Profile;
