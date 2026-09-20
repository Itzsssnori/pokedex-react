import trainerImage from "../assets/trainer-nori.png";
import boulderBadge from "../assets/boulder.png";
import cascadeBadge from "../assets/cascade.png";
import thunderBadge from "../assets/thunder.png";
import rainbowBadge from "../assets/rainbow.png";
import soulBadge from "../assets/soul.png";
import marshBadge from "../assets/marsh.png";
import volcanoBadge from "../assets/volcano.png";
import earthBadge from "../assets/earth.png";

function TrainerModal({ onClose }) {
  return (
    <div className="trainer-modal">

    <div className="trainer-header">

        <h2>TRAINER CARD</h2>

        <button
            className="trainer-close"
            onClick={onClose}
        >
            CLOSE
        </button>

    </div>
      <div className="trainer-info">
        <div className="trainer-avatar">
          <img src={trainerImage} alt="Trainer" />
        </div>
        <div className="trainer-info-text">
          <h3>NAME: NORIELLE JOHN D. BUHAWE</h3>

          <p className="trainer-class">TRAINER CLASS: SOFTWARE DEVELOPER</p>

          <div className="trainer-divider"></div>

          <p>PROGRAM: COMPUTER SCIENCE</p>

          <p>UNIVERSITY: WESTERN MINDANAO STATE UNIVERSITY</p>

          <div className="trainer-meta">
            <span>ID 202500280</span>
            <span>SINCE 2025</span>
          </div>
        </div>
      </div>

      <div className="trainer-motto">
        <p>"If I lose, I just have to train harder." — Cooltrainer Warren</p>
      </div>

    
      <div className="trainer-badges">

    <h3>BADGES EARNED:</h3>

    <div className="badge-grid">

        <div className="badge">
            <img src={boulderBadge} alt="Boulder Badge" />
            <span>BOULDER</span>
        </div>

        <div className="badge">
            <img src={cascadeBadge} alt="Cascade Badge" />
            <span>CASCADE</span>
        </div>

        <div className="badge">
            <img src={thunderBadge} alt="Thunder Badge" />
            <span>THUNDER</span>
        </div>

        <div className="badge">
            <img src={rainbowBadge} alt="Rainbow Badge" />
            <span>RAINBOW</span>
        </div>

        <div className="badge">
            <img src={soulBadge} alt="Soul Badge" />
            <span>SOUL</span>
        </div>

        <div className="badge">
            <img src={marshBadge} alt="Marsh Badge" />
            <span>MARSH</span>
        </div>

        <div className="badge">
            <img src={volcanoBadge} alt="Volcano Badge" />
            <span>VOLCANO</span>
        </div>

        <div className="badge">
            <img src={earthBadge} alt="Earth Badge" />
            <span>EARTH</span>
        </div>

    </div>

      <div className="trainer-links">
        <button onClick={() => window.open("https://github.com/Itzsssnori", "_blank")}>
          GITHUB
        </button>

        <button onClick={() => window.open("https://www.linkedin.com/in/norielle-john-buhawe-cs/", "_blank")}>
          LINKEDIN
        </button>

        <button onClick={() => (window.location.href = "mailto:buhawenoriellejohnd@gmail.com")}>
          EMAIL
        </button>
      </div>


</div>
           
        
    </div>

    
  );
}

export default TrainerModal;
