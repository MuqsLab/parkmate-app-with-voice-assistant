import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  AlertTriangle,
  Bell,
  Car,
  ChevronRight,
  Clock,
  Eye,
  Heart,
  MapPin,
  Moon,
  Navigation,
  ShieldCheck,
  Smartphone,
  Star,
  Sun,
  Volume2,
} from 'lucide-react';
import './styles.css';

const parkingAreas = [
  {
    id: 1,
    name: 'Car Park 3 - Library Zone',
    distance: '2 min walk',
    available: 28,
    total: 80,
    status: 'High availability',
    notes: 'Closest to the Library and Agora. Recommended for morning classes and study sessions.',
    safety: 'Well-lit pedestrian path and close to busy campus areas.',
    favourite: true,
  },
  {
    id: 2,
    name: 'Car Park 7 - Sports Centre',
    distance: '5 min walk',
    available: 9,
    total: 65,
    status: 'Limited availability',
    notes: 'Useful for the sports centre, gym, and nearby tutorial rooms.',
    safety: 'Medium walking distance. Use the main footpath at night.',
    favourite: false,
  },
  {
    id: 3,
    name: 'Car Park 1 - Main Entrance',
    distance: '7 min walk',
    available: 0,
    total: 120,
    status: 'Currently full',
    notes: 'This car park is full. ParkMate recommends selecting another option.',
    safety: 'Busy entrance area but may increase traffic stress when full.',
    favourite: true,
  },
  {
    id: 4,
    name: 'Car Park 5 - Science Drive',
    distance: '4 min walk',
    available: 17,
    total: 70,
    status: 'Good availability',
    notes: 'Balanced option for science buildings and central campus access.',
    safety: 'Wide path with clear signage and good lighting.',
    favourite: false,
  },
];

function availabilityLevel(area) {
  const percent = area.available / area.total;
  if (percent === 0) return 'full';
  if (percent < 0.2) return 'low';
  return 'high';
}

function getMelbourneTime() {
  return new Intl.DateTimeFormat('en-AU', {
    timeZone: 'Australia/Melbourne',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date());
}

function App() {
  const [selectedId, setSelectedId] = useState(1);
  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('map');
  const [lastSpoken, setLastSpoken] = useState('Nothing spoken yet.');
  const [melbourneTime, setMelbourneTime] = useState(getMelbourneTime());
  const [voiceSupported] = useState(() => 'speechSynthesis' in window);
  const selected = useMemo(() => parkingAreas.find((area) => area.id === selectedId), [selectedId]);
  const favouriteAreas = parkingAreas.filter((area) => area.favourite);

  useEffect(() => {
    const timer = window.setInterval(() => setMelbourneTime(getMelbourneTime()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const speakParkingInfo = () => {
    const message = `${selected.name}. ${selected.status}. ${selected.available} out of ${selected.total} spaces are estimated to be available. Distance is ${selected.distance}. Safety note: ${selected.safety}. ${selected.notes}`;
    setLastSpoken(message);

    if (!voiceSupported) {
      alert('Speech synthesis is not supported in this browser. Try Chrome, Edge, or Safari.');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = 0.93;
    utterance.pitch = 1;
    utterance.lang = 'en-AU';
    window.speechSynthesis.speak(utterance);
  };

  const speakSafetyMessage = () => {
    const message = `Safety reminder. Park in well-lit areas, avoid using the phone while driving, and only check ParkMate when the car is safely stopped. The current selected car park safety note is: ${selected.safety}`;
    setLastSpoken(message);

    if (!voiceSupported) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = 0.93;
    utterance.lang = 'en-AU';
    window.speechSynthesis.speak(utterance);
  };

  const startNavigation = () => {
    if ('vibrate' in navigator) navigator.vibrate(120);
    alert(`Prototype action: navigation started to ${selected.name}. In the final app this would open Google Maps or Apple Maps.`);
  };

  const selectArea = (areaId) => {
    setSelectedId(areaId);
    setActiveTab('map');
  };

  return (
    <main className={`app ${theme}`}>
      <section className="phone-shell" aria-label="ParkMate mobile prototype">
        <div className="status-bar">
          <span>{melbourneTime}</span>
          <span className="status-icons">5G ▰▰▰ 🔋</span>
        </div>

        <div className="phone-scroll">
          <header className="app-header">
            <div>
              <p className="eyebrow">ParkMate Prototype</p>
              <h1>Voice Parking Assistant</h1>
            </div>
            <button className="icon-button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label="Toggle light and dark mode">
              {theme === 'light' ? <Moon size={21} /> : <Sun size={21} />}
            </button>
          </header>

          <section className="location-card">
            <MapPin size={18} />
            <div>
              <strong>Using current location</strong>
              <span>Near La Trobe University, Bundoora</span>
            </div>
          </section>

          <section className="feature-card">
            <div className="feature-icon"><Volume2 size={30} /></div>
            <div>
              <p className="feature-label">Advanced Feature</p>
              <h2>Text-to-speech parking guidance</h2>
              <p>ParkMate reads availability, distance, and safety information aloud to reduce screen reading while finding parking.</p>
            </div>
          </section>

          {activeTab === 'map' && (
            <>
              <section className="map-preview" aria-label="Prototype campus map">
                <div className="map-road road-one" />
                <div className="map-road road-two" />
                <button className="map-pin p1" onClick={() => selectArea(1)}>P3</button>
                <button className="map-pin p2" onClick={() => selectArea(2)}>P7</button>
                <button className="map-pin p3 full-pin" onClick={() => selectArea(3)}>P1</button>
                <button className="map-pin p4" onClick={() => selectArea(4)}>P5</button>
                <div className="user-dot">You</div>
              </section>

              <section className="list-section" aria-labelledby="parking-list-title">
                <div className="section-title-row">
                  <h2 id="parking-list-title">Nearby La Trobe Parking</h2>
                  <span className="small-badge"><Clock size={13} /> Live</span>
                </div>
                {parkingAreas.map((area) => (
                  <button key={area.id} className={`parking-card ${selectedId === area.id ? 'selected' : ''}`} onClick={() => setSelectedId(area.id)}>
                    <div className="card-topline">
                      <span className="area-name"><MapPin size={17} /> {area.name}</span>
                      <span className={`pill ${availabilityLevel(area)}`}>{area.status}</span>
                    </div>
                    <div className="availability-bar" aria-hidden="true">
                      <span style={{ width: `${Math.max(5, (area.available / area.total) * 100)}%` }} className={availabilityLevel(area)} />
                    </div>
                    <div className="card-meta">
                      <span>{area.distance}</span>
                      <span>{area.available}/{area.total} spaces</span>
                    </div>
                  </button>
                ))}
              </section>

              <section className="details-card" aria-labelledby="details-title">
                <h2 id="details-title">Selected Parking Area</h2>
                <h3>{selected.name}</h3>
                <p>{selected.notes}</p>
                <div className="action-grid">
                  <button className="primary" onClick={speakParkingInfo}><Volume2 size={18} /> Speak Info</button>
                  <button className="secondary" onClick={startNavigation}><Navigation size={18} /> Navigate</button>
                </div>
              </section>
            </>
          )}

          {activeTab === 'favourites' && (
            <section className="tab-page" aria-label="Favourites tab">
              <div className="tab-heading">
                <Star size={22} />
                <div>
                  <h2>Favourite Parking Areas</h2>
                  <p>Save common parking areas for quicker repeat access.</p>
                </div>
              </div>
              {favouriteAreas.map((area) => (
                <button key={area.id} className="favourite-card" onClick={() => selectArea(area.id)}>
                  <div>
                    <strong>{area.name}</strong>
                    <span>{area.status} • {area.distance}</span>
                  </div>
                  <ChevronRight size={20} />
                </button>
              ))}
              <section className="explain-card">
                <Heart size={19} />
                <p><strong>Usability benefit:</strong> favourites reduce the number of taps needed for students who park in the same area each week.</p>
              </section>
            </section>
          )}

          {activeTab === 'safety' && (
            <section className="tab-page" aria-label="Safety tab">
              <div className="tab-heading">
                <ShieldCheck size={22} />
                <div>
                  <h2>Safety & Accessibility</h2>
                  <p>Guidance for safer and more inclusive parking decisions.</p>
                </div>
              </div>
              <section className="safety-list">
                <div><Bell size={18} /><span>Only use ParkMate when safely stopped.</span></div>
                <div><Eye size={18} /><span>High contrast theme and large touch targets support low vision users.</span></div>
                <div><Smartphone size={18} /><span>Voice output reduces the need to read small text while moving.</span></div>
                <div><ShieldCheck size={18} /><span>No voice recording is collected or stored by this prototype.</span></div>
              </section>
              <button className="primary wide" onClick={speakSafetyMessage}><Volume2 size={18} /> Speak Safety Reminder</button>
              <section className="explain-card privacy">
                <ShieldCheck size={19} />
                <p><strong>Privacy note:</strong> this proof-of-concept does not collect voice recordings or personal location history. It only reads text displayed on screen.</p>
              </section>
            </section>
          )}

          {!voiceSupported && (
            <section className="warning-card">
              <AlertTriangle size={20} /> Speech synthesis is unavailable in this browser.
            </section>
          )}

          <div className="scroll-spacer" />
        </div>

        <footer className="bottom-nav" aria-label="Main navigation">
          <button className={activeTab === 'map' ? 'active' : ''} onClick={() => setActiveTab('map')}><MapPin size={18} /> Map</button>
          <button className={activeTab === 'favourites' ? 'active' : ''} onClick={() => setActiveTab('favourites')}><Star size={18} /> Favourites</button>
          <button className={activeTab === 'safety' ? 'active' : ''} onClick={() => setActiveTab('safety')}><ShieldCheck size={18} /> Safety</button>
        </footer>
      </section>

      <aside className="demo-panel">
        <h2>How to Use ParkMate</h2>
        <ol>
          <li>You can check the live Melbourne time at the top of the phone screen</li>
          <li>Choose a nearby La Trobe parking area from the list.</li>
          <li>Review the number of available spaces and walking distance.</li>
          <li>Press <strong>Speak Info</strong> to hear the parking details read aloud.</li>
          <li>Press <strong>Navigate</strong> to begin directions to the selected parking area.</li>
          <li>Use <strong>Favourites</strong> to quickly access saved parking areas.</li>
          <li>Open <strong>Safety</strong> for parking safety reminders.</li>
          <li>Toggle dark mode for better visibility in low-light conditions.</li>
          <li> <strong>Note:</strong> The voice assistant reads important parking information aloud, including
    availability, distance, and a recommendation. This helps users reduce screen
    reading while finding parking.</li>
        </ol>
        <h3>Last spoken message</h3>
        <p className="spoken-text">{lastSpoken}</p>
      </aside>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
