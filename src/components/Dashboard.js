import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { url } from "../config";

// const data = [{ name: "count of users", activeCount: 25, inactiveCount: 15 }];

const d = [
  { user_id: 6, ticket_count: 1 },
  { ticket_count: 1, user_id: 15 },
  { user_id: 20, ticket_count: 7 },
  { ticket_count: 2, user_id: 28 },
  { ticket_count: 18, user_id: 29 },
  { user_id: 7, ticket_count: 17 },
  { ticket_count: 1, user_id: 9 },
  { ticket_count: 1, user_id: 13 },
  { ticket_count: 1, user_id: 14 },
  { ticket_count: 1, user_id: 15 },
  { user_id: 20, ticket_count: 7 },
  { ticket_count: 2, user_id: 28 },
  { ticket_count: 18, user_id: 29 },
  { ticket_count: 1, user_id: 44 },
  { ticket_count: 1, user_id: 65 },
  { user_id: 20, ticket_count: 37 },
  { ticket_count: 2, user_id: 98 },
];

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5);
  // const [dropdownOptions, setDropdownOptions] = useState([]);
  // const [items, setItems] = useState([]);
  // const [countUserData, setCountUserData] = useState({});
  // const userData = [];
  // data.push(countUserData);

  useEffect(() => {
    axios
      .get("http://192.168.1.85:8095/api/usersCount")
      .then((res) => {
        console.log(res);
        // setCountUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(url.API + "api/tickets/count")
      .then((res) => {
        // setUserData(res.data);
        console.log(res.data);
        setData(res.data);
        // const slicedData = [];
        // for (let i = 0; i < data.length; i += 5) {
        //   slicedData.push(data.slice(i, i + 5));
        // }
        // setItems(slicedData);
        // console.log(setItems);
        // set dropdown options based on number of users
        // const numUsers = res.data.length;
        // const numDropdowns = Math.ceil(numUsers / 5);
        // const dropdownOptions = [];
        // for (let i = 0; i < numDropdowns; i++) {
        //   const start = i * 5 + 1;
        //   const end = Math.min(numUsers, (i + 1) * 5);
        //   dropdownOptions.push(`${start}-${end}`);
        // }
        // setDropdownOptions(dropdownOptions);
      })
      .catch((err) => {
        console.log(err);
        setData(d);
      });
  }, []);

  const handleRangeChange = (event) => {
    const selectedRange = event.target.value.split("-");
    const start = parseInt(selectedRange[0], 10) - 1;
    const end = parseInt(selectedRange[1], 10);
    setStartIndex(start);
    setEndIndex(end);
  };

  // console.log(userData.length);
  // const dropdownLimit = Math.ceil(userData.length / 5);
  // console.log(dropdownLimit);
  // const users = [];
  // let a = 0;
  // let b = 5;
  // for (let i = 0; i < dropdownLimit; i++) {
  //   users.push(userData.slice(a, b));
  //   a += 5;
  //   b += 5;
  // }

  // console.log(users);
  console.log(data);
  return (
    <div className="w-full h-full">
      <div className="sm:flex sm:flex-row sm:justify-center sm:items-center lg:flex lg:flex-row  lg:justify-around lg:align-center mb-10 ">
        {/* <div className="shadow-slate-800 xs:h-16 xs:w-24 md:h-40 md:w-80 border-blue-500 border-2 md:p-6 sm:p-2 md:flex md:flex-col md:justify-center md:align-center rounded-xl ">
          <h1 className="md:text-2xl">Active Users</h1>
          <p className="mt-4 text-blue-700 text-4xl">
             {countUserData.Active_Count} 
         </p>
        </div> */}

        <div className="ml-6 md:h-40 md:w-80 border-blue-500 border-2 p-6 rounded-xl flex flex-col justify-center align-center">
          <h1 className="md:text-2xl">Inactive Users</h1>
          <p className="mt-4 text-blue-700 text-4xl">
            {/* {countUserData.Inactive_Count} */}
          </p>
        </div>
      </div>
      {/* <div className="flex flex-row  justify-center align-center">
        <BarChart
          width={400}
          height={500}
          data={data}
          barSize={80}
          margin={{ right: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="count of users" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="Active_Count"
            name="Active Users"
            fill="#8884d8"
            className="hover:opacity-75"
            margin={{ right: 30 }}
          />
          <Bar
            dataKey="Inactive_Count"
            name="Inactive Users"
            fill="#82ca9d"
            className="hover:opacity-75"
          />
        </BarChart>
      </div>
      <div></div> */}
      <div className="flex flex-col justify-center items-center m-4">
        {/* <select onChange={handleRangeChange}>
          <option value="1-5">1-5</option>
          <option value="6-10">6-10</option>
          <option value="11-15">11-15</option>
        </select> */}
        <div className="flex justify-end ">
          <select onChange={handleRangeChange}>
            {Array(Math.ceil(d.length / 5))
              .fill()
              .map((_, index) => (
                <option
                  key={index}
                  value={`${index * 5 + 1}-${Math.min(
                    index * 5 + 5,
                    d.length
                  )}`}
                >
                  {`${index * 5 + 1}-${Math.min(index * 5 + 5, d.length)}`}
                </option>
              ))}
          </select>
        </div>
        <ResponsiveContainer
          //  width={{ xs: "100%", md: "50%" }}
          width="100%"
          height={300}
        >
          <BarChart data={data.slice(startIndex, endIndex)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="user_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="ticket_count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;

// import { useState, useEffect } from "react";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
// } from "recharts";

// function BarGraph({ userTicketCounts }) {
//   const data = userTicketCounts.map((user) => ({
//     name: user.name,
//     ticketCount: user.ticketCount,
//   }));

//   return (
//     <BarChart width={600} height={300} data={data}>
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis dataKey="name" />
//       <YAxis />
//       <Tooltip />
//       <Legend />
//       <Bar dataKey="ticketCount" fill="#8884d8" />
//     </BarChart>
//   );
// }

// function Dashboard() {
//   const [userTicketCounts, setUserTicketCounts] = useState([]);
//   const [range, setRange] = useState("1-5");

//   useEffect(() => {
//     // Fetch user ticket count data
//     async function fetchUserTicketCounts() {
//       const response = await fetch("/api/userTicketCounts");
//       const data = await response.json();
//       setUserTicketCounts(data);
//     }
//     fetchUserTicketCounts();
//   }, []);

//   // Filter user ticket counts based on the selected range
//   const [startRange, endRange] = range.split("-");
//   const filteredUserTicketCounts = userTicketCounts.filter(
//     (count) =>
//       count.ticketCount >= parseInt(startRange) &&
//       count.ticketCount <= parseInt(endRange)
//   );

//   // Determine range options based on the number of user ticket counts
//   const count = userTicketCounts.length;
//   console.log("hi", count);
//   const rangeOptions = [];
//   for (let i = 1; i <= count; i += 5) {
//     rangeOptions.push(`${i}-${Math.min(i + 4, count)}`);
//   }
//   console.log("preveen", rangeOptions);

//   return (
//     <div>
//       <h2>User Ticket Count</h2>
//       <label htmlFor="range-select">Select Range:</label>
//       <select
//         id="range-select"
//         value={range}
//         onChange={(e) => setRange(e.target.value)}
//       >
//         {rangeOptions.map((option) => (
//           <option key={option} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//       <BarGraph userTicketCounts={filteredUserTicketCounts} />
//     </div>
//   );
// }

// export default Dashboard;
