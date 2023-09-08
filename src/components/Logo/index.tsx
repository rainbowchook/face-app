import Tilt from 'react-parallax-tilt'

const Logo: React.FC = () => {
  return (
    <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15}>
      <div className="m-8 mt-0 h-40 w-40 rounded-lg shadow-xl shadow-indigo-500/90">
        <img
          className="p-3"
          data-testid="logo"
          alt=""
          src="./images/brain.png"
        />
        <a
          className="text-[8px] text-white"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.freepik.com/icon/artificial-intelligence_1122577#position=87&page=1&term=brain&fromView=keyword"
        >
          Designed by Freepik
        </a>
      </div>
    </Tilt>
  )
}

export default Logo
