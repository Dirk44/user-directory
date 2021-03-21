import React, { useState, useEffect } from "react";
import './App.css';
import Table from "./components/Table";
import Row from "./components/Row";
import API from "./utils/API";
import Search from "./components/Search";

function App() {

  const [employeeArray, setEmployeeArray] = useState([]);
  const [sortArray, setSortArray] = useState([]);
  const [sortDirection, setSortDirection] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');


  useEffect(() => {
    API.getEmployees()
      .then(res => {
        setEmployeeArray(res.data.results);
        setSortArray(res.data.results);
      })
  }, [])

  useEffect(() => {
    const sortAsc = sortDirection ? 1 : -1;
    const sortDesc = sortDirection ? -1 : 1;
    let tempArr = [];
    tempArr = [...sortArray].sort((a, b) => (a.name.first < b.name.first) ? sortAsc : sortDesc)
    setSortArray(tempArr)
  }, [sortDirection]);
  
  useEffect(() => {
    
    let tempArr = [];
    
    tempArr = [...sortArray].filter((emp) => {
      return (emp.name.first.toLowerCase().includes(searchFilter) || emp.name.last.toLowerCase().includes(searchFilter));
    });
    setSortArray(tempArr)
  }, [searchFilter]);


  const handleClick = () => {
    setSortDirection(!sortDirection);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (e.target.value === '') {
      setSortArray(employeeArray);
    } else {
      setSearchFilter(e.target.value.toLowerCase())
    }
  }

  return (
    <> 
    <Search handleSearch={handleSearch} />
      {!sortArray.length === 0 ? (
        <h1>Awaiting Results</h1>
      ) : (


          <Table handleClick={handleClick}>
            {sortArray.map(emp => {
              return <Row key={emp.login.uuid} img={emp.picture.thumbnail} alt={emp.name.first.concat(" ", emp.name.last)} name={emp.name.first.concat(" ", emp.name.last)} phone={emp.phone} email={emp.email} dob={emp.dob.date} />
            })

            }

          </Table>
        )
      }
    </>
  );
}

export default App;
