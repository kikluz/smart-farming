import { useMutation } from "@tanstack/react-query";

export const useAdvisoryGeneration = () => {
  return useMutation({
    mutationFn: async (data) => {
      // Simulate AI-based advisory generation latency
      return new Promise((resolve) => {
        setTimeout(() => {
          const advisories = generateAdvisories(data);
          resolve({ advisories });
        }, 1500);
      });
    },
    onSuccess: (data) => {
      // In a real app, you might invalidate simulated queries or append to a store
      // queryClient.invalidateQueries({ queryKey: ["advisories"] });
      console.log("Advisories generated:", data.advisories);
    },
  });
};

function generateAdvisories(data) {
  const { cropId, weatherData } = data;
  const advisories = [];
  const temp = weatherData.current.temp;
  const humidity = weatherData.current.humidity;
  const wind = weatherData.current.wind_speed;

  // --- General Rules ---
  // High Temp
  if (temp > 35) {
    advisories.push(createAdvisory(cropId, "irrigation", "high", "Extreme Heat Alert", 
      `Current temperature is ${Math.round(temp)}°C. Heat stress is likely.`,
      [
        "Increase irrigation frequency immediately.",
        "Mulch soil to reduce evaporation.",
        "Avoid applying chemicals during peak heat."
      ]
    ));
  }

  // High Humidity
  if (humidity > 85) {
    advisories.push(createAdvisory(cropId, "pest", "medium", "High Humidity Warning",
      `Humidity is at ${humidity}%. Conditions are favorable for fungal growth.`,
      [
        "Monitor for signs of fungal infection.",
        "Ensure good air circulation between plants.",
        "Apply preventative fungicide if history exists."
      ]
    ));
  }

  // High Wind
  if (wind > 10) { // m/s
    advisories.push(createAdvisory(cropId, "general", "high", "Strong Winds Detected",
      `Wind speeds are reaching ${wind} m/s. Risk of physical crop damage.`,
      [
        "Delay spraying of pesticides/fertilizers.",
        "Secure tall plants or provide windbreaks.",
        "Check for lodging (falling over) after winds subside."
      ]
    ));
  }


  // --- Crop Specific Rules (Hyperlocal "AI" Logic) ---
  if (cropId.toLowerCase() === "rice") {
    if (temp < 20) {
      advisories.push(createAdvisory("Rice", "general", "medium", "Cold Stress Risk",
        "Rice is sensitive to low temperatures. Booting stage may be delayed.",
        ["Maintain higher water depth to buffer cold."]
      ));
    }
    if (humidity > 90 && temp > 28) {
      advisories.push(createAdvisory("Rice", "pest", "high", "Blast Disease Risk",
        "High humidity and warm temps are perfect for Blast disease.",
        ["Scout fields for leaf lesions.", "Apply Tricyclazole if symptoms appear."]
      ));
    }
  }

  else if (cropId.toLowerCase() === "wheat") {
    if (temp > 30) {
      advisories.push(createAdvisory("Wheat", "irrigation", "critical", "Terminal Heat Stress",
        `Wheat grain filling is impacted by temps over 30°C.`,
        ["Light frequent irrigation to cool canopy.", "Harvest early if maturity is reached."]
      ));
    }
  }

  else if (cropId.toLowerCase() === "corn") {
     if (temp > 35 && humidity < 50) {
        advisories.push(createAdvisory("Corn", "irrigation", "high", "Pollination Failure Risk",
         "High heat and low humidity can desiccate silk, preventing pollination.",
         ["Irrigate during evening hours.", "Ensure adequate soil moisture."]
       ));
     }
  }

  return advisories;
}

function createAdvisory(crop, type, severity, title, desc, actions) {
  return {
    id: `adv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    cropId: crop,
    title: title,
    description: desc,
    severity: severity,
    type: type,
    actions: actions,
    validFrom: new Date().toISOString(),
    validTo: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    isRead: false,
    isAiGenerated: true, // Tag for UI
  };
}
