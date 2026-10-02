import { useState } from "react";
import "./CharacterCounter.css";

function CharacterCounter() {

    const limit = 280;

    const [text, setText] = useState("");

    const remaining = limit - text.length;

    function handlePost() {

        alert("Post Submitted!");

        setText("");

    }

    return (

        <div className="box">

            <h2>Post Something</h2>

            <textarea

                value={text}

                maxLength={limit}

                onChange={(e)=>setText(e.target.value)}

                placeholder="Write here..."

            />

            <p

                style={{

                    color: remaining <=20 ? "red" : "black"

                }}

            >

                {remaining} Characters Remaining

            </p>

            <button

                disabled={text===" " || text===""}

                onClick={handlePost}

            >

                Post

            </button>

        </div>

    );

}

export default CharacterCounter;