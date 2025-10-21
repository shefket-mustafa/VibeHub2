import { useEffect, useState } from "react";
import type { User } from "../types/TStypes";
import { useUser } from "../hooks/user";

export default function EditProfile(){

    const { user } = useUser();
    const [formData, setFormData] = useState<User>({
        id: "string",
        username: "",
        email: "",
        bio: "",
        age: "",
        city: "",
        profilePicture: ""
    });

    const [preview, setPreview] = useState<string>("");


    useEffect(() => {

        if(user){
            setFormData({
                id: user.id || "",
                username: user.username || "",
                email: user.email || "",
                bio: user.bio || "",
                age: user.age || "",
                city: user.city || "",
                profilePicture: user.profilePicture || ""
            })
        };
    },[user])




    return(

        <div className="max-w-2xl mx-auto py-10 px-5 text-white">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

      <form  className="space-y-5">
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <img
            src={
              preview ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Profile preview"
            className="w-24 h-24 rounded-full object-cover border-2 border-orange-500"
          />
          <label className="mt-3 cursor-pointer text-orange-400 hover:text-orange-500">
            Change Picture
            <input
              type="file"
              accept="image/*"
            //   onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Name</label>
          <input
            type="text"
            name="username"
            value={formData?.username}
            // onChange={handleChange}
            className="w-full rounded-lg bg-neutral-900 border border-neutral-700 px-3 py-2 text-white focus:outline-none focus:border-orange-500"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Bio</label>
          <textarea
            name="bio"
            value={formData?.bio}
            // onChange={handleChange}
            rows={4}
            className="w-full rounded-lg bg-neutral-900 border border-neutral-700 px-3 py-2 text-white focus:outline-none focus:border-orange-500 resize-none"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Age</label>
          <input
            type="number"
            name="age"
            value={formData?.age ?? ""}
            // onChange={handleChange}
            className="w-full rounded-lg bg-neutral-900 border border-neutral-700 px-3 py-2 text-white focus:outline-none focus:border-orange-500"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm text-neutral-400 mb-1">City</label>
          <input
            type="text"
            name="city"
            value={formData?.city}
            // onChange={handleChange}
            className="w-full rounded-lg bg-neutral-900 border border-neutral-700 px-3 py-2 text-white focus:outline-none focus:border-orange-500"
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="w-full mt-6 bg-orange-500 text-black py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );

}