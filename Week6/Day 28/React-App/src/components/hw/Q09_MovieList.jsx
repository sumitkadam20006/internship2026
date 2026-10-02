// Q9: Array of movie objects, render MovieCard using spread operator
const movies = [
  { title: "Inception", year: 2010, rating: 8.8 },
  { title: "The Matrix", year: 1999, rating: 8.7 },
  { title: "Interstellar", year: 2014, rating: 8.7 },
  { title: "Parasite", year: 2019, rating: 8.5 },
  { title: "The Dark Knight", year: 2008, rating: 9.0 },
  { title: "Fight Club", year: 1999, rating: 8.8 },
];

function MovieCard({ title, year, rating }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "8px", margin: "6px", borderRadius: "6px" }}>
      <strong>{title}</strong> ({year}) — Rating: {rating}/10
    </div>
  );
}

function Q09_MovieList() {
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard key={movie.title} {...movie} />
      ))}
    </div>
  );
}

export default Q09_MovieList;
