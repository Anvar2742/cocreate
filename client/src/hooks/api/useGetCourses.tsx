// import React from "react";
// import useAxiosPrivate from "../useAxiosPrivate";

// const useGetCourses = () => {
//     const axiosPrivate = useAxiosPrivate();
//     const getCourses = async () => {
//         try {
//             const resp = await axiosPrivate.get("/courses");
//             if (resp.status === 200) {
//                 setCoursesArr(resp.data);
//                 setIsLoading(false);
//             }
//         } catch (error: AxiosError | any) {
//             console.log(error);

//             if (error.response.status === 404) {
//                 setCoursesEls(
//                     <div>
//                         <h2 className="font-medium text-xl">
//                             You don't have access to any course
//                         </h2>
//                         <p className="text-md">Please contact your tutor</p>
//                     </div>
//                 );
//             }
//             setIsLoading(false);
//         }
//     };
// };

// export default useGetCourses;
