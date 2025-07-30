export const PageHeader: React.FC = () => {
  return (
    <header>
      <div
        className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-8 text-white gap-4 sm:gap-0"
        style={{ backgroundColor: "#242424" }}
      >
        <input
          type="text"
          placeholder="Sök address"
          className="p-3 rounded bg-zinc-600 w-full sm:w-auto text-base"
        />
        <h1 className="text-xl sm:text-3xl font-bold">Sophämtningsschema</h1>
      </div>
    </header>
  );
};
