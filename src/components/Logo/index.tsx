import Tilt from 'react-parallax-tilt'

const Logo: React.FC = () => {
  return (
    <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15}>
      <div className="m-8 mt-0 h-40 w-40 rounded-sm shadow-lg shadow-indigo-500/40">
        <img
          className="logo p-3 sm:h-40 sm:w-40"
          data-testid="logo"
          alt="logo"
          src="./images/brain.png"
        />
        <a target='_blank' rel='noreferrer' href="https://www.freepik.com/icon/artificial-intelligence_1122577#position=87&page=1&term=brain&fromView=keyword">Designed by Freepik</a>
      </div>
    </Tilt>
  )
}

export default Logo
