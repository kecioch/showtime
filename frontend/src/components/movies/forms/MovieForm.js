import { useEffect, useState } from "react";
import styles from "./MovieForm.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CastAvatar from "../CastAvatar";
import HorizontalScrollContainer from "../../ui/HorizontalScrollContainer";
import BadgeAction from "../../ui/BadgeAction";
import LoadingButton from "../../ui/LoadingButton";
import { AnimatePresence, motion } from "framer-motion";

const MovieForm = (props) => {
  const isNew = props.isNew !== undefined ? props.isNew : true;
  const classes = `${styles.card} ${props.className}`;

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");
  const [description, setDescription] = useState("");
  const [runtime, setRuntime] = useState("");
  const [productionCountry, setProductionCountry] = useState("");
  const [productionYear, setProductionYear] = useState("");
  const [ageRestriction, setAgeRestriction] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [keywordInput, setKeywordInput] = useState("");
  const [genres, setGenres] = useState([]);
  const [genreInput, setGenreInput] = useState("");
  const [director, setDirector] = useState("");
  const [screenwriter, setScreenwriter] = useState("");
  const [castNameInput, setCastNameInput] = useState("");
  const [castCharacterInput, setCastCharacterInput] = useState("");
  const [castImageInput, setCastImageInput] = useState("");
  const [cast, setCast] = useState([]);
  const [poster, setPoster] = useState("");
  const [trailer, setTrailer] = useState("");

  useEffect(() => {
    setTitle(props.default?.title ?? "");
    setSubtitle(props.default?.subtitle ?? "");
    setOriginalTitle(props.default?.originalTitle ?? "");
    setDescription(props.default?.description ?? "");
    setRuntime(props.default?.runtime ?? "");
    setProductionCountry(props.default?.release?.productionCountry ?? "");
    setProductionYear(props.default?.release?.productionYear ?? "");
    setAgeRestriction(props.default?.release?.ageRestriction ?? "");
    setDirector(props.default?.credits?.crew?.director?.name ?? "");
    setScreenwriter(props.default?.credits?.crew?.screenwriter?.name ?? "");
    setPoster(props.default?.media?.images?.poster ?? "");
    setTrailer(props.default?.media?.videos?.trailer?.key ?? "");
    setKeywords(props.default?.keywords ?? []);
    setGenres(props.default?.genres ?? []);
    setCast(props.default?.credits?.cast ?? []);
  }, [props.default]);

  const submitHandler = async (ev) => {
    ev.preventDefault();
    const movie = {
      title,
      subtitle,
      originalTitle,
      description,
      runtime,
      release: {
        productionCountry,
        productionYear,
        ageRestriction,
      },
      keywords,
      genres,
      credits: {
        crew: {
          director: { name: director },
          screenwriter: { name: screenwriter },
        },
        cast,
      },
      media: {
        images: {
          poster,
        },
        videos: {
          trailer: {
            key: trailer,
            site: "YouTube",
          },
        },
      },
    };
    const res = await props.onSubmit(movie);
    if (res?.status === 200) {
      setTitle("");
      setSubtitle("");
      setOriginalTitle("");
      setDescription("");
      setRuntime("");
      setProductionCountry("");
      setProductionYear("");
      setAgeRestriction("");
      setDirector("");
      setScreenwriter("");
      setPoster("");
      setTrailer("");
      setKeywords([]);
      setKeywordInput("");
      setGenres([]);
      setGenreInput("");
      setCast([]);
      setCastNameInput("");
      setCastCharacterInput("");
      setCastImageInput("");
    }
  };

  const addCastHandler = () => {
    const member = {
      name: castNameInput,
      roleName: castCharacterInput,
      img: castImageInput,
    };
    setCast((cast) => [...cast, member]);
    setCastCharacterInput("");
    setCastImageInput("");
    setCastNameInput("");
  };

  const addGenreHandler = () => {
    if (!genres.find((el) => el === genreInput))
      setGenres((genres) => [...genres, genreInput]);
    setGenreInput("");
  };

  const addKeywordHandler = () => {
    if (!keywords.find((el) => el === keywordInput))
      setKeywords((keywords) => [...keywords, keywordInput]);
    setKeywordInput("");
  };

  const deleteGenreHandler = (name) => {
    setGenres((genres) => genres.filter((el) => el !== name));
  };

  const deleteKeywordHandler = (name) => {
    setKeywords((keywords) => keywords.filter((el) => el !== name));
  };

  const deleteCastHandler = (person) => {
    setCast((cast) =>
      cast.filter(
        (el) => el.name !== person.name && el.roleName !== person.roleName
      )
    );
  };

  const keywordsElements = keywords.map((el, i) => (
    <BadgeAction
      bg="secondary"
      key={i}
      id={el}
      onDelete={deleteKeywordHandler}
      isDeleteable={true}
    >
      {el}
    </BadgeAction>
  ));

  const genreElements = genres.map((el, i) => (
    <BadgeAction
      bg="secondary"
      id={el}
      key={i}
      onDelete={deleteGenreHandler}
      isDeleteable={true}
    >
      {el}
    </BadgeAction>
  ));

  const castElements = cast.map((el, i) => (
    <CastAvatar
      key={i}
      person={el}
      isDeleteable={true}
      onDelete={deleteCastHandler}
    />
  ));

  const errorMsg = props.error && <p className="text-danger">{props.error}</p>;

  return (
    <Card className={classes}>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Titel</Form.Label>
          <Form.Control
            type="text"
            placeholder="Titel eingeben..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="subtitle">
          <Form.Label>Subtitel</Form.Label>
          <Form.Control
            type="text"
            placeholder="Subtitel eingeben..."
            onChange={(e) => setSubtitle(e.target.value)}
            value={subtitle}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="originalTitle">
          <Form.Label>Original Titel</Form.Label>
          <Form.Control
            type="text"
            placeholder="Original Titel eingeben..."
            onChange={(e) => setOriginalTitle(e.target.value)}
            value={originalTitle}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="runtime">
          <Form.Label>Laufzeit (min)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Laufzeit eingeben (Minuten)..."
            onChange={(e) => setRuntime(e.target.value)}
            value={runtime}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="productionCountry">
          <Form.Label>Produktionsland</Form.Label>
          <Form.Control
            type="text"
            placeholder="Produktionsland eingeben..."
            onChange={(e) => setProductionCountry(e.target.value)}
            value={productionCountry}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="productionYear">
          <Form.Label>Produktionjahr</Form.Label>
          <Form.Control
            type="number"
            placeholder="Jahr eingeben..."
            onChange={(e) => setProductionYear(e.target.value)}
            value={productionYear}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="ageRestriction">
          <Form.Label>Altersfreigabe</Form.Label>
          <Form.Control
            type="number"
            placeholder="Altersfreigabe eingeben..."
            onChange={(e) => setAgeRestriction(e.target.value)}
            value={ageRestriction}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="poster">
          <Form.Label>Poster</Form.Label>
          <Form.Control
            type="text"
            placeholder="Bild URL eingeben..."
            onChange={(e) => setPoster(e.target.value)}
            value={poster}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="trailer">
          <Form.Label>Trailer</Form.Label>
          <Form.Control
            type="text"
            placeholder="Youtube-Video Key eingeben..."
            onChange={(e) => setTrailer(e.target.value)}
            value={trailer}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Beschreibung</Form.Label>
          <textarea
            className="form-control"
            id="description"
            rows="4"
            placeholder="Beschreibung eingeben..."
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </Form.Group>
        <Form.Group className="mb-3" controlId="genres">
          <Form.Label>Genres</Form.Label>
          <div className={styles.inputButtonGroup}>
            <Form.Control
              type="text"
              placeholder="Genre eingeben..."
              onChange={(e) => setGenreInput(e.target.value)}
              value={genreInput}
            />
            <Button onClick={addGenreHandler}>Hinzufügen</Button>
          </div>

          <motion.div className={styles.badgeContainer}>
            <AnimatePresence>{genreElements}</AnimatePresence>
          </motion.div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="keywords">
          <Form.Label>Keywords</Form.Label>
          <div className={styles.inputButtonGroup}>
            <Form.Control
              type="text"
              placeholder="Keyword eingeben..."
              onChange={(e) => setKeywordInput(e.target.value)}
              value={keywordInput}
            />
            <Button onClick={addKeywordHandler}>Hinzufügen</Button>
          </div>
          <motion.div className={styles.badgeContainer}>
            <AnimatePresence>{keywordsElements}</AnimatePresence>
          </motion.div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="director">
          <Form.Label>Regie</Form.Label>
          <Form.Control
            type="text"
            placeholder="Regie eingeben..."
            onChange={(e) => setDirector(e.target.value)}
            value={director}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="screenwriter">
          <Form.Label>Drehbuch</Form.Label>
          <Form.Control
            type="text"
            placeholder="Drehbuch eingeben..."
            onChange={(e) => setScreenwriter(e.target.value)}
            value={screenwriter}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="cast">
          <Form.Label>Cast</Form.Label>
          <div className="d-flex gap-2 mb-2">
            <Form.Control
              type="text"
              placeholder="Schauspieler eingeben..."
              onChange={(e) => setCastNameInput(e.target.value)}
              value={castNameInput}
            />
            <Form.Control
              type="text"
              placeholder="Charakter eingeben..."
              onChange={(e) => setCastCharacterInput(e.target.value)}
              value={castCharacterInput}
            />
          </div>
          <div className={styles.inputButtonGroup}>
            <Form.Control
              type="text"
              placeholder="Bild URL eingeben..."
              onChange={(e) => setCastImageInput(e.target.value)}
              value={castImageInput}
            />
            <Button onClick={addCastHandler}>Hinzufügen</Button>
          </div>
          <HorizontalScrollContainer>{castElements}</HorizontalScrollContainer>
        </Form.Group>
        {errorMsg}
        <LoadingButton
          variant="primary"
          type="submit"
          isLoading={props.isLoading}
        >
          {isNew ? "Erstellen" : "Aktualisieren"}
        </LoadingButton>
      </Form>
    </Card>
  );
};

export default MovieForm;
