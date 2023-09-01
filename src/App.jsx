import { useEffect, useState } from "react";
import {
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./App.css";
import logo from "./assets/logo.png";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import db from "./config";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

function App() {
  const [department, setDepartment] = useState("");
  const [dep, setDep] = useState("");
  const [register, setRegister] = useState(false);
  const [quota, setQuota] = useState("");
  const matches = useMediaQuery("(min-width:700px)");
  const [submitted] = useState(
    JSON.parse(localStorage.getItem("submitted") ?? null) ?? null
  );

  const options = [
    "Computer Science & Engineering (CSE) (FN)",
    "Electrical & Electronics Engineering (EEE) (AN)",
    "Electronics & Communication Engineering (ECE) (AN)",
    "Mechanical Engineering (MEC) (AN)",
    "Civil Engineering (CIV) (AN)",
    "Computer Science & Engineering-Cyber Security (CSC) (FN)",
    "Computer Science & Engineering-Data Science (CSD) (FN)",
    "Computer Science & Engineering- AI & ML (CSM) (FN)",
  ];

  var sdp = "";
  const _handleDepartment = (e) => {
    const d = e.value;
    setDepartment(d);
    if(d === options[0]){
      setDep("CSE");
      sdp = "cse";
    }
    else if(d === options[1]){
      setDep("EEE");
      sdp = "eee";
    }
    else if(d === options[2]){
      setDep("ECE");
      sdp = "ece";
    }
    else if(d === options[3]){
      setDep("MECH");
      sdp = "mech";
    }
    else if(d === options[4]){
      setDep("CIVIL");
      sdp = "civil";
    }
    else if(d === options[5]){
      setDep("CSC");
      sdp = "csc";
    }
    else if(d === options[6]){
      setDep("CSD");
      sdp = "csd";
    }
    else if(d === options[7]){
      setDep("CSM");
      sdp = "csm";
    }
    // console.log(sdp);
  };

  const _handleRegister = (e) => {
    setRegister(true);
  };

  const [dis1, setDis1] = useState(true);
  const [dis2, setDis2] = useState(true);
  const [dis3, setDis3] = useState(true);
  const [dis4, setDis4] = useState(true);

  const _handleFN = (e) => {
    fetch("assets/Forenoon Session Schedule.pdf").then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "assets/Forenoon Session Schedule.pdf";
        alink.click();
      });
    });
  };
  const _handleAN = (e) => {
    setDis1(false);
    fetch("assets/Afternoon Session Schedule.pdf").then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "assets/Afternoon Session Schedule.pdf";
        alink.click();
      });
    });
  };

  const _handleContact = (e) => {
    setDis2(false);
    fetch("assets/Contact Details.pdf").then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "assets/Contact Details.pdf";
        alink.click();
      });
    });
  };

  const _handleRules = (e) => {
    setDis3(false);
    fetch("assets/Rules and Regulation.pdf").then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "Code of Conduct.pdf";
        alink.click();
      });
    });
  };
  const _handleBrochure = (e) => {
    setDis4(false);
    fetch("assets/College Brochure.pdf").then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "College Brochure.pdf";
        alink.click();
      });
    });
  };

  const [data, setData] = useState([]);
  const [sdata, setsData] = useState([]);
  const _handleQuota = async (e) => {
    setQuota(e.value);

    if (e.value == "Management Quota") {
      setQuota(e.value);
          const lowdep = dep.toLowerCase();
          const collectionRef = collection(db, lowdep);
          const querySnapshot = await getDocs(collectionRef);
          const fetchedData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          fetchedData.sort((a, b) => a.name.localeCompare(b.name));
          setsData(fetchedData);
      }
  };

  const [value, setValue] = useState("");
  const [form, setForm] = useState(false);
  const handleChange = (event) => {
    setValue(event.target.value);
    // sdata.name.includes(event.target.value)
    const snames = sdata.map((item) => item.name);
    setForm(snames.includes(event.target.value));
  };

  // const [rank, setRank] = useState(0);
  // const [studentName, setStudentName] = useState('');

  // const _handleRank = (e) => {
  //   const newRank = e.target.value; // Get the new rank value from the input
  //   setRank(newRank); // Update the rank state
  // };

  const [student_r, setStudent_r] = useState("");
  const fetchStudent = async () => {
    try {
      setValue("");
      setStudent_r("");
      setForm(false);
      const rank = parseInt(document.getElementById("inputRank").value);
      // const rank = 36871;
      // const dep = "CSE";
      // console.log("rank is , ", rank);
      // console.log("dep is , ", dep);
      const q = query(
        collection(db, "convener"),
        where("rank", "==", rank),
        where("bnc", "==", dep)
      ); // Use rankToFetch in the query
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const studentDoc = querySnapshot.docs[0].data().name;
        const dpt = querySnapshot.docs[0].data();
        // console.log("data ", dpt);
        // console.log(studentDoc);
        setValue(studentDoc);
        setStudent_r(dpt.bnc);
        setForm(true);
      } else {
        alert("No student found with the given rank and branch.");
        // console.log("No student found with the given condition.");
      }
    } catch (error) {
      console.error("Error fetching student:", error);
    }
  };

  const [sno, setSno] = useState("");
  const [pno, setPno] = useState("");
  const [count, setCount] = useState(1);
  const [sname, setsName] = useState("");
  const _handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (count > 3) {
        alert("Maximum 3 people including student");
        return;
      }
      if (sno.length !== 10 || pno.length !== 10 || isNaN(sno) || isNaN(pno)) {
        alert("Please enter a valid 10 digit phone number");
        return;
      }
      const collectionRef = collection(db, "registrations"); // Replace with your collection name
      await addDoc(collectionRef, {
        sNumber: sno,
        pNumber: pno,
        count: count,
        sname: value,
      });
      // console.log("Document added successfully");
      const studentData = {
        name: value,
        branch: quota == "Management Quota"
                            ? department
                            : student_r,
        studentNumber: sno,
        parentNumber: pno,
        count: count,
      };
      localStorage.setItem("submitted", JSON.stringify(studentData));
      location.reload();
      setSno("");
      setPno("");
      setCount(1);
      setsName("");
      alert("Details Saved Successfully");
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  const items = submitted
    ? [
        "Welcome to the Orientation Day for batch of 2023-27",
        "Your Details Have Been Submitted :)",
        "Name: " + submitted.name,
        "Branch: " + submitted.branch,
        "Student Number: " + submitted.studentNumber,
        "Parent Number: " + submitted.parentNumber,
        "Number of people attending: " + submitted.count,
      ]
    : null;

  if (submitted) {
    return (
      <div
        style={{
          width: "100vw",
        }}>
        <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>
        <Container
          sx={{
            width: { xs: "95vw", md: "50vw" },
            height: "auto",
            bgcolor: "#fff",
            top: "30px",
          }}>
          <img
            src={logo}
            width="100%"
            style={{
              paddingTop: "20px",
              position: "relative",
              marginBottom: "20px",
            }}
          />
          <Stack
            sx={{
              paddingBottom: "20px",
            }}>
            {items.map((item, idx) => (
              <Typography
                key={idx}
                color={"#1e4160"}
                textAlign={"center"}
                sx={{
                  fontSize: { xs: "1.2rem", md: "1.3rem" },
                  marginBottom: "20px",
                }}
                fontWeight={idx < 2 ? "bold" : null}>
                {item}
              </Typography>
            ))}
          </Stack>
        </Container>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100vw",
      }}>
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      <Container
        sx={{
          width: { xs: "95vw", md: "50vw" },
          // width: "auto",
          height: "auto",
          bgcolor: "#fff",
          // position: "absolute",
          top: "30px",
          // left: { xs: "25px", md: "360px" },
          // padding: "50px",
        }}>
        <img
          src={logo}
          width="100%"
          style={{
            paddingTop: "20px",
            // width: { xs: "95vw", md: "50vw" },
            position: "relative",
            marginBottom: "20px",
          }}
        />

        <Typography
          color={"#1e4160"}
          textAlign={"center"}
          fontWeight={"bold"}
          sx={{
            fontSize: { xs: "1.5rem", md: "1.7rem" },
            marginBottom: "30px",
            width: "100%",
          }}>
          Welcome to the Orientation Day for batch of 2023-27
        </Typography>

        <Stack direction={"row"}></Stack>

        {/* <Typography
          color={"#1e4160"}
          textAlign={"center"}
          sx={{
            fontSize: { xs: "1.25rem", md: "1.3rem" },
            marginBottom: "20px",
          }}
          fontWeight={"bold"}>
          Choose Your Department
        </Typography> */}

        <Dropdown
          className="departmentDropdown"
          options={options}
          onChange={_handleDepartment}
          placeholder="Select Department"
        />
        {/* <div className="dropdown">
            <input className="text-box" type="text" readOnly/>
            <div className="options">
              <div onClick="show('HTML')">HTML</div>
              <div onClick="show('CSS')">CSS</div>
            </div>
        </div> */}

        {options.includes(department) ? (
          <div
            style={{
              width: "100%",
              textAlign: "center",
              marginTop: "30px",
              paddingBottom: !register ? "30px" : null,
            }}>
            <Typography
              sx={{
                color: "#1e4160",
                fontSize: { xs: "1.2rem", md: "1.3rem" },
                fontWeight: "bold",
                marginBottom: "20px",
              }}>
              Please download the files below to continue
            </Typography>
            <Stack spacing={2}>
              {/* <a
                onClick={
                  morningBatch.includes(department) ? _handleFN : _handleAN
                }>
                Schedule of Orientation Day.pdf{" "}
              </a> */}
              <a onClick={_handleContact}>Contact Details 2023-2024.pdf </a>
              <a onClick={_handleRules}>Code of Conduct.pdf </a>
              <a className="p-2" onClick={_handleBrochure}>
                College Brochure.pdf
              </a>
            </Stack>
            {!(dis1 && dis2 && dis3 & dis4) && (
              <button
                style={{
                  marginTop: "30px",
                }}
                disabled={dis1 && dis2 && dis3 & dis4}
                type="button"
                className="btn btn-primary"
                onClick={_handleRegister}>
                Register
              </button>
            )}
          </div>
        ) : (
          <br />
        )}

        {register && (
          <div
            style={{
              padding: "30px",
            }}>
            <Dropdown
              options={["Convener Quota", "Management Quota"]}
              placeholder="Select Admission Quota"
              onChange={_handleQuota}
            />

            {quota == "Management Quota" ? (
              <div
                style={{
                  marginTop: "30px",
                }}>
                <Stack gap={2}>
                  <Typography
                    color={"#1e4160"}
                    textAlign={"center"}
                    fontSize={"1.5rem"}
                    fontWeight={"bold"}>
                    Management Quota
                  </Typography>
                  <Typography
                    color={"#1e4160"}
                    textAlign={"center"}
                    fontSize={"1.1rem"}>
                    Please choose your name:
                  </Typography>
                </Stack>
                <Stack
                  direction={"column"}
                  gap={2}
                  marginTop={"10px"}
                  alignItems={"center"}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Choose an option</FormLabel>
                    <RadioGroup
                      aria-label="options"
                      name="options"
                      value={value}
                      onChange={handleChange}>
                      {sdata.map((item, idx) => (
                        <FormControlLabel
                          key={idx}
                          value={item.name}
                          control={<Radio />}
                          label={item.name}
                          sx={{
                            marginBottom: "20px",
                          }}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Stack>
              </div>
            ) : quota == "Convener Quota" ? (
              <>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "30px",
                  }}>
                  <Typography
                    color={"#1e4160"}
                    textAlign={"center"}
                    fontSize={"1.5rem"}
                    fontWeight={"bold"}>
                    Convener Quota
                  </Typography>
                  <br />
                  <input
                    style={{
                      width: "60%",
                      padding: "10px",
                      borderRadius: "10px",
                      border: "1px solid #ccc",
                      backgroundColor: "#fff",
                      boxShadow: "0 0 10px #ccc",
                      WebkitBorderRadius: "4px",
                      boxSizing: "border-box",
                    }}
                    type="text"
                    placeholder="Please Enter Your Rank:"
                    id="inputRank"
                  />
                  <br />
                  <br />
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={fetchStudent}>
                    Get Details
                  </button>
                </div>
              </>
            ) : (
              <></>
            )}

            {form && (
              <>
                <Stack gap={4} marginTop={"50px"}>
                  <Stack>
                    <Typography
                      color={"#1e4160"}
                      fontSize={"1.25rem"}
                      textAlign={"center"}
                      fontWeight={"bold"}>
                      Student Details
                    </Typography>
                    <Stack gap={4} marginTop={"20px"}>
                      <Stack gap={1}>
                        <Typography
                          textAlign={"center"}
                          fontSize={"1.2rem"}
                          color={"#1e4160"}>
                          Name:
                        </Typography>
                        <Typography
                          textAlign={"center"}
                          sx={{
                            fontSize: "1.2rem",
                            color: "#1e4160",
                            fontWeight: 300,
                          }}
                          key={department}>
                          {value}
                        </Typography>
                      </Stack>

                      <Stack gap={1}>
                        <Typography
                          textAlign={"center"}
                          fontSize={"1.2rem"}
                          color={"#1e4160"}>
                          Department:
                        </Typography>
                        <Typography
                          textAlign={"center"}
                          sx={{
                            fontSize: "1.2rem",
                            color: "#1e4160",
                            fontWeight: 300,
                          }}
                          color={"#1e4160"}
                          key={department}>
                          {quota == "Management Quota" ? department : student_r}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                  <Stack>
                    <Typography
                      color={"#1e4160"}
                      fontSize={"1.2rem"}
                      textAlign={"center"}
                      fontWeight={"bold"}
                      sx={{
                        marginBottom: "20px",
                      }}>
                      Please Fill The Details Below
                    </Typography>

                    
                      <form onSubmit={_handleSubmit}>
                      <div
                      style={{
                        // width: "70vw",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        margin: "auto",
                      }}>

                          <TextField
                            style={{
                              fontSize: "1.2rem",
                              textAlign: "center",
                              width: "100%",
                              paddingBottom: "10px",
                            }}
                            placeholder="10 digit mobile number"
                            onChange={(e) => setSno(e.target.value)}
                            id="standard-basic"
                            label="Enter Your Mobile Number"
                            variant="standard"
                          />
                          <TextField
                            style={{
                              width: "100%",
                              fontSize: "1.2rem",
                              textAlign: "center",
                              paddingBottom: "10px",
                            }}
                            placeholder="10 digit mobile number"
                            onChange={(e) => setPno(e.target.value)}
                            id="standard-basic"
                            label="Enter Your Parent Mobile Number"
                            variant="standard"
                          />
                        <TextField
                          style={{
                            fontSize: "1.2rem",
                            textAlign: "center",
                            width: "100%",
                          }}
                          placeholder="Maximum 3 Including Student"
                          onChange={(e) => setCount(e.target.value)}
                          id="standard-basic"
                          label=" Number of People attending the Orientation Program"
                          variant="standard"
                        />

                        <button style={{
                          marginTop: "30px",
                        }} type="submit" className="btn btn-primary">
                          Submit
                        </button>
                    </div>

                      </form>
                  </Stack>
                </Stack>
              </>
            )}
          </div>
        )}
      </Container>
    </div>
  );
}

export default App;
