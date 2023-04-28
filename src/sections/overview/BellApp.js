import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";

import BellCurve from './BellCurve';


const array1 = []
const array2 = [80,100,10,20,40,80,100,10,20,40,80,100,10,20,40,80,100,10,20,40,80,100,10,20,40,80,100,10,20,40]

function BellApp() {
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  const [data, setData] = useState([]);

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map(i => {
      const values = i.split(",");
      
    //   const obj = csvHeader.reduce((object, header, index) => {
    //     object[header] = values[index];
    //     return object;
    //   }, {});
      return Number(values[values.length - 1]);
    });
    setArray(array);
    // console.log(array)
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };

  const headerKeys = Object.keys(Object.assign({}, ...array));

  return (
    console.log(array),
    <div style={{ textAlign: "center" }}>
      <h1>REACTJS CSV IMPORT EXAMPLE </h1>
      <form>
        <input
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
        />

        <button
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          IMPORT CSV
        </button>
      </form>

      <br />

      {/* <table>
        <thead>
          <tr key={"header"}>
            {headerKeys.map((key) => (
              <th>{key}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {array.map((item) => (
            <tr key={item.id}>
              {Object.values(item).map((val) => (
                <td>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table> */}
      <BellCurve data={array} gradepoints={array1}/>
    </div>
  );
}
export default BellApp;

