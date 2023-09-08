import { useAuthContext } from "../../hooks/useAuthContext"

const Rank: React.FC = () => {
  const { currentUser } = useAuthContext()
  const { name, entries } = currentUser!

  return (
    <>
      <p className="text-white text-2xl font-ysabeau">
        {`${name} your rank is`}
      </p>
      <p className="text-white text-5xl font-ysabeau">
        {`#${entries}`}
      </p>
    </>
  )
}

export default Rank