interface PageHeaderProps {
  title?: string;
};

export const PageHeader = ({
  title
}: PageHeaderProps) => {
  return (
    <div className="border-b">
      <div className="w-2/3 mx-auto">
        <h1 className="text-3xl my-10 font-semibold">
          {title}
        </h1>
      </div>
    </div>
  )
}