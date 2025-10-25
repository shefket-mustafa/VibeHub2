import { useTranslation } from "react-i18next";
import { useGroups } from "../hooks/groups";
import type { GroupInfoTypesModalHandler, Members } from "../types/TStypes";
import {v4 as uuidv4} from "uuid";

export default function GroupInfoModal({ name, description, members, owner }: GroupInfoTypesModalHandler) {
    const {groupInfoModalHandler} = useGroups();
    const {t} = useTranslation();
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      {/* Modal Container */}
      <div className="bg-neutral-900 text-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[80vh] flex flex-col overflow-hidden border border-neutral-800">
        
        {/* Header */}
        <div className="flex justify-between items-center py-4 px-6 border-b border-neutral-800">
          <h2 className="text-2xl font-bold text-orange-400">{t("groups.info.title")}</h2>
          <button
            className="text-neutral-400 cursor-pointer hover:text-orange-400 text-2xl font-bold transition"
            onClick={groupInfoModalHandler}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Group Name */}
          <div>
            <h3 className="text-xl font-semibold text-orange-300 mb-1">{t("groups.info.name")}</h3>
            <p className="text-neutral-300">{name || t("groups.info.untitled")}</p>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xl font-semibold text-orange-300 mb-1">{t("groups.info.descr")}</h3>
            <p className="text-neutral-300 whitespace-pre-wrap">
              {description || t("groups.info.noDescr")}
            </p>
          </div>

          {/* Owner */}
          <div>
            <h3 className="text-xl font-semibold text-orange-300 mb-1">{t("groups.info.owner")}</h3>
            <p className="text-neutral-300">{owner.username}</p>
          </div>

          {/* Members */}
          <div>
            <h3 className="text-xl font-semibold text-orange-300 mb-2">{t("groups.info.members")} ({members?.length || 0})</h3>
            <div className="flex flex-wrap gap-2">
              {members && members.length > 0 ? (
                members.map((m: Members) => (
                    
                  <span
                    key={`${m._id}-${uuidv4()}`}
                    className="px-3 py-1 rounded-full bg-neutral-800 text-sm text-neutral-200 border border-neutral-700"
                  >
                    {m.email}
                  </span>
                ))
              ) : (
                <p className="text-neutral-400">{t("groups.info.noMembers")}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
