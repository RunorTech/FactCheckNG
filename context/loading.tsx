'use-client'


function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <div className="relative flex justify-center items-center" style={{ width: '150px', height: '150px' }}>
          <div className="!pt-18">
            <div className="loader "></div>
          </div>
          <div className="absolute top-0 -z-50">
            <video src="/gif/robot.webm" autoPlay loop muted playsInline />
          </div>
        </div>
        
      </div>
    </div>
  )
}
export default Loading
