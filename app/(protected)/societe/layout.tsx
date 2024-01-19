const SocieteLayout = ({ 
  children
}: { 
  children: React.ReactNode
}) => { 

  return (
    <div className="flex items-center justify-between bg-neutral-100 mx-auto">
        {children}
    </div>
  )
}

export default SocieteLayout;