type Props = {
  avatar?: string;
  name?: string;
  sub?: string;
  onClick?: () => void;
};

export default function UserPreview({ avatar, name, sub, onClick }: Props) {
  return (
    <div className="vh-user-preview" onClick={onClick}>
      <div className="avatar">
        <img
          src={
            avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="avatar"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="meta">
        <div className="name">{name ?? "Guest"}</div>
        {sub && <div className="sub">{sub}</div>}
      </div>
    </div>
  );
}
