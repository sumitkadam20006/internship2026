import { useState } from "react";
import "./StarRating.css";

function StarRating({ rating = 0, onRate }) {

    const [selected, setSelected] = useState(rating);

    const [hover, setHover] = useState(0);

    return (

        <div className="rating">

            <h2>Rate This Product</h2>

            {

                [1,2,3,4,5].map((star)=>(

                    <span

                        key={star}

                        className={
                            star <= (hover || selected)
                            ? "filled"
                            : "empty"
                        }

                        onMouseEnter={() => setHover(star)}

                        onMouseLeave={() => setHover(0)}

                        onClick={() => {

                            setSelected(star);

                            onRate(star);

                        }}

                    >

                        ★

                    </span>

                ))

            }

            <h3>

                Selected Rating : {selected}

            </h3>

        </div>

    );

}

export default StarRating;