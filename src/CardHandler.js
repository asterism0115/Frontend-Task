import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import "./CardHandler.css";

const API_URL = "https://deckofcardsapi.com/api/deck/new/shuffle/";

const CardHandler = (params) => {
  const [started, setStarted] = useState(false);
  const [cards, setCards] = useState([]);
  const [drawnCards, setDrawnCards] = useState([]);
  const [drawnCard, setDrawnCard] = useState({});
  const [alertText, setAlertText] = useState("");
  const [valueMatches, setValueMatches] = useState(0);
  const [suitMatches, setSuitMatches] = useState(0);

  async function fetchData() {
    const data = await axios.get(API_URL).then(({ data }) => data);

    const total_cards = await axios
      .get(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=52`)
      .then((e) => e.data.cards);

    setCards(total_cards);
    setStarted(true);
  }

  useEffect(() => {
    showAlertText();
  }, [drawnCard]);

  const drawNewCard = () => {
    if (started) {
      setDrawnCard(cards[cards.length - 1]);
      setDrawnCards([...drawnCards, drawnCard]);
      setCards([...cards.slice(0, -1)]);
      setAlertText("");
    } else {
      fetchData();
    }
  };

  const showAlertText = () => {
    if (cards.length > 0) {
      if (drawnCard.value === cards[cards.length - 1].value) {
        setAlertText("SNAP VALUE!");
        setValueMatches(valueMatches + 1);
      }
      if (drawnCard.suit === cards[cards.length - 1].suit) {
        setAlertText("SNAP SUIT!");
        setSuitMatches(suitMatches + 1);
      }
    }
  };

  const buttonText = () => {
    if (cards.length === 0) return "Draw Card";
    else if (cards.length > 0) return `${cards.length} cards left!`;
  };

  return (
    <div className="CardHandler">
      <h1 className="CardHandler-title">Card handler</h1>
      <h2 className="CardHandler-subtitle">{alertText}</h2>

      <div className="CardHandler-deck">
        <div className="BordCard" style={{ left: "50px" }}>
          <Card src={drawnCard.image} play={true} />
        </div>
        <div className="BordCard" style={{ right: "50px" }}>
          {cards[0] && (
            <Card src={cards[cards.length - 1].image} play={false} />
          )}
        </div>
      </div>

      {(!started || (started && cards.length > 0)) && (
        <button className="CardHandler-btn" onClick={drawNewCard}>
          {buttonText()}
        </button>
      )}

      {cards.length === 0 && drawnCards.length !== 0 && (
        <div>
          <h2 className="CardHandler-subtitle">
            VALUE MATCHES: {valueMatches}
          </h2>
          <h2 className="CardHandler-subtitle">SUIT MATCHES: {suitMatches}</h2>
        </div>
      )}
    </div>
  );
};

export default CardHandler;
