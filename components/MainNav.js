import { Container, Nav, Navbar, Form, Button } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "../store";
import { addToHistory } from "../lib/UserData";
import NavDropdown from "react-bootstrap/NavDropdown";
import { removeToken, readToken } from "../lib/authenticate";

export default function MainNav() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      q: "",
    },
  });
  const router = useRouter();
  const [searchField, setSearchField] = useState("");

  const [isExpanded, setExpended] = useState(false);

  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  function logout() {
    setExpended(false);
    removeToken();
    router.push("/login");
  }
  async function submitForm(e) {
    e.preventDefault();
    setExpended(false);
    let queryString = `title=true&q=${searchField}`;
    router.push("/artwork?" + queryString);
    setSearchHistory(await addToHistory(`title=true&q=${searchField}`));
  }

  let token = readToken();
  const toggle = () => {
    setExpended((isExpanded) => !isExpanded);
  };
  return (
    <>
      <Navbar
        className="fixed-top navbar-dark bg-dark" bg="light" expand="lg">
        <Container>
          <Navbar.Brand>ABHISHEK KUMAR SINGH</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggle} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link onClick={toggle}>Home</Nav.Link>
              </Link>

              {token && (
                <Link href="/search" passHref legacyBehavior>
                  <Nav.Link onClick={toggle}>Advanced Search</Nav.Link>
                </Link>
              )}
            </Nav>
            {token && (
              <>
                <Form className="d-flex" onSubmit={submitForm}>
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={searchField}
                    onChange={(e) => setSearchField(e.target.value)}
                  />
                  <Button variant="outline-success" type="submit">
                    Search
                  </Button>
                </Form>
              </>
            )}

            {token && (
              <Nav>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
                <NavDropdown title={token.userName} id="basic-nav-dropdown">
                  <Link href="/favourites" passHref legacyBehavior>
                    <NavDropdown.Item onClick={toggle}>
                      Favourites
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/history" passHref legacyBehavior>
                    <NavDropdown.Item onClick={toggle}>
                      Search History
                    </NavDropdown.Item>
                  </Link>
                </NavDropdown>
              </Nav>
            )}

            <Nav>
              {!token && (
                <>
                  <Link href="/register" passHref legacyBehavior>
                    <Nav.Link onClick={toggle}>Register</Nav.Link>
                  </Link>
                  <Link href="/login" passHref legacyBehavior>
                    <Nav.Link onClick={toggle}>Log In</Nav.Link>
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
