import { Navigate, Route, Routes } from "react-router-dom";

function PlaceholderPage({ title, description }: { title: string; description: string }) {
  return (
    <main className="p-12">
      <h1 className="text-xl font-semibold">{title}</h1>
      <p className="text-sm text-gray-500">{description}</p>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route
        path="/login"
        element={<PlaceholderPage title="Login" description="Placeholder — auth not implemented yet." />}
      />
      <Route
        path="/admin"
        element={<PlaceholderPage title="Admin Portal" description="Placeholder — admin dashboard not implemented yet." />}
      />
      <Route
        path="/ministry"
        element={<PlaceholderPage title="Ministry Portal" description="Placeholder — ministry dashboard not implemented yet." />}
      />
      <Route
        path="/evaluator"
        element={<PlaceholderPage title="Evaluator Portal" description="Placeholder — evaluator dashboard not implemented yet." />}
      />
      <Route
        path="/startup"
        element={<PlaceholderPage title="Startup Portal" description="Placeholder — startup dashboard not implemented yet." />}
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
