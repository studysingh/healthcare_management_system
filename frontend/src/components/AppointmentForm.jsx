import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AppointmentForm = () => {
  const [user, setUser] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("Pediatrics");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);
  const [doctors, setDoctors] = useState([]);

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  // Fetch patient & doctors
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/patient/me",
          { withCredentials: true }
        );
        setUser(data.user);
      } catch (error) {
        toast.error("Failed to fetch patient details");
      }
    };

    const fetchDoctors = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/doctors",
        { withCredentials: true }
      );
      setDoctors(data.doctors);
    };

    fetchUser();
    fetchDoctors();
  }, []);

  // Handle appointment booking
  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/appointment/post",
        {
          // Patient details come from backend
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          nic: user.nic,
          dob: user.dob,
          gender: user.gender,

          // Appointment details
          appointment_date: appointmentDate,
          department,
          doctor_firstName: doctorFirstName,
          doctor_lastName: doctorLastName,
          hasVisited,
          address,
        },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );
      toast.success(data.message);

      // reset only appointment fields
      setAppointmentDate("");
      setDepartment("Pediatrics");
      setDoctorFirstName("");
      setDoctorLastName("");
      setHasVisited(false);
      setAddress("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error booking appointment");
    }
  };

  return (
    <div className="container form-component appointment-form">
      <h2>Appointment</h2>

      <form onSubmit={handleAppointment}>
        {/* Pre-filled patient details (readOnly) */}
        {user && (
          <>
            <div>
              <input type="text" value={user.firstName} readOnly />
              <input type="text" value={user.lastName} readOnly />
            </div>
            <div>
              <input type="text" value={user.email} readOnly />
              <input type="text" value={user.phone} readOnly />
            </div>
            <div>
              <input type="text" value={user.nic} readOnly />
              <input
                type="date"
                value={user.dob.split("T")[0]} // format YYYY-MM-DD
                readOnly
              />
            </div>
            <div>
              <input type="text" value={user.gender} readOnly />
            </div>
          </>
        )}

        {/* Appointment details */}
        <div>
          <select
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setDoctorFirstName("");
              setDoctorLastName("");
            }}
          >
            {departmentsArray.map((depart, index) => (
              <option value={depart} key={index}>
                {depart}
              </option>
            ))}
          </select>

          <select
            value={`${doctorFirstName} ${doctorLastName}`}
            onChange={(e) => {
              const [firstName, lastName] = e.target.value.split(" ");
              setDoctorFirstName(firstName);
              setDoctorLastName(lastName);
            }}
            readOnly={!department}
          >
            <option value="">Select Doctor</option>
            {doctors
              .filter((doc) => doc.doctorDepartment === department)
              .map((doc, index) => (
                <option
                  value={`${doc.firstName} ${doc.lastName}`}
                  key={index}
                >
                  {doc.firstName} {doc.lastName}
                </option>
              ))}
          </select>
        </div>

        <input
          type="date"
          placeholder="Appointment Date"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
        />

        <textarea
          rows="10"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <p style={{ marginBottom: 0 }}>Have you visited before?</p>
          <input
            type="checkbox"
            checked={hasVisited}
            onChange={(e) => setHasVisited(e.target.checked)}
            style={{ flex: "none", width: "25px" }}
          />
        </div>

        <button type="submit" style={{ cursor: "pointer", margin: "0 auto" }}>
          GET APPOINTMENT
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
