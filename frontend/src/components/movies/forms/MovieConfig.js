import React, { useState } from "react";
import MovieForm from "./MovieForm";
import Button from "react-bootstrap/Button";

const MovieConfig = (props) => {
  const [searchedMovie, setSearchedMovie] = useState();
  const test = () => {
    console.log("TEST");
    const movie = {
      title: "Fight Club",
      subtitle: "Übermut. Chaos. Seife.",
      originalTitle: "Fight Club The Original",
      description: "Ein Yuppie findet beim charismatischen Tyler Durden Unterschlupf, nachdem seine Wohnung in die Luft gejagt wird. Ein Gerangel zwischen den beiden entwickelt sich zu einer Schlägerei, die mit der Erkenntnis endet, dass man sich nach einer ordentlichen Portion Prügel einfach besser fühlt. Der \"Fight Club\" ist geboren. Immer mehr Männer versammeln sich, um sich zu schlagen - und gestärkt in den Alltag zu gehen. Wie ein Virus greift das Konzept um sich, doch für Tyler ist der Kampfverein nur die erste Stufe, um die USA in die Knie zu zwingen.",
      runtime: 139,
      release: {
        productionCountry: "US",
        productionYear: 1999,
        ageRestriction: 18,
      },
      keywords: ["fight", "dual identity", "based on novel or book"],
      genres: ["Thriller", "Drama"],
      credits: {
        crew: {
          director: { name: "Christopher Nolan" },
          screenwriter: { name: "Jonathan Nolan" },
        },
        cast: [
          {
            name: "Leonardo di Caprio",
            roleName: "Jordan Belfort",
            img: "https://image.tmdb.org/t/p/w500/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg",
          },
          {
            name: "Keanu Reeves",
            roleName: "Neo",
            img: "https://image.tmdb.org/t/p/w500/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg",
          },
        ],
      },
      media: {
        images: {
          poster: "https://image.tmdb.org/t/p/w500/rUPKPWBpr2ZbDXXZpT0qgYqTlG9.jpg",
        },
      },
    };
    setSearchedMovie(movie);
  };

const submitHandler = async (movie) => {
  const res = await props.onSubmit(movie);
  console.log("CONFIG RES",res);
  if(res?.code === 200) {
    console.log("DELTE SEACRCHED");
    setSearchedMovie({});
  }
  return res;
};

  return (
    <React.Fragment>
      <Button onClick={test}>TEST</Button>
      <br />
      <label htmlFor="searchMovie">Film in Datenbank suchen</label>
      <input
        className="form-control mr-sm-2 mt-2"
        type="search"
        placeholder="Suche"
        aria-label="Suche"
        style={{ zIndex: "1" }}
        id="searchMovie"
      />
      {/* <ListGroup className={styles.listGroup} variant="flush">
      <ListGroup.Item>Cras justo odio</ListGroup.Item>
      <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
      <ListGroup.Item>Morbi leo risus</ListGroup.Item>
      <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
      <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
    </ListGroup> */}
      <MovieForm
        onSubmit={submitHandler}
        isNew={props.isNew}
        default={searchedMovie}
      />
    </React.Fragment>
  );
};

export default MovieConfig;
