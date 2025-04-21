import { useNavigate } from "react-router";

function Forms({ classes, data, pid, id }) {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`my-0 rounded-4 mx-0 md:mx-40 mt-60 ${classes.blockContainer}`}
      >
        <div className="blockContentName">Forms</div>

        <div
          className="blockContentHolder"
          style={{ display: data.id ? "block" : "none" }}
        >
          <div
            className={`my-0 rounded-4 mx-0 md:mx-40 mt-10 py-14 ${classes.allImgContainer}`}
          >
            <div className="imgContainer w-full md:w-1/3">
              <button
                onClick={() => {
                  navigate(`/apps/ksaVisa/ksaVisas/${pid}`);
                }}
                class="bg-slate-500 w-full text-xll hover:bg-blue-800 text-black hover:text-white font-bold py-10 px-4 border-1 border-blue-800 hover:border-blue-600 rounded"
              >
                Visa Form
              </button>
            </div>
            <div className="imgContainer w-full md:w-1/3">
              <button
                onClick={() => {
                  navigate(`/apps/malaysiaVisa/malaysiaVisas/${pid}`);
                }}
                class="bg-slate-500 w-full text-xll hover:bg-blue-800 text-black hover:text-white font-bold py-10 px-4 border-1 border-blue-800 hover:border-blue-600 rounded"
              >
                Malaysia Visa Form
              </button>
            </div>
            <div className="imgContainer w-full md:w-1/3">
              <button
                onClick={() => {
                  navigate(`/apps/thailandVisa/thailandVisas/${pid}`);
                }}
                class="bg-slate-500 w-full text-xll hover:bg-blue-800 text-black hover:text-white font-bold py-10 px-4 border-1 border-blue-800 hover:border-blue-600 rounded"
              >
                Thailand Visa Form
              </button>
            </div>
            <div className="imgContainer w-full md:w-1/3">
              <button
                onClick={() => {
                  navigate(`/apps/finger/fingers/${pid}`);
                }}
                class="bg-slate-500 w-full text-xll hover:bg-blue-800 text-black hover:text-white font-bold py-10 px-4 border-1 border-blue-800 hover:border-blue-600 rounded"
              >
                Finger Form
              </button>
            </div>
            <div className="imgContainer w-full md:w-1/3">
              <button
                onClick={() => {
                  navigate(`/apps/bmetContract/bmetContracts/${pid}`);
                }}
                class="bg-slate-500 w-full text-xll hover:bg-blue-800 text-black hover:text-white font-bold py-10 px-4 border-1 border-blue-800 hover:border-blue-600 rounded"
              >
                BMET Contract Form
              </button>
            </div>
            <div className="imgContainer w-full md:w-1/3">
              <button
                onClick={() => {
                  navigate(
                    `/apps/passengerAgreement/passengerAgreements/${id}`
                  );
                }}
                class="bg-slate-500 w-full whitespace-nowrap text-xll hover:bg-blue-800 text-black hover:text-white font-bold py-10 px-4 border-1 border-blue-800 hover:border-blue-600 rounded"
              >
                Passenger Agreement Form
              </button>
            </div>
            <div className="imgContainer w-full md:w-1/3">
              <button
                onClick={() => {
                  navigate(`/apps/departure/departures/${pid}`);
                }}
                class="bg-slate-500 w-full text-xll hover:bg-blue-800 text-black hover:text-white font-bold py-10 px-4 border-1 border-blue-800 hover:border-blue-600 rounded"
              >
                Departure Card
              </button>
            </div>
            <div className="imgContainer w-full md:w-1/3">
              <button
                onClick={() => {
                  navigate(`/apps/bmetVerify/bmetVerifys/${id}`);
                }}
                class="bg-slate-500 w-full text-xll hover:bg-blue-800 text-black hover:text-white font-bold py-10 px-4 border-1 border-blue-800 hover:border-blue-600 rounded"
              >
                BMET Verify Form
              </button>
            </div>
            <div className="imgContainer w-full md:w-1/3">
              <button
                onClick={() => {
                  navigate(`/apps/bmet/bmets/${pid}`);
                }}
                class="bg-slate-500 w-full text-xll hover:bg-blue-800 text-black hover:text-white font-bold py-10 px-4 border-1 border-blue-800 hover:border-blue-600 rounded"
              >
                BMET Form
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Forms;
