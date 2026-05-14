import { useState } from "react";
import { motion } from "framer-motion";
import {
  Radio,
  Tv,
  Monitor,
  Smartphone,
  Globe2,
  ArrowRight,
  X,
} from "lucide-react";
import "./style.css";

const generations = [
  {
    id: "boomer",
    name: "Boomer",
    years: "1946 – 1964",
    icon: Radio,
    color: "gold",
    text: "Geprägt von Kaltem Krieg, Wiederaufbau und klassischer Verteidigungspolitik.",
  },
  {
    id: "genx",
    name: "Generation X",
    years: "1965 – 1980",
    icon: Tv,
    color: "orange",
    text: "Zwischen Friedensbewegung, Wehrpflicht und dem Ende des Kalten Krieges.",
  },
  {
    id: "millennials",
    name: "Millennials",
    years: "1981 – 1996",
    icon: Monitor,
    color: "purple",
    text: "Aufgewachsen mit Globalisierung, Terrorismus und digitalem Wandel.",
  },
  {
    id: "genz",
    name: "Generation Z",
    years: "1997 – 2012",
    icon: Smartphone,
    color: "blue",
    text: "Geprägt von Pandemie, Klimakrise, Krieg in Europa und Social Media.",
  },
  {
    id: "alpha",
    name: "Generation Alpha",
    years: "ab 2013",
    icon: Globe2,
    color: "green",
    text: "Eine Generation, deren Sicherheitsverständnis erst entsteht.",
  },
];

const questions = {
  genz: [
    {
      question:
        "Deutschland diskutiert eine neue Form der Wehrpflicht. Wie reagierst du?",
      context:
        "Der Krieg in Europa verändert die sicherheitspolitische Debatte.",
      options: [
        {
          text: "Ich unterstütze sie, wenn sie fair organisiert ist.",
          value: "institutional",
        },
        {
          text: "Ich lehne sie grundsätzlich ab.",
          value: "critical",
        },
        {
          text: "Ich bin unsicher und brauche mehr Informationen.",
          value: "reflective",
        },
      ],
    },
    {
      question: "Welche Entwicklung bedroht deine Zukunft aktuell am stärksten?",
      context: "Sicherheit wird heute nicht nur militärisch verstanden.",
      options: [
        {
          text: "Krieg und geopolitische Konflikte",
          value: "military",
        },
        {
          text: "Klimakrise",
          value: "future",
        },
        {
          text: "Wirtschaftliche Unsicherheit",
          value: "social",
        },
        {
          text: "Desinformation & digitale Manipulation",
          value: "digital",
        },
      ],
    },
    {
      question:
        "Sollte Deutschland deutlich mehr Geld für Verteidigung ausgeben?",
      context:
        "Das sogenannte 100-Milliarden-Sondervermögen hat die Debatte verändert.",
      options: [
        {
          text: "Ja, Sicherheit braucht Investitionen.",
          value: "institutional",
        },
        {
          text: "Nur teilweise — soziale Themen sind wichtiger.",
          value: "social",
        },
        {
          text: "Nein, militärische Lösungen schaffen neue Risiken.",
          value: "critical",
        },
      ],
    },
    {
      question: "Wie informierst du dich über internationale Krisen?",
      context: "Information beeinflusst Wahrnehmung und Vertrauen.",
      options: [
        {
          text: "Klassische Medien",
          value: "institutional",
        },
        {
          text: "Social Media",
          value: "digital",
        },
        {
          text: "Mehrere Quellen gleichzeitig",
          value: "reflective",
        },
      ],
    },
    {
      question: "Welche Rolle sollte Deutschland international übernehmen?",
      context: "Die Erwartungen an Deutschland verändern sich.",
      options: [
        {
          text: "Mehr militärische Verantwortung übernehmen",
          value: "military",
        },
        {
          text: "Vor allem diplomatisch handeln",
          value: "reflective",
        },
        {
          text: "Sich stärker auf soziale Stabilität konzentrieren",
          value: "social",
        },
      ],
    },
    {
      question: "Wem vertraust du bei Sicherheitsfragen am meisten?",
      context: "Vertrauen ist zentral für gesellschaftliche Stabilität.",
      options: [
        {
          text: "Wissenschaft",
          value: "reflective",
        },
        {
          text: "Bundesregierung",
          value: "institutional",
        },
        {
          text: "Freund:innen / Community",
          value: "social",
        },
        {
          text: "Unabhängigen digitalen Quellen",
          value: "digital",
        },
      ],
    },
    {
      question: "Würdest du persönlich einen Beitrag zur Verteidigung leisten?",
      context:
        "Die Bereitschaft zur Beteiligung unterscheidet sich stark zwischen Generationen.",
      options: [
        {
          text: "Ja",
          value: "institutional",
        },
        {
          text: "Nur zivil oder humanitär",
          value: "social",
        },
        {
          text: "Eher nicht",
          value: "critical",
        },
      ],
    },
  ],
};

const resultProfiles = {
  institutional: {
    title: "Institutionelles Sicherheitsprofil",
    text: "Du verbindest Sicherheit stark mit staatlicher Handlungsfähigkeit, Verteidigung und funktionierenden Institutionen. Für dich ist wichtig, dass der Staat Krisen aktiv vorbereitet und Schutz organisieren kann.",
  },
  critical: {
    title: "Kritisches Sicherheitsprofil",
    text: "Du siehst militärische Lösungen eher skeptisch. Für dich bedeutet Sicherheit nicht automatisch Aufrüstung, sondern auch gesellschaftliche Verantwortung, Freiheit und die Frage, wer von politischen Entscheidungen betroffen ist.",
  },
  reflective: {
    title: "Reflektiertes Sicherheitsprofil",
    text: "Du wägest verschiedene Perspektiven ab. Für dich ist Sicherheit ein komplexes Thema, das Wissen, Vertrauen, Diplomatie und demokratische Diskussion braucht.",
  },
  military: {
    title: "Strategisches Sicherheitsprofil",
    text: "Du nimmst militärische Bedrohungen deutlich wahr. Für dich spielen Verteidigungsfähigkeit, geopolitische Lage und Schutz vor äußeren Risiken eine wichtige Rolle.",
  },
  future: {
    title: "Zukunftsorientiertes Sicherheitsprofil",
    text: "Du denkst Sicherheit stark über Zukunftsrisiken. Klimakrise, Lebensbedingungen und langfristige Stabilität sind für dich genauso sicherheitsrelevant wie klassische Verteidigung.",
  },
  social: {
    title: "Soziales Sicherheitsprofil",
    text: "Du verbindest Sicherheit mit sozialer Stabilität, Zusammenhalt und fairen Lebensbedingungen. Für dich ist eine Gesellschaft dann sicher, wenn Menschen nicht allein gelassen werden.",
  },
  digital: {
    title: "Digitales Sicherheitsprofil",
    text: "Du erkennst digitale Räume als sicherheitspolitischen Faktor. Desinformation, Plattformen, Medienkompetenz und digitale Manipulation prägen für dich moderne Sicherheit.",
  },
};

export default function App() {
  const [selectedGeneration, setSelectedGeneration] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const selectedData = generations.find(
    (generation) => generation.id === selectedGeneration
  );

  const activeQuestions = questions[selectedGeneration] || [];
  const isGenZ = selectedGeneration === "genz";

  const isFinished =
    gameStarted &&
    activeQuestions.length > 0 &&
    currentQuestion >= activeQuestions.length;

  const resultCounts = answers.reduce((counts, answer) => {
    counts[answer] = (counts[answer] || 0) + 1;
    return counts;
  }, {});

  const topResult =
    Object.entries(resultCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ||
    "reflective";

  const result = resultProfiles[topResult];

  function handleGenerationClick(id) {
    setSelectedGeneration(id);
    setCurrentQuestion(0);
    setAnswers([]);

    if (id === "genz") {
      setGameStarted(true);
    } else {
      setGameStarted(false);
    }
  }

  function handleAnswer(value) {
    setAnswers([...answers, value]);
    setCurrentQuestion(currentQuestion + 1);
  }

  function closeGame() {
    setSelectedGeneration(null);
    setGameStarted(false);
    setCurrentQuestion(0);
    setAnswers([]);
  }

  if (gameStarted && isGenZ && !isFinished) {
    const question = activeQuestions[currentQuestion];

    return (
      <main className="game-screen">
        <button className="close-button" onClick={closeGame}>
          <X size={22} />
        </button>

        <div className="game-progress">
          Frage {currentQuestion + 1} / {activeQuestions.length}
        </div>

        <div className="game-progress-bar">
          <div
            className="game-progress-fill"
            style={{
              width: `${
                ((currentQuestion + 1) / activeQuestions.length) * 100
              }%`,
            }}
          />
        </div>

        <motion.section
          key={currentQuestion}
          className="question-stage"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="game-context">{question.context}</p>

          <h1 className="game-question">{question.question}</h1>

          <div className="answer-list">
            {question.options.map((option) => (
              <button
                key={option.text}
                className="answer-button"
                onClick={() => handleAnswer(option.value)}
              >
                {option.text}
              </button>
            ))}
          </div>
        </motion.section>
      </main>
    );
  }

  if (isFinished) {
    return (
      <main className="game-screen result-screen">
        <button className="close-button" onClick={closeGame}>
          <X size={22} />
        </button>

        <motion.section
          className="question-stage"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="game-context">Dein Ergebnis</p>

          <h1 className="game-question">{result.title}</h1>

          <p className="game-result-text">{result.text}</p>

          <div className="result-tags">
            {answers.map((answer, index) => (
              <span key={`${answer}-${index}`}>{answer}</span>
            ))}
          </div>

          <button className="answer-button primary" onClick={closeGame}>
            Zurück zur Generationenauswahl
          </button>
        </motion.section>
      </main>
    );
  }

  return (
    <main className="app">
      <nav className="nav">
        <div className="logo">Defense als Generationenfrage</div>

        <div className="nav-links">
          <a>Über das Projekt</a>
          <a>Methodik</a>
          <a>Daten & Quellen</a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-text">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Eine interaktive Studie
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Wie Generationen Sicherheit erleben.
          </motion.h1>

          <p className="intro">
            Sicherheit ist nicht für alle das Gleiche. Unsere Erfahrungen prägen,
            was wir für bedrohlich halten, welchen Institutionen wir vertrauen
            und welche politischen Lösungen wir unterstützen.
          </p>

          <p className="intro second">
            Wähle eine Generation und entdecke, wie sich die Sicht auf
            Verteidigung, Frieden und Sicherheit verändert.
          </p>
        </div>

        <div className="hero-visual">
          <div className="event event-1">
            1979
            <br />
            NATO-Doppelbeschluss
          </div>
          <div className="event event-2">
            2001
            <br />
            9/11
          </div>
          <div className="event event-3">
            2008
            <br />
            Finanzkrise
          </div>
          <div className="event event-4">
            2020
            <br />
            Corona-Pandemie
          </div>
          <div className="event event-5">
            2022
            <br />
            Ukraine-Krieg
          </div>

          <div className="particle-field">
            {Array.from({ length: 180 }).map((_, index) => (
              <span key={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="generation-section">
        <p className="section-label">Wähle eine Generation</p>

        <div className="generation-grid">
          {generations.map((generation) => {
            const Icon = generation.icon;

            return (
              <motion.button
                key={generation.id}
                className={`generation-card ${generation.color}`}
                onClick={() => handleGenerationClick(generation.id)}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="icon-circle">
                  <Icon size={44} strokeWidth={1.5} />
                </div>

                <h2>{generation.name}</h2>
                <p className="years">{generation.years}</p>
                <p className="card-text">{generation.text}</p>

                <div className="arrow">
                  <ArrowRight size={22} />
                </div>
              </motion.button>
            );
          })}
        </div>

        {selectedGeneration && !isGenZ && (
          <div className="selected-box">
            Diese Generation wird später ergänzt. Aktuell ist die Simulation für{" "}
            <strong>Generation Z</strong> vorbereitet.
          </div>
        )}
      </section>
    </main>
  );
}