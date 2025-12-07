import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <h1 className="text-9xl font-bold text-[var(--forest-green)]">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mt-4">Page Not Found</h2>
      <p className="text-gray-600 mt-2 max-w-md">
        The page you are oking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-8 flex items-center px-6 py-3 bg-[var(--forest-green)] text-white rounded-full hover:bg-[var(--olive-green)] transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </button>
    </div>
  );
}
