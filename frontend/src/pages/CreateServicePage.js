// import { useState, useContext } from "react";
// import api from "../utils/api";
// import { AuthContext } from "../context/AuthContext";

// const CreateServicePage = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     budget: ""
//   });

//   const { token } = useContext(AuthContext);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.post("/services", formData, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       alert("Service created!");
//       console.log(res.data);
//     } catch (error) {
//       console.error(error.response?.data || error.message);
//       alert("Failed to create service");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Create Service</h2>
//       <input name="title" placeholder="Title" onChange={handleChange} />
//       <input name="description" placeholder="Description" onChange={handleChange} />
//       <input name="budget" placeholder="Budget" onChange={handleChange} />
//       <button type="submit">Create</button>
//     </form>
//   );
// };

// export default CreateServicePage;
