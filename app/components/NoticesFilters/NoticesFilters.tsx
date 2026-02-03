// "use client";

// import { useEffect, useState } from "react";
// import { getCategories } from "@/app/lib/api";

// const NoticesFilters = () => {
//   const [categories, setCategories] = useState("");
//   const [selected, setSelected] = useState("");

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const data = await getCategories();
//         setCategories(data);
//       } catch (error) {
//         console.error("Failed to load categories", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleChange = (value: string) => {
//     setCategories(value);
//   };

//   return (
//     <form>
//       <label>
//         Category:
//         <select value={selected} onChange={handleChange}>
//           <option value="">All categories</option>

//           {categories.map((category) => (
//             <option key={category} value={category}>
//               {category}
//             </option>
//           ))}
//         </select>
//       </label>
//     </form>
//   );
// };

// export default NoticesFilters;
