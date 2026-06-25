import { useNavigate } from "react-router-dom";

export default function Page({ title }: { title: string }) {
  const navigate = useNavigate();
  return (
    <div className="page">
      <button className="page__back" onClick={() => navigate("/")}>
        ← back
      </button>
      <h1>{title}</h1>
      <p>Nothing here yet — this page is intentionally minimal for now.</p>
    </div>
  );
}
