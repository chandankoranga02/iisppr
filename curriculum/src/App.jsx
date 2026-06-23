import './App.css';

const modules = [
  {
    id: "01",
    title: "Foundations of Critical Thinking",
    description: "Master the art of structured reasoning, logical analysis, and evidence-based decision making.",
    tags: ["Logic & Fallacies", "Mental Models", "Bayesian Thinking"],
    imageUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=500&q=80", // Placeholder: Change to your own image path
    colorClass: "orange"
  },
  {
    id: "02",
    title: "Data Literacy & Interpretation",
    description: "Understand data at a deep level — spot trends, detect biases, and draw accurate conclusions.",
    tags: ["Statistics Basics", "Visual Data", "Bias Detection"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80", 
    colorClass: "yellow"
  },
  {
    id: "03",
    title: "Global Trends & Local Impact",
    description: "Connect macro-level global trends to micro-level decisions affecting your daily life and career.",
    tags: ["Economics", "Technology Trends", "Policy Analysis"],
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80",
    colorClass: "cyan"
  },
  {
    id: "04",
    title: "Problem Solving Frameworks",
    description: "Apply industry-tested frameworks like First Principles, MECE, and Design Thinking.",
    tags: ["First Principles", "MECE", "Design Thinking"],
    imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=500&q=80",
    colorClass: "purple"
  },
  {
    id: "05",
    title: "Communication & Storytelling",
    description: "Turn complex insights into compelling narratives that influence and inspire action.",
    tags: ["Data Storytelling", "Presentation Skills", "Executive Communication"],
    imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=500&q=80",
    colorClass: "orange-light"
  },
  {
    id: "06",
    title: "Capstone & Real-World Project",
    description: "Apply everything to a real-world problem — research, analyze, and present your findings.",
    tags: ["Industry Project", "Peer Review", "Expert Feedback"],
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=500&q=80",
    colorClass: "yellow-light"
  }
];

function App() {
  return (
    <div className="curriculum-container">
      <header className="curriculum-header">
        <span className="badge">THE CURRICULUM</span>
        <h1>6 Weeks. <span className="highlight">Life-Changing</span> Skills.</h1>
        <p>Every module is designed to challenge you, build on the last, and leave you with a tangible, portfolio-ready skill.</p>
      </header>

      <div className="modules-grid">
        {modules.map((mod) => (
          <div className="flip-card" key={mod.id}>
            <div className="flip-card-inner">
              {/* Front Side: Displays the Image */}
              <div className="flip-card-front">
                <img src={mod.imageUrl} alt={mod.title} className="card-image" />
                <div className="front-overlay">
                  <span className={`module-label ${mod.colorClass}`}>MODULE {mod.id}</span>
                  <h3>{mod.title}</h3>
                </div>
              </div>

              {/* Back Side: Displays the Text */}
              <div className="flip-card-back">
                <span className={`module-label ${mod.colorClass}`}>MODULE {mod.id}</span>
                <h3 className="module-title">{mod.title}</h3>
                <p className="module-description">{mod.description}</p>
                <div className="tags-container">
                  {mod.tags.map((tag, idx) => (
                    <span key={idx} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;