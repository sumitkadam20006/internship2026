// Q18: StarRating with clickable stars, hover preview
import { useState } from "react";

function Q18_StarRating() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          style={{
            cursor: "pointer",
            fontSize: "32px",
            color: star <= (hover || rating) ? "#ffc107" : "#ccc",
          }}
        >
          ★
        </span>
      ))}
      <p>Rating: {rating} / 5</p>
    </div>
  );
}

export default Q18_StarRating;
