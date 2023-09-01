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
} from "@mui/material";
import "./App.css";
import logo from "./assets/logo.png";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import db from "./config";
import {
  addDoc,
  collection,
  getDocs,
  query,
  refEqual,
  where,
} from "firebase/firestore";

function App() {
  const [department, setDepartment] = useState("");
  const [dep, setDep] = useState("");
  const [register, setRegister] = useState(false);
  const [quota, setQuota] = useState("");

  const options = [
    "Computer Science & Engineering (CSE)",
    "Electrical & Electronics Engineering (EEE)",
    "Electronics & Communication Engineering (ECE)",
    "Mechanical Engineering (MEC)",
    "Civil Engineering (CIV)",
    "Computer Science & Engineering-Cyber Security (CSC)",
    "Computer Science & Engineering-Data Science (CSD)",
    "Computer Science & Engineering- AI & ML (CSM)",
  ];

  var sdp = "";
  const _handleDepartment = (e) => {
    const d = e.value;
    setDepartment(d);
    if (d === "Computer Science & Engineering (CSE)") {
      setDep("CSE");
      sdp = "cse";
    } else if (d === "Electrical & Electronics Engineering (EEE)") {
      setDep("EEE");
      sdp = "eee";
    } else if (d === "Electronics & Communication Engineering (ECE)") {
      setDep("EEE");
      sdp = "ece";
    } else if (d === "Mechanical Engineering (MEC)") {
      setDep("MECH");
      sdp = "mech";
    } else if (d === "Civil Engineering (CIV)") {
      setDep("CIVIL");
      sdp = "civil";
    } else if (d === "Computer Science & Engineering-Cyber Security (CSC)") {
      setDep("CSC");
      sdp = "csc";
    } else if (d === "Computer Science & Engineering-Data Science (CSD)") {
      setDep("CSD");
      sdp = "csd";
    } else if (d === "Computer Science & Engineering- AI & ML (CSM)") {
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

  const _handleDetails = (e) => {
    e.preventDefault();
    results.post("/attendance.json", list).then((response) => {
      console.log(response);
      alert("Data submitted successfully");
    });
  };

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
        alink.download = "assets/Rules and Regulation.pdf";
        alink.click();
      });
    });
  };
  const _handleBrochure = (e) => {
    setDis4(false);
    fetch("assets/College Brochure.pdf").then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "assets/College Brochure.pdf";
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
      if (e.value === "Management Quota") {
        if (department === "Computer Science & Engineering (CSE)") {
          const collectionRef = collection(db, "cse");
          const querySnapshot = await getDocs(collectionRef);
          const fetchedData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setsData(fetchedData);
        } else if (
          department === "Electrical & Electronics Engineering (EEE)"
        ) {
          const collectionRef = collection(db, "eee");
          const querySnapshot = await getDocs(collectionRef);
          const fetchedData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setsData(fetchedData);
        } else if (
          department === "Electronics & Communication Engineering (ECE)"
        ) {
          const collectionRef = collection(db, "ece");
          const querySnapshot = await getDocs(collectionRef);
          const fetchedData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setsData(fetchedData);
        } else if (department === "Mechanical Engineering (MEC)") {
          const collectionRef = collection(db, "mech");
          const querySnapshot = await getDocs(collectionRef);
          const fetchedData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setsData(fetchedData);
        } else if (department === "Civil Engineering (CIV)") {
          const collectionRef = collection(db, "civil");
          const querySnapshot = await getDocs(collectionRef);
          const fetchedData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setsData(fetchedData);
        } else if (
          department === "Computer Science & Engineering-Cyber Security (CSC)"
        ) {
          const collectionRef = collection(db, "csc");
          const querySnapshot = await getDocs(collectionRef);
          const fetchedData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setsData(fetchedData);
        } else if (
          department === "Computer Science & Engineering-Data Science (CSD)"
        ) {
          const collectionRef = collection(db, "csd");
          const querySnapshot = await getDocs(collectionRef);
          const fetchedData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setsData(fetchedData);
        } else if (
          department === "Computer Science & Engineering- AI & ML (CSM)"
        ) {
          const collectionRef = collection(db, "csm");
          const querySnapshot = await getDocs(collectionRef);
          const fetchedData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setsData(fetchedData);
        }
      }
    }
    console.log(quota);
  };

  const [value, setValue] = useState("");
  const [form, setForm] = useState(false);
  const handleChange = (event) => {
    setValue(event.target.value);
    setForm((prev) => !prev);
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
      const collectionRef = collection(db, "registrations"); // Replace with your collection name
      await addDoc(collectionRef, {
        sNumber: sno,
        pNumber: pno,
        count: count,
        sname: value,
      });
      console.log("Document added successfully");
      setSno("");
      setPno("");
      setCount(1);
      setsName("");

      alert("Form Submitted");
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

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

          position: "absolute",
          top: "30px",
          left: { xs: "8px", md: "360px" },
          padding: "50px",
        }}>
        <img
          src={logo}
          width={"120%"}
          style={{
            position: "relative",
            right: "25px",
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
          {" "}
          Welcome to the Orientation Day <br />
          for batch of 2023-27
        </Typography>

        <Stack direction={"row"}></Stack>

        <Typography
          color={"#1e4160"}
          textAlign={"center"}
          sx={{
            fontSize: { xs: "1.25rem", md: "1.3rem" },
            marginBottom: "20px",
          }}
          fontWeight={"bold"}>
          Choose Your Department
        </Typography>

        <Dropdown
          className="departmentDropdown"
          options={options}
          onChange={_handleDepartment}
          placeholder="Select an option"
        />
        {/* <div className="dropdown">
            <input className="text-box" type="text" readOnly/>
            <div className="options">
              <div onClick="show('HTML')">HTML</div>
              <div onClick="show('CSS')">CSS</div>
            </div>
        </div> */}

        {department === "Computer Science & Engineering (CSE)" ? (
          <div
            style={{
              width: "100%",
              textAlign: "center",
              marginTop: "30px",
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
            <a onClick={_handleFN}>Schedule of Orientation Day.pdf </a>
            <br />
            <br />
            <a onClick={_handleContact}>Contact Details 2022-2023.pdf </a>
            <br />
            <br />
            <a onClick={_handleRules}>Rules and Regulations.pdf </a>
            <br />
            <br />
            <a onClick={_handleBrochure}>College Brochure.pdf </a>
            <br />
            <br />
            <button
              disabled={dis1 && dis2 && dis3 & dis4}
              type="button"
              className="btn btn-primary"
              onClick={_handleRegister}>
              Register
            </button>
          </div>
        ) : department === "Electrical & Electronics Engineering (EEE)" ? (
          <div
            style={{
              width: "100%",
              textAlign: "center",
              marginTop: "30px",
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
            <a onClick={_handleFN}>Schedule of Orientation Day.pdf </a>
            <br />
            <br />
            <a onClick={_handleContact}>Contact Details 2022-2023.pdf </a>
            <br />
            <br />
            <a onClick={_handleRules}>Rules and Regulations.pdf </a>
            <br />
            <br />
            <a onClick={_handleBrochure}>College Brochure.pdf </a>
            <br />
            <br />
            <button
              disabled={dis1 && dis2 && dis3 & dis4}
              type="button"
              className="btn btn-primary"
              onClick={_handleRegister}>
              Register
            </button>
          </div>
        ) : department === "Electronics & Communication Engineering (ECE)" ? (
          <div
            style={{
              width: "100%",
              textAlign: "center",
              marginTop: "30px",
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
            <a onClick={_handleFN}>Schedule of Orientation Day.pdf </a>
            <br />
            <br />
            <a onClick={_handleContact}>Contact Details 2022-2023.pdf </a>
            <br />
            <br />
            <a onClick={_handleRules}>Rules and Regulations.pdf </a>
            <br />
            <br />
            <a onClick={_handleBrochure}>College Brochure.pdf </a>
            <br />
            <br />
            <button
              disabled={dis1 && dis2 && dis3 & dis4}
              type="button"
              className="btn btn-primary"
              onClick={_handleRegister}>
              Register
            </button>
          </div>
        ) : department === "Mechanical Engineering (MEC)" ? (
          <div
            style={{
              width: "100%",
              textAlign: "center",
              marginTop: "30px",
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
            <a onClick={_handleFN}>Schedule of Orientation Day.pdf </a>
            <br />
            <br />
            <a onClick={_handleContact}>Contact Details 2022-2023.pdf </a>
            <br />
            <br />
            <a onClick={_handleRules}>Rules and Regulations.pdf </a>
            <br />
            <br />
            <a onClick={_handleBrochure}>College Brochure.pdf </a>
            <br />
            <br />
            <button
              disabled={dis1 && dis2 && dis3 & dis4}
              type="button"
              className="btn btn-primary"
              onClick={_handleRegister}>
              Register
            </button>
          </div>
        ) : department === "Civil Engineering (CIV)" ? (
          <div
            style={{
              width: "100%",
              textAlign: "center",
              marginTop: "30px",
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
            <a onClick={_handleFN}>Schedule of Orientation Day.pdf </a>
            <br />
            <br />
            <a onClick={_handleContact}>Contact Details 2022-2023.pdf </a>
            <br />
            <br />
            <a onClick={_handleRules}>Rules and Regulations.pdf </a>
            <br />
            <br />
            <a onClick={_handleBrochure}>College Brochure.pdf </a>
            <br />
            <br />
            <button
              disabled={dis1 && dis2 && dis3 & dis4}
              type="button"
              className="btn btn-primary"
              onClick={_handleRegister}>
              Register
            </button>
          </div>
        ) : department ===
          "Computer Science & Engineering-Cyber Security (CSC)" ? (
          <div
            style={{
              width: "100%",
              textAlign: "center",
              marginTop: "30px",
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
            <a onClick={_handleFN}>Schedule of Orientation Day.pdf </a>
            <br />
            <br />
            <a onClick={_handleContact}>Contact Details 2022-2023.pdf </a>
            <br />
            <br />
            <a onClick={_handleRules}>Rules and Regulations.pdf </a>
            <br />
            <br />
            <a onClick={_handleBrochure}>College Brochure.pdf </a>
            <br />
            <br />
            <button
              disabled={dis1 && dis2 && dis3 & dis4}
              type="button"
              className="btn btn-primary"
              onClick={_handleRegister}>
              Register
            </button>
          </div>
        ) : department ===
          "Computer Science & Engineering-Data Science (CSD)" ? (
          <div
            style={{
              width: "100%",
              textAlign: "center",
              marginTop: "30px",
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
            <a onClick={_handleFN}>Schedule of Orientation Day.pdf </a>
            <br />
            <br />
            <a onClick={_handleContact}>Contact Details 2022-2023.pdf </a>
            <br />
            <br />
            <a onClick={_handleRules}>Rules and Regulations.pdf </a>
            <br />
            <br />
            <a onClick={_handleBrochure}>College Brochure.pdf </a>
            <br />
            <br />
            <button
              disabled={dis1 && dis2 && dis3 & dis4}
              type="button"
              className="btn btn-primary"
              onClick={_handleRegister}>
              Register
            </button>
          </div>
        ) : department === "Computer Science & Engineering- AI & ML (CSM)" ? (
          <div
            style={{
              width: "100%",
              textAlign: "center",
              marginTop: "30px",
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
            <a onClick={_handleFN}>Schedule of Orientation Day.pdf </a>
            <br />
            <br />
            <a onClick={_handleContact}>Contact Details 2022-2023.pdf </a>
            <br />
            <br />
            <a onClick={_handleRules}>Rules and Regulations.pdf </a>
            <br />
            <br />
            <a onClick={_handleBrochure}>College Brochure.pdf </a>
            <br />
            <br />
            <button
              disabled={dis1 && dis2 && dis3 & dis4}
              type="button"
              className="btn btn-primary"
              onClick={_handleRegister}>
              Register
            </button>
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
              placeholder="Select an option"
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
                <div>
                  <h3>Convener Quota</h3>
                  <label>Please Enter Your Rank: </label>
                  <br />
                  <input
                    type="text"
                    // value={rankToFetch}
                    // onChange={(e) => setRankToFetch(e.target.value)}
                    placeholder="rank"
                    id="inputRank"
                  />
                  <br />
                  <br />
                  <button
                    type="button"
                    class="btn btn-primary"
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
                          {quota == " Management Quota"
                            ? department
                            : student_r}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                  <Stack>
                    <Typography
                      color={"#1e4160"}
                      fontSize={"1.2rem"}
                      textAlign={"center"}
                      fontWeight={"bold"}>
                      Please Fill The Details Below
                    </Typography>

                    <div
                      style={{
                        width: "70vw",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        margin: "auto",
                      }}>
                      <form onSubmit={_handleSubmit}>
                        <br />
                        <label
                          style={{
                            width: "85vw",
                            marginRight: "60px",
                            fontSize: "1.2rem",
                            textAlign: "center",
                          }}>
                          Enter Your Mobile Number:{" "}
                        </label>
                        <br />

                        <input
                          type="text"
                          placeholder="10 digit mobile number"
                          onChange={(e) => setSno(e.target.value)}
                        />
                        <br />
                        <br />
                        <label
                          style={{
                            width: "85vw",
                            marginRight: "60px",
                            fontSize: "1.2rem",
                            textAlign: "center",
                          }}>
                          Enter Your Parent Mobile Number:
                        </label>
                        <br></br>

                        <input
                          type="text"
                          placeholder="10 digit mobile number"
                          onChange={(e) => setPno(e.target.value)}
                        />
                        <br />
                        <br />
                        <label
                          style={{
                            width: "85vw",
                            marginRight: "60px",
                            fontSize: "1.2rem",
                            textAlign: "center",
                          }}>
                          Number of people attending the Orientation{" "}
                        </label>
                        <br />

                        <input
                          type="number"
                          placeholder="Enter the count"
                          onChange={(e) => setCount(e.target.value)}
                        />
                        <br />
                        <br />
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </form>
                    </div>
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
