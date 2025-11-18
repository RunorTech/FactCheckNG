'use-client'


function Loading() {
  return (
    <div className="container w-full h-full flex justify-center items-center">
      <div className="relative h-30 flex justify-center items-center">
        <div className="loader relative mx-auto my-5"></div>
        <div className="absolute bottom-0">
          <div className="flex space-x-2">
            <div className="text-2xl font-bold">Loading</div>
            <div className="flex self-end mb-1 space-x-2 ">
              <div className="loader-dot"></div>
              <div className="loader-dot animation-delay-100"></div>
              <div className="loader-dot animation-delay-200"></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
export default Loading
