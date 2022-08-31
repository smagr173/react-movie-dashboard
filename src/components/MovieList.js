import '../assets/styles/MovieList.css';

function HandleList(props) {
  const itemCount = props.movieCount;
  const displayMore = props.displayMore;
  const movie = props.data;
  if (itemCount <= 19) {
    return (
      <MovieItem title={movie.title} />
    );
  } else {
    return (
      displayMore ? <MovieItem title={movie.title} /> : null
    );
  }
}

function MovieItem(props) {
  return (
    <div className="Movie-box">
      <div className="Movie-title">{props.title}</div>
    </div>
  );
}

function MovieList(props) {
  const showMore = props.showMore;
  return (
    <div className="Movie-list-wrapper">
      {props.data.map((movie, index) => <HandleList key={movie.id} data={movie} movieCount={index} displayMore={showMore} />)}
    </div>
  );
}

export default MovieList;
