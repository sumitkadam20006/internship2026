import "./QuestionCard.css";

function QuestionCard({question,nextQuestion}){

    return(

        <div className="card">

            <h2>{question.question}</h2>

            {

                question.options.map((option,index)=>

                    <button

                        key={index}

                        onClick={()=>nextQuestion(index)}

                    >

                        {option}

                    </button>

                )

            }

        </div>

    );

}

export default QuestionCard;