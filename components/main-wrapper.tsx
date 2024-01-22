const MainWrapper = ({ 
  children
}: { 
  children: React.ReactNode
}) => { 
  return (
    <div className="w-[1200px] max-w-full mx-auto p-2">
        {children}
    </div>
  )
}

export default MainWrapper;