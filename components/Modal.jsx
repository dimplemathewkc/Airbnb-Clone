import React from "react";
export default function Modal() {
  const [showModal, setShowModal] = React.useState(true);
  return (
    <>
      {showModal ? (
        <>
          <div
            className="bg-black-50 bg-opacity-10 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50"
          >
            <div className="relative w-auto">
              {/*content*/}
              <div className="border-0 rounded-2xl">
                {/*header*/}
                <div className="flex-col justify-between rounded-t">
                    <img src="https://i.pinimg.com/originals/b4/4c/66/b44c665c88d2d14d1b4a6904bd133acb.gif" className="h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[650px] w-full rounded-2xl"></img>
                    <div className="absolute bottom-8 w-full text-center">
                    <button
                            className="pl-8 pr-8 pb-2 pt-2 text-center rounded-2xl text-red-400 font-bold border-2 mt-8  uppercase text-sm sm:text-lg hover:shadow-2xl hover:bg-white active:scale-90 transition duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                        >
                            Travel with US
                  </button>
                    </div>
                  
                </div>
                

              </div>
            </div>
          </div>
          
        </>
      ) : null}
    </>
  );
}
