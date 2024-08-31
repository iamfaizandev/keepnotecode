import { useNavigate } from "react-router-dom";
import "./basicinfo.css";
import { Navmenu } from "../../nav/nav";
import { MenuItem, TextField } from "@mui/material";
import { BasicInfoContracts } from "../../../contracts/BasicInfoContracts";
import { useState } from "react";
import { useCookies } from "react-cookie";

export function BasicInfo() {
  let navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([
    "Gender",
    "Month",
    "Day",
    "Year",
  ]);

  const [months] = useState([
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]);
  const [gender] = useState(["Female", "Male", "Rather not say", "Custom"]);

  return (
    <section className="basicInfo">
      <Navmenu />
      <div className="basicInfo-container">
        <div className="basicInfo-content">
          <div className="leftSide">
            <div className="title">
              <div className="brandTitle text-danger h2">
                One <span className="text-success">Keep</span>
              </div>
              <div className="subTitle h3">Basic information</div>
              <div className="subText">Enter your birthday and gender</div>
            </div>
          </div>
          <div className="basicInfoForm">
            <form action="" className="form w-100">
              <div className="mb-4 ">
                <div className="formInputs d-flex">
                  <TextField
                    id="outlined-select-Months"
                    select
                    label="Months"
                    className="w-50 me-2"
                    required
                    name="Month"
                  >
                    {months.map((month) => (
                      <MenuItem key={month} value={month}>
                        {month}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    id="outlined-select-Day"
                    type="number"
                    label="Day"
                    className="w-50 me-2"
                    name="Day"
                    multiline
                    maxRows="2"
                  />
                  <TextField
                    id="outlined-select-Year"
                    type="text"
                    label="Year"
                    name="Year"
                  />
                </div>
                <div className="inputGender mt-4">
                  <TextField
                    id="outlined-select-Gender"
                    select
                    label="Gender"
                    className="w-100 me-2"
                    fullWidth
                    name="Gender"
                  >
                    {gender.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>

              <button className="btn btn-primary w-25 mt-4 rounded rounded-4">
                Next
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
