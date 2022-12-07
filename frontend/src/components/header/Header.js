import logo from "../../images/vector.svg";
import { Route, Link, useHistory } from "react-router-dom";

function Header({ userEmail, onSignOut }) {
  const history = useHistory();

  function signOut() {
    localStorage.removeItem("token");
    onSignOut();
    history.push("/signin");
  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип Место" />

      <Route path="/signin">
        <Link className="header__link-auth" to="/signup">
          Регистрация
        </Link>
      </Route>

      <Route exact path="/">
        <p className="header__user-ident">{userEmail}</p>
        <Link
          className="header__link-auth header__link-auth_getout"
          onClick={signOut}
          to="/signin"
        >
          Выйти
        </Link>
      </Route>

      <Route path="/signup">
        <Link className="header__link-auth" to="/signin">
          Войти
        </Link>
      </Route>
    </header>
  );
}

export default Header;
