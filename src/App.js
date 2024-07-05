import React, { useState, useEffect } from "react";
import SingleColor from "./SingleColor";
import Values from "values.js";

function App() {
  const [color, setColor] = useState("#31256a");
  const [error, setError] = useState(false);
  const [list, setList] = useState(new Values("#31256a").all(10));
  const [darkMode, setDarkMode] = useState(false);

  const generateColors = (value) => {
    try {
      let colors = new Values(value).all(10);
      setList(colors);
      setError(false);
    } catch (error) {
      setError(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateColors(color);
  };

  const handleColorChange = (e) => {
    const value = e.target.value;
    setColor(value);
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      generateColors(value);
    } else {
      setError(true);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <>
      <header className="header">
        <h1>ColorPalette Pro</h1>
        <button
          className="btn"
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>
      <section className="container">
        <h3>Generate Color Shades</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="#31256a"
            className={`${error ? "error" : ""}`}
            aria-label="Color input"
          />
          <input
            type="color"
            value={color}
            onChange={handleColorChange}
            className="color-picker"
            aria-label="Color picker"
          />
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
        {error && (
          <p className="error-message">Please enter a valid color code</p>
        )}
        <p>
          Enter a color code (e.g., #31256a) or choose a color from the picker
          to generate different shades and tints of that color.
        </p>
      </section>
      <section className="colors">
        {list.map((color, index) => {
          return (
            <SingleColor
              key={index}
              {...color}
              index={index}
              hexColor={color.hex}
            />
          );
        })}
      </section>
      <footer className="footer">
        <p>&copy; 2024 ColorPalette Pro. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
