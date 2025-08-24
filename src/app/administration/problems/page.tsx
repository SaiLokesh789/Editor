import getCurrentUserProblems from "@/features/administration/actions/getCurrenetUserProblems";

export default async function currentUserProblemsPage() {
  const problems = await getCurrentUserProblems();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Problems</h1>
      <ul className="space-y-4">
        {problems.map((problem) => (
          <li key={problem.id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{problem.title}</h2>
            <p>{problem.problemStatement}</p>
            <p className="text-sm text-gray-500">Created at: {new Date(problem.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
