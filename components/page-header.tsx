import MainWrapper from "./main-wrapper";

interface PageHeaderProps {
  title?: string;
};

export const PageHeader = ({
  title
}: PageHeaderProps) => {
  return (
    <div className="border-b mb-4">
      <MainWrapper>
        <h1 className="text-3xl my-10 font-semibold">
          {title}
        </h1>
      </MainWrapper>
    </div>
  )
}