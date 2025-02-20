// import { useState, useEffect } from "react";
// import { getMovieReviews } from "../utils/API";

// interface Review {
//   author: string;
//   content: string;
//   rating: string;
// }

// const Reviews: React.FC = () => {
//   const [reviews, setReviews] = useState<Review[]>([]);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await getMovieReviews(movieID);
//         const formattedReviews: Review[] = response.data.results.map(
//           (review: any) => ({
//             author: review.author,
//             content: review.content,
//             rating: review.author_details?.rating?.toString() || "No rating",
//           })
//         );
//         setReviews(formattedReviews);
//       } catch (error) {
//         console.error("Error fetching reviews:", error);
//       }
//     };

//     fetchReviews();
//   }, []);

//   return (
//     <div>
//       <h1>Reviews</h1>
//       {reviews.length > 0 ? (
//         <ul>
//           {reviews.map((review, index) => (
//             <li key={index}>
//               <h3>{review.author}</h3>
//               <p>{review.content}</p>
//               <strong>Rating: {review.rating}</strong>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No reviews available.</p>
//       )}
//     </div>
//   );
// };

// export default Reviews;
