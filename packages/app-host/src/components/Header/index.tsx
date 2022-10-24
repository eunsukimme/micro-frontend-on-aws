import { container, wrapper, title, github } from "./index.css";

function Header() {
  return (
    <div className={`${container}`}>
      <div className={`${wrapper}`}>
        <div className={`${title}`}>Eunsu's Store</div>
        <a
          href="https://github.com/eunsukimme/micro-frontend-on-aws"
          target="_blank"
          className={`${github}`}
        >
          Github
        </a>
      </div>
    </div>
  );
}

export default Header;
