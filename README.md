# Magic Mirror 🪞✨  
<img src="image/magic-mirror.png" alt="Magic Mirror" width="500"/>

## Smart Mirror - The Fairest of Them All! 🎉  
**Magic Mirror** is an interactive, smart mirror that provides real-time data, including weather updates, news headlines, outfit suggestions, and more! Using an ultrasonic sensor, the mirror activates only when a user is detected, enhancing energy efficiency and interactivity.  

### Key Features:  
1. **Time & Date Display**: Shows the current time and date in real-time ⏰  
2. **Weather Information**: Real-time weather updates based on location 🌤️  
3. **News Headlines**: Displays the latest news from various categories 📰  
4. **AI-Powered Outfit Suggestions**: Recommends outfits based on weather, gender, and style preference 👗  
5. **Spotify Integration**: Shows the currently playing song and recently played tracks 🎶  
6. **Customizable Display**: Personalize the mirror with images and preferences 🎨  

### Technology Used:  
- **Next.js** and **React** for frontend development ⚛️  
- **MongoDB** for storing user preferences 📦  
- **Open-Meteo** for weather data 🌍  
- **OpenAI** for generating outfit suggestions 🤖  
- **Spotify API** for music integration 🎧  
- **Raspberry Pi** for hardware setup 🖥️  
- **Ultrasonic Sensor** for user detection 📡  

### How to Run:  
1. Clone the repository to your local machine:  
   ```bash  
   git clone https://git.uwaterloo.ca/c424yang/se101-finalproject-magicmirror.git  
   cd se101-finalproject-magicmirror
2. Install the necessary dependencies:
   ```bash
   npm install
3. Set up environment variables (create a .env file):
   ```bash
   OPENAI_API_KEY=your_openai_api_key
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   MONGODB_URI=your_mongo_connection_string
4. Run the web dashboard locally:
   ```bash
   npm run dev
  (Access the dashboard at http://localhost:3000.)
5. Set up the Raspberry Pi with the ultrasonic sensor and display.






