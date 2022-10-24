import { Link } from "react-router-dom";
import { container, wrapper, title, github } from "./index.css";

function Header() {
  return (
    <div className={`${container}`}>
      <div className={`${wrapper}`}>
        <Link to="/" className={`${title}`}>
          <div>Eunsu's Store</div>
        </Link>

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
