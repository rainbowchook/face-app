import Tilt from 'react-parallax-tilt'

const Logo: React.FC = () => {
  return (
    <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15}>
      <div className="m-8 mt-0 h-40 w-40 rounded-lg shadow-xl shadow-indigo-500/90">
        {/* <div
          className="logo sm:h-40 sm:w-40 rounded-lg flex flex-col-reverse content-end"
          data-testid="logo"
          // style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/brain.png)`}}
        >
          <a className='text-[12px] text-indigo-700/60' target='_blank' rel='noopener noreferrer' href="https://www.freepik.com/icon/artificial-intelligence_1122577#position=87&page=1&term=brain&fromView=keyword">Designed by Freepik</a>
        </div> */}
        <img
          className="p-3"
          data-testid="logo"
          alt=""
          src="./images/brain.png"
        />
        <a
          className="text-[12px] text-indigo-700/60"
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
