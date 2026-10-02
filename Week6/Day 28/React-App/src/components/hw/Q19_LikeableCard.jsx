// Q19: LikeableCard with props + state (independent for each card)
import { useState } from "react";

function LikeableCard({ title, initialLikes }) {
  const [likes, setLikes] = useState(initialLikes);

  return (
    <div style={{ border: "1px solid #ccc", padding: "12px", margin: "8px", borderRadius: "8px", display: "inline-block" }}>
      <h3>{title}</h3>
      <p>Likes: {likes}</p>
      <button onClick={() => setLikes((l) => l + 1)}>👍 Like</button>
    </div>
  );
}

const cards = [
  { title: "React Basics", initialLikes: 5 },
  { title: "Hooks Deep Dive", initialLikes: 12 },
  { title: "State Management", initialLikes: 8 },
  { title: "Performance Tips", initialLikes: 3 },
];

function Q19_LikeableCard() {
  return (
    <div>
      {cards.map((card) => (
        <LikeableCard key={card.title} title={card.title} initialLikes={card.initialLikes} />
      ))}
    </div>
  );
}

export default Q19_LikeableCard;
