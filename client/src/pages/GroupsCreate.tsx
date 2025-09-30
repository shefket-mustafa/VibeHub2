// src/pages/CreateGroupPage.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PageContainer from "./PageContainer";
import { createGroupSchema, type CreateGroupData } from "../zod/createGroupSchema";




export default function CreateGroupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateGroupData>({
    resolver: zodResolver(createGroupSchema),
  });

  const onSubmit = async (data: CreateGroupData) => {
    console.log("create group data", data);
    // later → dispatch redux action / call API
  };

  return (
    <PageContainer>
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Create a Group</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm text-white mb-1">Group Name</label>
            <input
              {...register("name")}
              className="w-full rounded-md p-2 bg-neutral-800 text-white border border-neutral-600 focus:border-orange-500 outline-none"
            />
            {errors.name && (
              <p className="text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-white mb-1">Description</label>
            <textarea
              {...register("description")}
              className="w-full rounded-md p-2 bg-neutral-800 text-white border border-neutral-600 focus:border-orange-500 outline-none"
              rows={4}
            />
            {errors.description && (
              <p className="text-sm text-red-400">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-white mb-1">Group Type</label>
            <select
              {...register("type")}
              className="w-full rounded-md p-2 bg-neutral-800 text-white border border-neutral-600 focus:border-orange-500 outline-none"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl px-4 py-2 bg-orange-400 text-black font-semibold hover:bg-orange-500 transition"
          >
            {isSubmitting ? "Creating..." : "Create Group"}
          </button>
        </form>
      </div>
    </PageContainer>
  );
}
