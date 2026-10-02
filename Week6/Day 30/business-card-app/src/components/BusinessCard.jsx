import "./BusinessCard.css";

function BusinessCard({

    name = "Unknown",

    title = "No Title",

    email = "No Email",

    phone = "No Phone",

    avatarInitials = "NA",

    theme = "light"

}) {

    return (

        <div className={`card ${theme}`}>

            <div className="avatar">

                {avatarInitials}

            </div>

            <h2>{name}</h2>

            <h4>{title}</h4>

            <p>{email}</p>

            <p>{phone}</p>

        </div>

    );

}

export default BusinessCard;