import Button from "@/components/Button.jsx";

export default function laporan() {
  return (
    <div className="justify-items-center">
      <div className="max-w-4xl">

        
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6 text-gray-800">
          <h3 className="font-semibold text-3xl text-[#6a9c89] mb-4">How to Submit a Report</h3>
          <p className="text-lg mb-4">
            Follow these steps to report damaged infrastructure:
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#6a9c89] rounded-full"></div>
              <p className="text-md text-gray-600 font-medium">
                Enter the report title, such as "Pothole on Ponlab Street".
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#6a9c89] rounded-full"></div>
              <p className="text-md text-gray-600 font-medium">
                Provide a description of the issue, for example: "The pothole is quite deep and dangerous for motorcyclists".
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#6a9c89] rounded-full"></div>
              <p className="text-md text-gray-600 font-medium">
                Enter the location where the issue was found.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#6a9c89] rounded-full"></div>
              <p className="text-md text-gray-600 font-medium">
                Upload photos showing the condition of the infrastructure.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#6a9c89] rounded-full"></div>
              <p className="text-md text-gray-600 font-medium">
                After completing the form, click the "Submit" button to send your report.
              </p>
            </div>
          </div>
          <p className="mt-4 text-md text-gray-600">
            Your report will be verified and forwarded to the relevant authorities for prompt action.
          </p>
        </div>

        <h2 className="text-3xl font-semibold mb-4 text-gray-700">
          Want to make a report?
        </h2>
        <p className="max-w-xl mb-8 text-gray-700 text-lg">
          Please fill out the form below:
        </p>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <form className="space-y-4">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-600">Report Title</label>
              <input
                type="text"
                id="title"
                placeholder="Enter report title"
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6a9c89]"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-600">Description</label>
              <textarea
                id="description"
                placeholder="Enter report description"
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md overflow-hidden resize-none focus:outline-none focus:ring-2 focus:ring-[#6a9c89]"
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="location" className="block text-sm font-medium text-gray-600">Location</label>
              <input
                type="text"
                id="location"
                placeholder="Enter report location"
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6a9c89]"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="file" className="block text-sm font-medium text-gray-600">Upload Images</label>
              <input
                type="file"
                id="file"
                multiple
                className="mt-2 block w-full border border-gray-300 rounded-md text-gray-700"
              />
            </div>
            <div className="py-6">
              <Button
                title="Submit"
                to="/laporan"
                className="py-2 px-[400px] text-sm w-full"
                condition={true}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}