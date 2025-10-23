import { useEffect, useState, type ChangeEvent } from "react";
import { useUser } from "../hooks/user";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import {
  editProfileSchema,
  type EditProfileType,
} from "../zod/editProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function EditProfile() {
  const baseUrl = import.meta.env.VITE_API_URL;
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);

  const [preview, setPreview] = useState<string>("");
  const {
    register,
    handleSubmit,
    reset,
    // watch,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<EditProfileType>({ resolver: zodResolver(editProfileSchema) });

  useEffect(() => {
    if (user) {
      reset({
        username: user.username || "",
        bio: user.bio || "",
        age: user.age || "",
        city: user.city || "",
        country: user.country || "",
      });
      setPreview(user.profilePicture || "");
    }
  }, [user]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected)); //showing preview immediately
    }
  };

  const onSubmit = async (data: EditProfileType) => {
    try {
      const form = new FormData();
      form.append("username", data.username || "");
      form.append("bio", data.bio || "");
      form.append("age", data.age ?? "");
      form.append("city", data.city || "");
      form.append("country", data.country || "");
      if (file) form.append("profilePicture", file);

      const res = await fetch(
        `${baseUrl}/users/editProfile/${user?._id || user?.id}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          body: form,
        }
      );

      if (!res.ok) throw new Error("Failed to update profile");
      const updated = await res.json();

      setUser({ ...updated, id: updated._id || updated.id }); // update context
      navigate("/profile");
    } catch (err) {
      setError("root", {
        type: "server",
        message: String(err),
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-5 text-white z-10">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 z-10">
        {errors.root && (
          <p className="text-sm text-red-400">{errors.root.message}</p>
        )}{" "}
        {/* Profile Picture */}
        <div className="flex flex-col items-center z-10">
          <img
            src={
              preview || "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Profile preview"
            className="w-24 h-24 rounded-full object-cover border-2 border-orange-500"
          />
          <label className="mt-3 cursor-pointer text-orange-400 hover:text-orange-500">
            Change Picture
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
        {/* Username */}
        <div>
          <label className="block text-sm text-neutral-400 mb-1">
            Username
          </label>
          <input
            type="text"
            {...register("username")}
            className="w-full rounded-lg bg-neutral-900 border border-neutral-700 px-3 py-2 text-white focus:outline-none focus:border-orange-500"
          />
          {errors.username && (
            <p className="text-sm text-red-400">{errors.username.message}</p>
          )}{" "}
        </div>
        {/* Bio */}
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Bio</label>
          <textarea
            {...register("bio")}
            rows={4}
            className="w-full rounded-lg bg-neutral-900 border border-neutral-700 px-3 py-2 text-white focus:outline-none focus:border-orange-500 resize-none"
          />
          {errors.bio && (
            <p className="text-sm text-red-400">{errors.bio.message}</p>
          )}{" "}
        </div>
        {/* Age */}
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Age</label>
          <input
            type="number"
            {...register("age")}
            min={1}
            max={120}
            className="w-full rounded-lg bg-neutral-900 border border-neutral-700 px-3 py-2 text-white focus:outline-none focus:border-orange-500"
          />
          {errors.age && (
            <p className="text-sm text-red-400">{errors.age.message}</p>
          )}{" "}
        </div>
        {/* City */}
        <div>
          <label className="block text-sm text-neutral-400 mb-1">City</label>
          <input
            type="text"
            {...register("city")}
            className="w-full rounded-lg bg-neutral-900 border border-neutral-700 px-3 py-2 text-white focus:outline-none focus:border-orange-500"
          />
          {errors.city && (
            <p className="text-sm text-red-400">{errors.city.message}</p>
          )}{" "}
        </div>
        {/* Country */}
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Country</label>
          <input
            type="text"
            {...register("country")}
            className="w-full rounded-lg bg-neutral-900 border border-neutral-700 px-3 py-2 text-white focus:outline-none focus:border-orange-500"
          />
          {errors.country && (
            <p className="text-sm text-red-400">{errors.country.message}</p>
          )}{" "}
        </div>
        {/* Save Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-6 bg-orange-500 text-black py-2 cursor-pointer rounded-lg font-semibold hover:bg-orange-600 transition"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
