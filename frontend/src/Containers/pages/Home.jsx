import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";
import instance from '../services/api';
import { useSelector } from "react-redux";

function Home() {
  const [checkboxes, setCheckboxes] = useState({
    upper: false,
    lower: false,
    special: false,
    numbers: false,
  });

  const [passwordLength, setPasswordLength] = useState(4);
  const [textToCopy, setTextToCopy] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo.access;

  const handleCheckboxChange = (checkboxName) => {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [checkboxName]: !prevCheckboxes[checkboxName],
    }));
  };

  const handleGenerateClick = () => {
    const requestData = {
      lower: checkboxes.lower,
      upper: checkboxes.upper,
      special: checkboxes.special,
      numbers: checkboxes.numbers,
      passwordLength,
    };

    instance
      .post("/api/users/password/create/", requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const generatedText = response.data.password;
        setTextToCopy(generatedText);

        // Copy the generated text to the clipboard
        navigator.clipboard.writeText(generatedText).then(() => {
          console.log("Text copied to clipboard");
        }).catch((error) => {
          console.error("Error copying to clipboard:", error);
        });
      })
      .catch((error) => {
        console.error("Error fetching password:", error);
        // Handle error (show a toast or something)
      });
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-gray-900 h-1/5 flex flex-wrap">
        <div className="bg-blue-300 w-1/4 p-4">Card 1</div>
        <div className="bg-blue-400 w-1/4 p-4">Card 2</div>
        <div className="bg-blue-300 w-1/4 p-4">Card 3</div>
        <div className="bg-blue-400 w-1/4 p-4">Card 4</div>
      </div>
      <div className="bg-blue-400 flex-1">
        <div className="flex w-full h-full">
          <div className="w-1/2 bg-gray-200">
            <div className="flex justify-center">
              <div className="flex h-1/2 mt-4 items-center justify-center bg-black rounded-full p-2">
              <CopyToClipboard text={textToCopy}>

                <FaCopy
                  className="cursor-pointer text-purple-500"
                  onClick={() => alert("Copied to clipboard")}
                />
                </CopyToClipboard>
              </div>
              <input
                type="text"
                value={textToCopy}
                className="m-3 py-2 rounded-md"
                readOnly
              />

                <button
                  type="button"
                  className="m-3 w-1/6 bg-purple-600 text-white py-2 rounded-md"
                  onClick={handleGenerateClick}
                >
                  Generate
                </button>
            </div>

            <div className="flex w-full justify-center">
              <div className="container-fliud bg-purple-400 w-1/2">
                <div className="bg-gray-300 flex justify-around rounded-full m-2">
                  <div className="m-2 w-2/3 ">
                    <label htmlFor="upper" className="text-black">
                      Uppercase
                    </label>
                  </div>
                  <div className="m-2">
                    <input
                      type="checkbox"
                      id="upper"
                      checked={checkboxes.upper}
                      onChange={() => handleCheckboxChange("upper")}
                    />
                  </div>
                </div>

                <div className="bg-gray-300 flex justify-around rounded-full m-2">
                  <div className="m-2 w-2/3">
                    <label htmlFor="lower" className="text-black">
                      Lowercase
                    </label>
                  </div>
                  <div className="m-2">
                    <input
                      type="checkbox"
                      id="lower"
                      checked={checkboxes.lower}
                      onChange={() => handleCheckboxChange("lower")}
                    />
                  </div>
                </div>

                <div className="bg-gray-300 flex justify-around rounded-full m-2">
                  <div className="m-2 w-2/3">
                    <label htmlFor="special" className="text-black">
                      Special Characters
                    </label>
                  </div>
                  <div className="m-2">
                    <input
                      type="checkbox"
                      id="special"
                      checked={checkboxes.special}
                      onChange={() => handleCheckboxChange("special")}
                    />
                  </div>
                </div>

                <div className="bg-gray-300 flex justify-around rounded-full m-2">
                  <div className="m-2 w-2/3">
                    <label htmlFor="numbers" className="text-black">
                      Numbers
                    </label>
                  </div>
                  <div className="m-2">
                    <input
                      type="checkbox"
                      id="numbers"
                      checked={checkboxes.numbers}
                      onChange={() => handleCheckboxChange("numbers")}
                    />
                  </div>
                </div>
                <div className="bg-gray-300 flex justify-around rounded-full m-2">
                  <div className="m-2 w-2/3">
                    <label htmlFor="passwordLength" className="text-black">
                      Password Length
                    </label>
                  </div>
                  <div className="m-2">
                    <select
                      id="passwordLength"
                      value={passwordLength}
                      onChange={(e) =>
                        setPasswordLength(Number(e.target.value))
                      }
                      className="py-1 px-2 rounded-md bg-white"
                    >
                      {Array.from({ length: 17 }, (_, i) => i + 4).map(
                        (value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 bg-purple-100">List</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
