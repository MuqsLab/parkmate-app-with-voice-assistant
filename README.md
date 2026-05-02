# ParkMate – Voice Parking Assistant Prototype

ParkMate is a mobile-style parking assistant prototype designed to help students and staff find campus parking more efficiently. This project demonstrates an advanced **Voice Parking Assistant** feature that reads parking information aloud, helping users reduce screen reading while searching for parking.

The prototype was developed as part of a Mobile Application Development assessment and is designed around the ParkMate app concept for La Trobe University parking.

---

## Project Overview

Finding parking on campus can be stressful, especially during peak class times. ParkMate aims to improve this experience by showing nearby parking areas, estimated availability, and guidance options in a clean mobile interface.

This prototype focuses on one advanced feature: **text-to-speech parking guidance**. Users can select a parking area and press **Speak Info** to hear availability, distance, and a short recommendation read aloud.

---

## Key Features

- Voice Parking Assistant using the browser `SpeechSynthesis` API
- Live Melbourne time in the phone-style status bar
- Scrollable mobile phone interface
- Interactive **Map**, **Favourites**, and **Safety** tabs
- Parking availability cards with visual status indicators
- Safety reminder voice output
- Dark mode toggle for accessibility testing
- Privacy notice explaining that no voice recording is collected
- Responsive mobile-style layout suitable for prototype demonstration

---

## Advanced Feature: Voice Parking Assistant

The main advanced feature is the **Voice Parking Assistant**. It converts selected parking information into speech so users can hear key details without needing to read every item on screen.

Example output:

> “Car Park 3 has high availability and is approximately two minutes away.”

This feature improves:

- Accessibility for users with low vision
- Hands-free information access
- Usability while users are walking or preparing to park
- Safer interaction by reducing screen reading

---

## Technology Stack

| Technology | Purpose |
|---|---|
| React | Front-end user interface |
| Vite | Fast local development and build tooling |
| JavaScript | Application logic |
| CSS | Mobile-style layout and theme styling |
| lucide-react | Icons used in the interface |
| Browser SpeechSynthesis API | Text-to-speech voice output |

---

## Installation and Setup

Clone the repository:

```bash
git clone https://github.com/MuqsLab/parkmate-app-with-voice-assistant.git

Open the project folder:

cd parkmate-app-with-voice-assistant

Install dependencies:

npm install

Run the development server:

npm run dev

Open the local URL shown in the terminal, usually:

http://localhost:5173/
How to Use the Prototype
Open the ParkMate prototype in the browser.
Check the live Melbourne time in the phone status bar.
Select a parking area from the list.
Review the availability and walking distance.
Press Speak Info to hear the parking details aloud.
Open the Favourites tab to view saved parking locations.
Open the Safety tab to hear a safety reminder.
Toggle dark mode to test the alternative theme.
Accessibility and Privacy

The prototype includes accessibility-focused features such as dark mode, large touch-friendly buttons, clear availability labels, and voice output. The voice assistant can support users with poor eyesight or users who prefer audio guidance.

The feature does not record, store, or transmit user audio. It only converts on-screen text into spoken output using the browser’s built-in speech synthesis functionality.

Project Purpose

This project demonstrates how a mobile application can be enhanced with a modern feature beyond basic app navigation. It explores technical feasibility, accessibility, usability, and privacy considerations for a voice-enabled mobile parking assistant.

Future Improvements

Possible future enhancements include:

Real-time parking data integration
GPS-based route guidance
Push notifications for parking availability
User account login and saved preferences
Improved native mobile support using React Native
Integration with campus parking APIs if available
Author

Muqtada Al-Abbooda
Bachelor of Information Technology/Software Engineering
La Trobe University
