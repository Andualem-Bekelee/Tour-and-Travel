// import {
//   CalendarIcon,
//   CompassIcon,
//   MapPinIcon,
//   SearchIcon,
// } from "lucide-react";
// import React from "react";
// import { Button } from "./Button";

// const searchFields = [
//   {
//     icon: MapPinIcon,
//     label: "Where",
//     value: "Search destinations",
//     valueColor: "text-[#717171]",
//   },
//   {
//     icon: CalendarIcon,
//     label: "When",
//     value: "February 05 ~ March 14",
//     valueColor: "text-black",
//   },
//   {
//     icon: CompassIcon,
//     label: "Tour Type",
//     value: "All tour",
//     valueColor: "text-[#717171]",
//   },
// ];

// export const SearchFormSection = () => {
//   return (
//     <section className="w-full flex justify-center px-4 py-[174px] translate-y-[-1rem] animate-fade-in opacity-0">
//       <div className="w-full max-w-[880px] h-20 relative bg-white rounded-[200px] shadow-[0px_10px_40px_#0000000d]">
//         <div className="flex items-center h-full px-2.5 gap-0">
//           {searchFields.map((field, index) => (
//             <div
//               key={index}
//               className="flex items-center gap-2.5 px-2.5 flex-1 cursor-pointer hover:bg-gray-50/50 transition-colors rounded-full h-[60px]"
//             >
//               <div className="h-[50px] w-[50px] flex items-center justify-center bg-[#eb662b0d] rounded-full flex-shrink-0">
//                 <field.icon className="w-5 h-5 text-[#05073c]" />
//               </div>

//               <div className="flex flex-col justify-center min-w-0">
//                 <div className="[font-family:'Inter',Helvetica] font-medium text-[#05073c] text-[14.9px] leading-6 whitespace-nowrap">
//                   {field.label}
//                 </div>
//                 <div
//                   className={`[font-family:'Inter',Helvetica] font-normal text-[13.7px] leading-[19.6px] whitespace-nowrap ${field.valueColor}`}
//                 >
//                   {field.value}
//                 </div>
//               </div>
//             </div>
//           ))}

//           <Button
//             className="h-[60px] w-[60px] bg-[#eb662b] hover:bg-[#d45a24] rounded-full flex items-center justify-center flex-shrink-0 mr-2.5 transition-colors"
//             size="icon"
//           >
//             <SearchIcon className="w-4 h-4 text-white" />
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// };
