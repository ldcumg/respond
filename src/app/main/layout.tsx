type Props = Readonly<{
  children: React.ReactNode;
}>;

const layout = ({ children }: Props) => {
  return (
    <>{children}</>
  )
}

export default layout