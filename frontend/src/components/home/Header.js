import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      {/* Bokeh Animation from https://codepen.io/andyfitz/pen/RJwqbZ  */}
      {/* Credits: Andy Fitzsimon */}

      <svg
        className={styles.bokeh}
        viewBox="0 0 10 10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="10%" cy="85%" r="75%" />
        <circle cx="45%" cy="50%" r="15%" />
        <circle cx="85%" cy="35%" r="30%" />
        <circle cx="60%" cy="85%" r="20%" />
        <circle cx="45%" cy="50%" r="30%" />
        <circle cx="35%" cy="25%" r="20%" />
        <circle cx="90%" cy="-25%" r="35%" />
        <circle cx="-15%" cy="30%" r="30%" />
        <circle cx="65%" cy="85%" r="55%" />
        <circle cx="45%" cy="50%" r="20%" />
      </svg>
    </div>
  );
};

export default Header;
