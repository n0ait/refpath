interface PageHeaderProps {
  title?: string;
};

export const PageHeader = ({
  title
}: PageHeaderProps) => {
  return (
    <div className="border-b mb-4">
      <div className="w-2/3 mx-auto p-2">
        <h1 className="text-3xl my-10 font-semibold">
          {title}
        </h1>
      </div>
    </div>
  )
}