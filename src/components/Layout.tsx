export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold">Guest List</h1>
      {children}
    </div>
  );
};
