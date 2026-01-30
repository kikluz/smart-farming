# Climate Smart Agriculture - App Tutorial & Improvement Guide

Welcome to the **Climate Smart Agriculture** application! This platform is designed to provide farmers with hyperlocal weather data, AI-driven crop advisories, and tools to manage their farm operations efficiently.

## 🚀 Getting Started

### Prerequisites

- Node.js installed on your system.

### Installation

1. **Clone the repository** (if you prioritize version control).
2. **Install Dependencies**:

    ```bash
    npm install
    ```

3. **Start the Development Server**:

    ```bash
    npm run dev
    ```

4. Open your browser and navigate to the local URL provided (usually `http://localhost:5173` or similar).

---

## 📖 User Tutorial

### 1. Dashboard

The dashboard gives you a quick overview of your farm's status.

- **Top Metrics**: View critical real-time data like Temperature, Humidity, and Wind Speed.
- **Alerts**: Quickly see high-priority weather alerts requiring your attention.

### 2. Weather Monitoring

Navigate to the **Weather** page for detailed insights.

- **Interactive Map**: Click anywhere on the map to "fly" to that location and view specific weather data for that exact point.
- **Forecast**: View the 5-day weather forecast to plan your farming activities (e.g., spraying, harvesting).

### 3. Crop Management 🌱

Track your specific crops in the **Crops** section.

- **Add a Crop**: Use the form to add a new crop. Enter details like "Crop Name" (e.g., Rice), "Variety", "Planting Date", and "Area".
- **Update Stage**: As your crop grows, click **"Update Stage"** on the crop card to change its status from *Seedling* -> *Vegetative* -> *Flowering* -> *Harvest*.
- **Manage**: Delete crops you no longer need tracking for using the trash icon.

### 4. AI Advisories 🧠

Get intelligent recommendations based on weather and crop data.

- **Generate Advisories**: Click the **"Generate New Advisories"** button. The system simulates an AI analysis of current weather conditions and generates specific advice for Rice, Wheat, and Corn.
- **Notifications**: You will receive a toast alert at the bottom of the screen when new advisories arrive.
- **Smart Filtering**: Use the filters to drill down. For example, select **Crop: Rice** and **Severity: High** to see only critical rice alerts.
- **Read/Unread**: New advisories are marked as unread. Click "Mark All as Read" to clear your notification badge.

### 5. Settings ⚙️

Customize the app to fit your needs.

- **Farm Profile**: Save your Farm Name and Total Area.
- **Preferences**: Toggle between Celsius/Fahrenheit, enable/disable notifications, or change weather update frequency.
- **Save**: Remember to click "Save All Settings" to apply your changes.

### 6. Pest & Disease Detection 🔍

Identify potential issues with your crops early.

- **Upload Photo**: Drag and drop or click to upload an image of a crop leaf or stem.
- **AI Analysis**: The system simulates an AI scan to identify diseases (e.g., Rice Blast) or pests with confidence scores.
- **Recommendations**: Get immediate treatment advice and preventative measures based on the diagnosis.

### 7. Community Forum �

Connect with other farmers and experts.

- **Browse Topics**: Filter discussions by category like "Crops & Soil" or "Equipment".
- **Ask Questions**: Create new posts to ask for advice or share your knowledge.
- **Interact**: Like helpful posts and comment on discussions to build a supportive community.

### 8. Global Features 🌐

- **Multi-Language Support**: Use the language switcher (flag icon) in the top-right user menu to switch between **English**, **Spanish**, and **Hindi**.
- **Dark/Light Mode**: Toggle the theme via the user menu to suit your lighting conditions.
- **Responsive Navbar**: A unified menu groups your settings, theme, and profile actions for a cleaner experience on all devices.

---

## �💡 Improvements & Future Roadmap

Here are several ways this application could be expanded and improved:

### Technical Enhancements

- **Real Backend / Database**: Currently, data is stored in the browser state (Redux). Integrating a backend (Node/Express + MongoDB/PostgreSQL) would allow data to persist permanently across different devices.
- **Real Weather API**: Connect to a live weather provider (e.g., OpenWeatherMap, Climacell) instead of using simulated data.
- **PWA Support**: Make the app a Progressive Web App (PWA) so farmers can install it on their phones and use it offline.

### Features

- **Satellite Imagery**: Integrate satellite NDVI data to visualize crop health from space.
- **Market Prices**: Connect to local market APIs to show current selling prices for crops.

### UX/UI

- **Dark Mode Polish**: Enhance the dark mode color palette for better contrast in low-light conditions.
- **Onboarding Tour**: Add a step-by-step walkthrough for first-time users.
