interface AdminContainerProps {
  title: string;
  children: React.ReactNode;
}

export default function AdminContainer({
  title,
  children,
}: AdminContainerProps) {
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-[#1F1F1F]">
        {title}
      </h1>

      {children}
    </div>
  );
}