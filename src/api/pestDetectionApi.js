export const pestDetectionApi = {
  detectPest: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Randomly select a result or base it on file name length for consistency in testing
        const random = Math.random();
        
        let result;
        if (random > 0.7) {
          result = {
            id: Date.now(),
            diseaseName: "Rice Blast",
            confidence: 0.95,
            severity: "High",
            description: "A fungal disease caused by Magnaporthe oryzae. It can affect all above-ground parts of the rice plant.",
            actions: [
              "Apply recommended fungicides (e.g., tricyclazole) immediately.",
              "Ensure proper water management (keep field flooded).",
              "Destroy infected crop residue to prevent spread.",
            ],
            isHealthy: false
          };
        } else if (random > 0.4) {
             result = {
            id: Date.now(),
            diseaseName: "Bacterial Leaf Blight",
            confidence: 0.88,
            severity: "Medium",
            description: "Caused by Xanthomonas oryzae pv. oryzae. Causes wilting of seedlings and yellowing and drying of leaves.",
            actions: [
              "Use resistant varieties.",
              "Avoid excessive nitrogen fertilizer.",
              "Drain the field to reduce humidity.",
            ],
             isHealthy: false
          };
        } else {
             result = {
            id: Date.now(),
            diseaseName: "Healthy Crop",
            confidence: 0.99,
            severity: "None",
            description: "No pests or diseases detected. Your crop looks healthy!",
            actions: [
              "Continue regular monitoring.",
              "Maintain improved crop management practices."
            ],
             isHealthy: true
          };
        }
        
        resolve(result);
      }, 2000); // Simulate 2s network/processing delay
    });
  },
};
