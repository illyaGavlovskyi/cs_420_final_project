// Level 1 requirement: Generate Grocery List with AI (simulated)
// This file simulates AI behavior using deterministic rules and mock data

import { PantryItem, DietSettings, TimelineSettings, GeneratedMeal, GroceryItem, StoreSuggestion } from '../types';

// Mock recipe database with diet tags, detailed ingredients, and instructions
const RECIPE_DATABASE: Omit<GeneratedMeal, 'id' | 'dayOfWeek'>[] = [
  {
    title: "Vegetable Stir Fry",
    description: "Quick and healthy vegetable stir fry with rice",
    cuisineType: "Asian",
    cookingTime: 25,
    ingredients: [
      {
        name: "bell peppers",
        amount: "2 cups sliced",
        calories: 50,
        micronutrients: {
          protein: 1.5,
          carbs: 12,
          fat: 0.3,
          fiber: 3,
          sodium: 5,
          vitaminC: 190,
          iron: 0.6,
          calcium: 15
        }
      },
      {
        name: "broccoli",
        amount: "2 cups florets",
        calories: 60,
        micronutrients: {
          protein: 4,
          carbs: 12,
          fat: 0.6,
          fiber: 4,
          sodium: 60,
          vitaminC: 160,
          iron: 1.4,
          calcium: 90
        }
      },
      {
        name: "carrots",
        amount: "1 cup sliced",
        calories: 50,
        micronutrients: {
          protein: 1,
          carbs: 12,
          fat: 0.3,
          fiber: 3.5,
          sodium: 85,
          vitaminC: 7,
          iron: 0.4,
          calcium: 40
        }
      },
      {
        name: "soy sauce",
        amount: "3 tbsp",
        calories: 30,
        micronutrients: {
          protein: 3,
          carbs: 3,
          fat: 0,
          fiber: 0,
          sodium: 900,
          vitaminC: 0,
          iron: 0.8,
          calcium: 10
        }
      },
      {
        name: "rice",
        amount: "2 cups cooked",
        calories: 400,
        micronutrients: {
          protein: 8,
          carbs: 88,
          fat: 1,
          fiber: 1.2,
          sodium: 10,
          vitaminC: 0,
          iron: 1.5,
          calcium: 30
        }
      },
      {
        name: "garlic",
        amount: "3 cloves minced",
        calories: 15,
        micronutrients: {
          protein: 0.6,
          carbs: 3,
          fat: 0.05,
          fiber: 0.2,
          sodium: 2,
          vitaminC: 3,
          iron: 0.15,
          calcium: 16
        }
      },
      {
        name: "ginger",
        amount: "1 tbsp minced",
        calories: 5,
        micronutrients: {
          protein: 0.1,
          carbs: 1,
          fat: 0.05,
          fiber: 0.1,
          sodium: 1,
          vitaminC: 0.4,
          iron: 0.04,
          calcium: 1
        }
      }
    ],
    dietTags: ["vegetarian", "vegan"],
    servings: 4,
    totalCalories: 610,
    micronutrients: {
      protein: 15,
      carbs: 125,
      fat: 3,
      fiber: 12,
      sodium: 1200,
      vitaminC: 280,
      iron: 4,
      calcium: 150
    },
    cookingInstructions: [
      "Cook rice according to package directions and set aside",
      "Heat a large wok or skillet over high heat with 1 tbsp oil",
      "Add minced garlic and ginger, stir-fry for 30 seconds until fragrant",
      "Add carrots and stir-fry for 2 minutes",
      "Add bell peppers and broccoli, stir-fry for 3-4 minutes until tender-crisp",
      "Add soy sauce and toss to combine",
      "Serve hot over cooked rice"
    ]
  },
  {
    title: "Grilled Chicken Salad",
    description: "Fresh salad with grilled chicken breast",
    cuisineType: "American",
    cookingTime: 20,
    ingredients: [
      {
        name: "chicken breast",
        amount: "8 oz grilled",
        calories: 280,
        micronutrients: {
          protein: 52,
          carbs: 0,
          fat: 6,
          fiber: 0,
          sodium: 140,
          vitaminC: 0,
          iron: 1.2,
          calcium: 20
        }
      },
      {
        name: "lettuce",
        amount: "4 cups chopped",
        calories: 20,
        micronutrients: {
          protein: 1,
          carbs: 4,
          fat: 0.2,
          fiber: 2,
          sodium: 10,
          vitaminC: 15,
          iron: 0.8,
          calcium: 35
        }
      },
      {
        name: "tomatoes",
        amount: "1 cup diced",
        calories: 30,
        micronutrients: {
          protein: 1.5,
          carbs: 7,
          fat: 0.3,
          fiber: 2,
          sodium: 10,
          vitaminC: 25,
          iron: 0.5,
          calcium: 18
        }
      },
      {
        name: "cucumbers",
        amount: "1 cup sliced",
        calories: 15,
        micronutrients: {
          protein: 0.6,
          carbs: 3.6,
          fat: 0.1,
          fiber: 0.5,
          sodium: 2,
          vitaminC: 3,
          iron: 0.3,
          calcium: 16
        }
      },
      {
        name: "olive oil",
        amount: "2 tbsp",
        calories: 240,
        micronutrients: {
          protein: 0,
          carbs: 0,
          fat: 27,
          fiber: 0,
          sodium: 0,
          vitaminC: 0,
          iron: 0.1,
          calcium: 0
        }
      },
      {
        name: "lemon",
        amount: "2 tbsp juice",
        calories: 5,
        micronutrients: {
          protein: 0.1,
          carbs: 1.8,
          fat: 0,
          fiber: 0.1,
          sodium: 0,
          vitaminC: 12,
          iron: 0.02,
          calcium: 2
        }
      }
    ],
    dietTags: ["low-carb", "gluten-free"],
    servings: 2,
    totalCalories: 590,
    micronutrients: {
      protein: 52,
      carbs: 12,
      fat: 30,
      fiber: 4,
      sodium: 320,
      vitaminC: 45,
      iron: 3,
      calcium: 80
    },
    cookingInstructions: [
      "Season chicken breasts with salt, pepper, and herbs",
      "Preheat grill or grill pan to medium-high heat",
      "Grill chicken for 6-7 minutes per side until internal temperature reaches 165°F",
      "Let chicken rest for 5 minutes, then slice into strips",
      "In a large bowl, combine lettuce, tomatoes, and cucumbers",
      "Whisk together olive oil, lemon juice, salt, and pepper for dressing",
      "Top salad with sliced chicken and drizzle with dressing"
    ]
  },
  {
    title: "Pasta Primavera",
    description: "Pasta with seasonal vegetables",
    cuisineType: "Italian",
    cookingTime: 30,
    ingredients: [
      {
        name: "pasta",
        amount: "12 oz penne",
        calories: 600,
        micronutrients: { protein: 21, carbs: 124, fat: 3.5, fiber: 6, sodium: 10, vitaminC: 0, iron: 4, calcium: 40 }
      },
      {
        name: "zucchini",
        amount: "2 cups sliced",
        calories: 40,
        micronutrients: { protein: 3, carbs: 8, fat: 0.6, fiber: 2.4, sodium: 20, vitaminC: 42, iron: 0.8, calcium: 38 }
      },
      {
        name: "tomatoes",
        amount: "2 cups cherry",
        calories: 50,
        micronutrients: { protein: 2.4, carbs: 11, fat: 0.6, fiber: 3, sodium: 10, vitaminC: 45, iron: 0.6, calcium: 24 }
      },
      {
        name: "garlic",
        amount: "4 cloves minced",
        calories: 20,
        micronutrients: { protein: 0.8, carbs: 4, fat: 0.06, fiber: 0.3, sodium: 2, vitaminC: 4, iron: 0.2, calcium: 22 }
      },
      {
        name: "olive oil",
        amount: "3 tbsp",
        calories: 360,
        micronutrients: { protein: 0, carbs: 0, fat: 40.5, fiber: 0, sodium: 0, vitaminC: 0, iron: 0.2, calcium: 0 }
      },
      {
        name: "parmesan",
        amount: "1/2 cup grated",
        calories: 220,
        micronutrients: { protein: 20, carbs: 4, fat: 14.4, fiber: 0, sodium: 720, vitaminC: 0, iron: 0.5, calcium: 528 }
      }
    ],
    dietTags: ["vegetarian"],
    servings: 4,
    totalCalories: 1290,
    micronutrients: {
      protein: 42,
      carbs: 156,
      fat: 48,
      fiber: 10,
      sodium: 680,
      vitaminC: 65,
      iron: 6,
      calcium: 540
    },
    cookingInstructions: [
      "Bring a large pot of salted water to boil and cook pasta according to package directions",
      "While pasta cooks, heat olive oil in a large skillet over medium heat",
      "Add minced garlic and sauté for 1 minute until fragrant",
      "Add zucchini and cook for 3-4 minutes until tender",
      "Add cherry tomatoes and cook for 2-3 minutes until they start to burst",
      "Drain pasta, reserving 1/2 cup pasta water",
      "Toss pasta with vegetables, adding pasta water as needed for sauce",
      "Top with grated parmesan and serve immediately"
    ]
  },
  {
    title: "Quinoa Buddha Bowl",
    description: "Nutritious bowl with quinoa and roasted vegetables",
    cuisineType: "Mediterranean",
    cookingTime: 40,
    ingredients: [
      {
        name: "quinoa",
        amount: "1 cup cooked",
        calories: 220,
        micronutrients: { protein: 8, carbs: 39, fat: 3.5, fiber: 5, sodium: 13, vitaminC: 0, iron: 2.8, calcium: 31 }
      },
      {
        name: "sweet potato",
        amount: "2 cups cubed",
        calories: 180,
        micronutrients: { protein: 4, carbs: 41, fat: 0.3, fiber: 6.6, sodium: 72, vitaminC: 42, iron: 1.6, calcium: 76 }
      },
      {
        name: "chickpeas",
        amount: "1 cup cooked",
        calories: 270,
        micronutrients: { protein: 14.5, carbs: 45, fat: 4.2, fiber: 12.5, sodium: 11, vitaminC: 2.1, iron: 4.7, calcium: 80 }
      },
      {
        name: "kale",
        amount: "2 cups chopped",
        calories: 35,
        micronutrients: { protein: 2.9, carbs: 6.7, fat: 0.5, fiber: 2.6, sodium: 58, vitaminC: 120, iron: 1.5, calcium: 180 }
      },
      {
        name: "tahini",
        amount: "3 tbsp",
        calories: 270,
        micronutrients: { protein: 7.5, carbs: 9.6, fat: 24, fiber: 4.2, sodium: 115, vitaminC: 0, iron: 4.2, calcium: 192 }
      },
      {
        name: "lemon",
        amount: "2 tbsp juice",
        calories: 5,
        micronutrients: { protein: 0.1, carbs: 1.8, fat: 0, fiber: 0.1, sodium: 0, vitaminC: 12, iron: 0.02, calcium: 2 }
      }
    ],
    dietTags: ["vegetarian", "vegan", "gluten-free"],
    servings: 2,
    totalCalories: 980,
    micronutrients: {
      protein: 28,
      carbs: 145,
      fat: 28,
      fiber: 22,
      sodium: 280,
      vitaminC: 95,
      iron: 10,
      calcium: 380
    },
    cookingInstructions: [
      "Preheat oven to 400°F",
      "Toss sweet potato cubes with olive oil, salt, and pepper",
      "Roast for 25-30 minutes until tender and caramelized",
      "Cook quinoa according to package directions",
      "Massage kale with a bit of olive oil until softened",
      "Make tahini dressing by whisking together tahini, lemon juice, and water until smooth",
      "Divide quinoa between bowls, top with roasted sweet potato, chickpeas, and kale",
      "Drizzle with tahini dressing and serve"
    ]
  },
  {
    title: "Baked Salmon with Asparagus",
    description: "Omega-3 rich salmon with roasted asparagus",
    cuisineType: "American",
    cookingTime: 20,
    ingredients: [
      {
        name: "salmon",
        amount: "12 oz fillet",
        calories: 420,
        micronutrients: { protein: 68, carbs: 0, fat: 25, fiber: 0, sodium: 160, vitaminC: 0, iron: 2, calcium: 40 }
      },
      {
        name: "asparagus",
        amount: "1 lb trimmed",
        calories: 90,
        micronutrients: { protein: 10, carbs: 18, fat: 0.5, fiber: 9, sodium: 12, vitaminC: 80, iron: 9, calcium: 110 }
      },
      {
        name: "lemon",
        amount: "1 whole sliced",
        calories: 15,
        micronutrients: { protein: 0.6, carbs: 5, fat: 0.2, fiber: 1.6, sodium: 1, vitaminC: 53, iron: 0.4, calcium: 15 }
      },
      {
        name: "olive oil",
        amount: "2 tbsp",
        calories: 240,
        micronutrients: { protein: 0, carbs: 0, fat: 27, fiber: 0, sodium: 0, vitaminC: 0, iron: 0.1, calcium: 0 }
      },
      {
        name: "garlic",
        amount: "4 cloves minced",
        calories: 20,
        micronutrients: { protein: 0.8, carbs: 4, fat: 0.06, fiber: 0.3, sodium: 2, vitaminC: 4, iron: 0.2, calcium: 22 }
      }
    ],
    dietTags: ["low-carb", "gluten-free"],
    servings: 2,
    totalCalories: 785,
    micronutrients: {
      protein: 68,
      carbs: 18,
      fat: 48,
      fiber: 8,
      sodium: 420,
      vitaminC: 55,
      iron: 5,
      calcium: 120
    },
    cookingInstructions: [
      "Preheat oven to 425°F and line a baking sheet with parchment paper",
      "Place salmon fillet on one side of the baking sheet",
      "Arrange asparagus on the other side",
      "Drizzle everything with olive oil and sprinkle with minced garlic",
      "Season with salt, pepper, and top salmon with lemon slices",
      "Bake for 12-15 minutes until salmon is cooked through and asparagus is tender",
      "Serve immediately with extra lemon wedges"
    ]
  },
  {
    title: "Lentil Curry",
    description: "Hearty and flavorful lentil curry",
    cuisineType: "Indian",
    cookingTime: 35,
    ingredients: [
      {
        name: "lentils",
        amount: "2 cups cooked",
        calories: 460,
        micronutrients: { protein: 36, carbs: 80, fat: 1.5, fiber: 31, sodium: 8, vitaminC: 3, iron: 13, calcium: 76 }
      },
      {
        name: "coconut milk",
        amount: "1 can (14 oz)",
        calories: 440,
        micronutrients: { protein: 4.6, carbs: 6.4, fat: 48, fiber: 2.2, sodium: 30, vitaminC: 2.2, iron: 7.5, calcium: 38 }
      },
      {
        name: "curry powder",
        amount: "3 tbsp",
        calories: 60,
        micronutrients: { protein: 2.4, carbs: 10.8, fat: 2.7, fiber: 6.9, sodium: 27, vitaminC: 2.4, iron: 4.8, calcium: 162 }
      },
      {
        name: "onions",
        amount: "1 large diced",
        calories: 60,
        micronutrients: { protein: 1.6, carbs: 14, fat: 0.2, fiber: 2.4, sodium: 6, vitaminC: 11, iron: 0.3, calcium: 34 }
      },
      {
        name: "garlic",
        amount: "4 cloves minced",
        calories: 20,
        micronutrients: { protein: 0.8, carbs: 4, fat: 0.06, fiber: 0.3, sodium: 2, vitaminC: 4, iron: 0.2, calcium: 22 }
      },
      {
        name: "ginger",
        amount: "2 tbsp minced",
        calories: 10,
        micronutrients: { protein: 0.2, carbs: 2, fat: 0.1, fiber: 0.2, sodium: 2, vitaminC: 0.8, iron: 0.08, calcium: 2 }
      },
      {
        name: "rice",
        amount: "3 cups cooked",
        calories: 600,
        micronutrients: { protein: 12, carbs: 132, fat: 1.5, fiber: 1.8, sodium: 15, vitaminC: 0, iron: 2.3, calcium: 45 }
      }
    ],
    dietTags: ["vegetarian", "vegan", "gluten-free"],
    servings: 4,
    totalCalories: 1650,
    micronutrients: {
      protein: 48,
      carbs: 265,
      fat: 38,
      fiber: 32,
      sodium: 640,
      vitaminC: 18,
      iron: 16,
      calcium: 240
    },
    cookingInstructions: [
      "Cook rice according to package directions",
      "In a large pot, sauté diced onions in oil until softened",
      "Add minced garlic and ginger, cook for 1 minute",
      "Stir in curry powder and cook for 30 seconds until fragrant",
      "Add cooked lentils and coconut milk, stir to combine",
      "Simmer for 15-20 minutes, stirring occasionally",
      "Season with salt to taste and serve over rice"
    ]
  },
  {
    title: "Turkey Chili",
    description: "Lean turkey chili with beans",
    cuisineType: "American",
    cookingTime: 45,
    ingredients: [
      {
        name: "ground turkey",
        amount: "1.5 lbs",
        calories: 720,
        micronutrients: { protein: 108, carbs: 0, fat: 28, fiber: 0, sodium: 360, vitaminC: 0, iron: 4.8, calcium: 72 }
      },
      {
        name: "kidney beans",
        amount: "2 cans (15 oz)",
        calories: 420,
        micronutrients: { protein: 26, carbs: 78, fat: 1.6, fiber: 26, sodium: 840, vitaminC: 4.2, iron: 8.2, calcium: 120 }
      },
      {
        name: "tomatoes",
        amount: "2 cans (28 oz) diced",
        calories: 180,
        micronutrients: { protein: 9, carbs: 42, fat: 1.8, fiber: 12, sodium: 480, vitaminC: 150, iron: 3.6, calcium: 144 }
      },
      {
        name: "onions",
        amount: "1 large diced",
        calories: 60,
        micronutrients: { protein: 1.6, carbs: 14, fat: 0.2, fiber: 2.4, sodium: 6, vitaminC: 11, iron: 0.3, calcium: 34 }
      },
      {
        name: "chili powder",
        amount: "4 tbsp",
        calories: 80,
        micronutrients: { protein: 3.2, carbs: 14.4, fat: 3.6, fiber: 9.2, sodium: 360, vitaminC: 32, iron: 6.4, calcium: 216 }
      },
      {
        name: "bell peppers",
        amount: "2 cups diced",
        calories: 50,
        micronutrients: { protein: 1.5, carbs: 12, fat: 0.3, fiber: 3, sodium: 5, vitaminC: 190, iron: 0.6, calcium: 15 }
      }
    ],
    dietTags: ["low-carb", "gluten-free"],
    servings: 6,
    totalCalories: 1510,
    micronutrients: {
      protein: 126,
      carbs: 136,
      fat: 28,
      fiber: 38,
      sodium: 1840,
      vitaminC: 185,
      iron: 14,
      calcium: 260
    },
    cookingInstructions: [
      "In a large pot, brown ground turkey over medium-high heat",
      "Add diced onions and bell peppers, cook until softened",
      "Stir in chili powder and cook for 1 minute",
      "Add diced tomatoes and kidney beans (drained and rinsed)",
      "Bring to a boil, then reduce heat and simmer for 30 minutes",
      "Season with salt and pepper to taste",
      "Serve hot with optional toppings like cheese, sour cream, or cilantro"
    ]
  },
  {
    title: "Caprese Sandwich",
    description: "Fresh mozzarella, tomato and basil sandwich",
    cuisineType: "Italian",
    cookingTime: 10,
    ingredients: [
      {
        name: "bread",
        amount: "4 slices ciabatta",
        calories: 320,
        micronutrients: { protein: 11, carbs: 62, fat: 3.2, fiber: 2.8, sodium: 640, vitaminC: 0, iron: 3.6, calcium: 80 }
      },
      {
        name: "mozzarella",
        amount: "8 oz sliced",
        calories: 560,
        micronutrients: { protein: 48, carbs: 4.8, fat: 38.4, fiber: 0, sodium: 960, vitaminC: 0, iron: 0.4, calcium: 1120 }
      },
      {
        name: "tomatoes",
        amount: "2 large sliced",
        calories: 50,
        micronutrients: { protein: 2.5, carbs: 11, fat: 0.5, fiber: 3.2, sodium: 16, vitaminC: 42, iron: 0.8, calcium: 30 }
      },
      {
        name: "basil",
        amount: "1/2 cup fresh",
        calories: 5,
        micronutrients: { protein: 0.6, carbs: 0.5, fat: 0.1, fiber: 0.3, sodium: 0.8, vitaminC: 3.6, iron: 0.6, calcium: 36 }
      },
      {
        name: "balsamic vinegar",
        amount: "2 tbsp",
        calories: 30,
        micronutrients: { protein: 0.1, carbs: 6, fat: 0, fiber: 0, sodium: 6, vitaminC: 0, iron: 0.2, calcium: 6 }
      }
    ],
    dietTags: ["vegetarian"],
    servings: 2,
    totalCalories: 965,
    micronutrients: {
      protein: 52,
      carbs: 78,
      fat: 48,
      fiber: 6,
      sodium: 1280,
      vitaminC: 28,
      iron: 4,
      calcium: 1120
    },
    cookingInstructions: [
      "Lightly toast ciabatta bread slices",
      "Layer mozzarella slices on bottom bread",
      "Top with thick tomato slices",
      "Add fresh basil leaves",
      "Drizzle with balsamic vinegar",
      "Season with salt and black pepper",
      "Top with remaining bread and serve immediately"
    ]
  },
  // Feature 9: Additional recipes for more variety
  {
    title: "Thai Coconut Curry Tofu",
    description: "Creamy Thai curry with crispy tofu and vegetables",
    cuisineType: "Thai",
    cookingTime: 30,
    ingredients: [
      {
        name: "tofu",
        amount: "14 oz firm, cubed",
        calories: 360,
        micronutrients: { protein: 40, carbs: 8, fat: 20, fiber: 4, sodium: 20, vitaminC: 0, iron: 12, calcium: 680 }
      },
      {
        name: "coconut milk",
        amount: "1 can (14 oz)",
        calories: 440,
        micronutrients: { protein: 4.6, carbs: 6.4, fat: 48, fiber: 2.2, sodium: 30, vitaminC: 2.2, iron: 7.5, calcium: 38 }
      },
      {
        name: "red curry paste",
        amount: "3 tbsp",
        calories: 45,
        micronutrients: { protein: 1.2, carbs: 6, fat: 2.1, fiber: 1.5, sodium: 450, vitaminC: 8, iron: 1.2, calcium: 15 }
      },
      {
        name: "bell peppers",
        amount: "2 cups sliced",
        calories: 50,
        micronutrients: { protein: 1.5, carbs: 12, fat: 0.3, fiber: 3, sodium: 5, vitaminC: 190, iron: 0.6, calcium: 15 }
      },
      {
        name: "bamboo shoots",
        amount: "1 cup sliced",
        calories: 40,
        micronutrients: { protein: 3.9, carbs: 7.6, fat: 0.5, fiber: 3.3, sodium: 9, vitaminC: 6, iron: 0.8, calcium: 20 }
      },
      {
        name: "rice",
        amount: "2 cups cooked",
        calories: 400,
        micronutrients: { protein: 8, carbs: 88, fat: 1, fiber: 1.2, sodium: 10, vitaminC: 0, iron: 1.5, calcium: 30 }
      }
    ],
    dietTags: ["vegetarian", "vegan"],
    servings: 3,
    totalCalories: 1335,
    micronutrients: {
      protein: 52,
      carbs: 128,
      fat: 72,
      fiber: 15,
      sodium: 524,
      vitaminC: 206,
      iron: 24,
      calcium: 798
    },
    cookingInstructions: [
      "Press tofu to remove excess water, then cube and pan-fry until golden and crispy",
      "In a large pot, heat a bit of oil and add red curry paste, stirring for 1 minute",
      "Add coconut milk and bring to a gentle simmer",
      "Add sliced bell peppers and bamboo shoots, cook for 5-7 minutes",
      "Add crispy tofu and simmer for 3 more minutes",
      "Cook rice according to package directions",
      "Serve curry over rice, garnished with fresh basil or cilantro"
    ]
  },
  {
    title: "Mediterranean Chickpea Bowl",
    description: "Protein-rich Mediterranean bowl with chickpeas and hummus",
    cuisineType: "Mediterranean",
    cookingTime: 30,
    ingredients: [
      {
        name: "chickpeas",
        amount: "2 cups cooked",
        calories: 540,
        micronutrients: { protein: 29, carbs: 90, fat: 8.4, fiber: 25, sodium: 22, vitaminC: 4.2, iron: 9.4, calcium: 160 }
      },
      {
        name: "cucumbers",
        amount: "2 cups diced",
        calories: 30,
        micronutrients: { protein: 1.2, carbs: 7.2, fat: 0.2, fiber: 1, sodium: 4, vitaminC: 6, iron: 0.6, calcium: 32 }
      },
      {
        name: "tomatoes",
        amount: "2 cups cherry",
        calories: 50,
        micronutrients: { protein: 2.4, carbs: 11, fat: 0.6, fiber: 3, sodium: 10, vitaminC: 45, iron: 0.6, calcium: 24 }
      },
      {
        name: "olives",
        amount: "1/2 cup sliced",
        calories: 60,
        micronutrients: { protein: 0.4, carbs: 3.2, fat: 5.6, fiber: 1.6, sodium: 480, vitaminC: 0.5, iron: 1.7, calcium: 44 }
      },
      {
        name: "feta cheese",
        amount: "4 oz crumbled",
        calories: 300,
        micronutrients: { protein: 16, carbs: 4.8, fat: 24, fiber: 0, sodium: 1260, vitaminC: 0, iron: 0.7, calcium: 560 }
      },
      {
        name: "lemon",
        amount: "3 tbsp juice",
        calories: 8,
        micronutrients: { protein: 0.2, carbs: 2.7, fat: 0, fiber: 0.2, sodium: 0, vitaminC: 18, iron: 0.03, calcium: 3 }
      },
      {
        name: "olive oil",
        amount: "3 tbsp",
        calories: 360,
        micronutrients: { protein: 0, carbs: 0, fat: 40.5, fiber: 0, sodium: 0, vitaminC: 0, iron: 0.2, calcium: 0 }
      }
    ],
    dietTags: ["vegetarian", "gluten-free"],
    servings: 3,
    totalCalories: 1348,
    micronutrients: {
      protein: 49,
      carbs: 119,
      fat: 79,
      fiber: 31,
      sodium: 1776,
      vitaminC: 74,
      iron: 13,
      calcium: 823
    },
    cookingInstructions: [
      "Drain and rinse chickpeas, then pat dry",
      "Toss chickpeas with 1 tbsp olive oil, paprika, and cumin",
      "Roast chickpeas at 400°F for 20-25 minutes until crispy",
      "Dice cucumbers and halve cherry tomatoes",
      "Whisk together remaining olive oil, lemon juice, salt, and oregano for dressing",
      "Combine chickpeas, cucumbers, tomatoes, and olives in a bowl",
      "Top with crumbled feta and drizzle with lemon dressing"
    ]
  },
  {
    title: "Teriyaki Chicken with Broccoli",
    description: "Sweet and savory teriyaki chicken stir-fry",
    cuisineType: "Japanese",
    cookingTime: 25,
    ingredients: [
      {
        name: "chicken breast",
        amount: "1 lb sliced",
        calories: 560,
        micronutrients: { protein: 104, carbs: 0, fat: 12, fiber: 0, sodium: 280, vitaminC: 0, iron: 2.4, calcium: 40 }
      },
      {
        name: "broccoli",
        amount: "3 cups florets",
        calories: 90,
        micronutrients: { protein: 6, carbs: 18, fat: 0.9, fiber: 6, sodium: 90, vitaminC: 240, iron: 2.1, calcium: 135 }
      },
      {
        name: "soy sauce",
        amount: "1/4 cup",
        calories: 40,
        micronutrients: { protein: 4, carbs: 4, fat: 0, fiber: 0, sodium: 1200, vitaminC: 0, iron: 1.1, calcium: 13 }
      },
      {
        name: "honey",
        amount: "2 tbsp",
        calories: 128,
        micronutrients: { protein: 0.1, carbs: 34.8, fat: 0, fiber: 0, sodium: 2, vitaminC: 0.2, iron: 0.2, calcium: 3 }
      },
      {
        name: "ginger",
        amount: "2 tbsp minced",
        calories: 10,
        micronutrients: { protein: 0.2, carbs: 2, fat: 0.1, fiber: 0.2, sodium: 2, vitaminC: 0.8, iron: 0.08, calcium: 2 }
      },
      {
        name: "garlic",
        amount: "3 cloves minced",
        calories: 15,
        micronutrients: { protein: 0.6, carbs: 3, fat: 0.05, fiber: 0.2, sodium: 2, vitaminC: 3, iron: 0.15, calcium: 16 }
      },
      {
        name: "rice",
        amount: "2 cups cooked",
        calories: 400,
        micronutrients: { protein: 8, carbs: 88, fat: 1, fiber: 1.2, sodium: 10, vitaminC: 0, iron: 1.5, calcium: 30 }
      }
    ],
    dietTags: ["low-carb"],
    servings: 3,
    totalCalories: 1243,
    micronutrients: {
      protein: 123,
      carbs: 150,
      fat: 14,
      fiber: 8,
      sodium: 1586,
      vitaminC: 244,
      iron: 7,
      calcium: 239
    },
    cookingInstructions: [
      "Cook rice according to package directions",
      "Mix soy sauce, honey, minced ginger, and garlic in a small bowl",
      "Heat oil in a large skillet or wok over high heat",
      "Add sliced chicken and stir-fry for 5-6 minutes until cooked through",
      "Remove chicken and set aside",
      "Add broccoli to the pan with a splash of water, cover and steam for 3 minutes",
      "Return chicken to pan, add teriyaki sauce, and toss for 2 minutes",
      "Serve over rice"
    ]
  },
  {
    title: "Black Bean Tacos",
    description: "Easy vegetarian tacos with seasoned black beans",
    cuisineType: "Mexican",
    cookingTime: 20,
    ingredients: [
      {
        name: "black beans",
        amount: "2 cans (15 oz) drained",
        calories: 440,
        micronutrients: { protein: 28, carbs: 80, fat: 1.8, fiber: 28, sodium: 880, vitaminC: 0, iron: 8.8, calcium: 120 }
      },
      {
        name: "corn tortillas",
        amount: "12 small",
        calories: 480,
        micronutrients: { protein: 12, carbs: 96, fat: 6, fiber: 12, sodium: 480, vitaminC: 0, iron: 2.4, calcium: 240 }
      },
      {
        name: "bell peppers",
        amount: "2 cups diced",
        calories: 50,
        micronutrients: { protein: 1.5, carbs: 12, fat: 0.3, fiber: 3, sodium: 5, vitaminC: 190, iron: 0.6, calcium: 15 }
      },
      {
        name: "onions",
        amount: "1 large diced",
        calories: 60,
        micronutrients: { protein: 1.6, carbs: 14, fat: 0.2, fiber: 2.4, sodium: 6, vitaminC: 11, iron: 0.3, calcium: 34 }
      },
      {
        name: "avocado",
        amount: "2 medium sliced",
        calories: 480,
        micronutrients: { protein: 6, carbs: 26, fat: 44, fiber: 20, sodium: 20, vitaminC: 30, iron: 1.4, calcium: 30 }
      },
      {
        name: "lime",
        amount: "2 tbsp juice",
        calories: 8,
        micronutrients: { protein: 0.1, carbs: 2.8, fat: 0, fiber: 0.2, sodium: 0, vitaminC: 14, iron: 0.02, calcium: 4 }
      }
    ],
    dietTags: ["vegetarian", "vegan", "gluten-free"],
    servings: 4,
    totalCalories: 1518,
    micronutrients: {
      protein: 49,
      carbs: 231,
      fat: 52,
      fiber: 66,
      sodium: 1391,
      vitaminC: 245,
      iron: 14,
      calcium: 443
    },
    cookingInstructions: [
      "Heat black beans in a pot with cumin, chili powder, and a pinch of salt",
      "Mash some of the beans with a fork for creamier texture",
      "Sauté diced bell peppers and onions until softened",
      "Warm corn tortillas in a dry skillet",
      "Fill tortillas with black beans, sautéed vegetables, and sliced avocado",
      "Squeeze fresh lime juice over tacos",
      "Serve with optional toppings like salsa, cilantro, or hot sauce"
    ]
  },
  {
    title: "Shrimp Scampi with Zoodles",
    description: "Low-carb shrimp scampi with zucchini noodles",
    cuisineType: "Italian",
    cookingTime: 15,
    ingredients: [
      {
        name: "shrimp",
        amount: "1 lb peeled and deveined",
        calories: 480,
        micronutrients: { protein: 92, carbs: 4, fat: 8, fiber: 0, sodium: 840, vitaminC: 8, iron: 4.5, calcium: 120 }
      },
      {
        name: "zucchini",
        amount: "4 large spiralized",
        calories: 80,
        micronutrients: { protein: 6, carbs: 16, fat: 1.2, fiber: 4.8, sodium: 40, vitaminC: 84, iron: 1.6, calcium: 76 }
      },
      {
        name: "garlic",
        amount: "6 cloves minced",
        calories: 30,
        micronutrients: { protein: 1.2, carbs: 6, fat: 0.1, fiber: 0.4, sodium: 3, vitaminC: 6, iron: 0.3, calcium: 32 }
      },
      {
        name: "butter",
        amount: "4 tbsp",
        calories: 400,
        micronutrients: { protein: 0.5, carbs: 0.04, fat: 45.3, fiber: 0, sodium: 360, vitaminC: 0, iron: 0.01, calcium: 12 }
      },
      {
        name: "lemon",
        amount: "1/4 cup juice",
        calories: 13,
        micronutrients: { protein: 0.3, carbs: 4.5, fat: 0, fiber: 0.3, sodium: 0, vitaminC: 30, iron: 0.05, calcium: 5 }
      },
      {
        name: "white wine",
        amount: "1/2 cup",
        calories: 100,
        micronutrients: { protein: 0.1, carbs: 3.2, fat: 0, fiber: 0, sodium: 10, vitaminC: 0, iron: 0.6, calcium: 12 }
      }
    ],
    dietTags: ["low-carb", "gluten-free"],
    servings: 3,
    totalCalories: 1103,
    micronutrients: {
      protein: 100,
      carbs: 34,
      fat: 55,
      fiber: 6,
      sodium: 1253,
      vitaminC: 128,
      iron: 7,
      calcium: 257
    },
    cookingInstructions: [
      "Spiralize zucchini into noodle shapes and pat dry to remove excess moisture",
      "Heat 2 tbsp butter in a large skillet over medium-high heat",
      "Add shrimp and cook for 2 minutes per side until pink, then remove",
      "Add remaining butter and minced garlic, sauté for 1 minute",
      "Add white wine and lemon juice, simmer for 2 minutes",
      "Add zoodles and toss for 2-3 minutes until just tender",
      "Return shrimp to pan, toss everything together, and serve immediately"
    ]
  },
  {
    title: "Cauliflower Fried Rice",
    description: "Low-carb alternative to traditional fried rice",
    cuisineType: "Asian",
    cookingTime: 20,
    ingredients: [
      {
        name: "cauliflower",
        amount: "1 large head riced",
        calories: 100,
        micronutrients: { protein: 7.6, carbs: 20, fat: 1.1, fiber: 10, sodium: 120, vitaminC: 230, iron: 1.7, calcium: 88 }
      },
      {
        name: "eggs",
        amount: "3 large beaten",
        calories: 210,
        micronutrients: { protein: 18, carbs: 1.5, fat: 15, fiber: 0, sodium: 210, vitaminC: 0, iron: 2.7, calcium: 84 }
      },
      {
        name: "carrots",
        amount: "1 cup diced",
        calories: 50,
        micronutrients: { protein: 1, carbs: 12, fat: 0.3, fiber: 3.5, sodium: 85, vitaminC: 7, iron: 0.4, calcium: 40 }
      },
      {
        name: "peas",
        amount: "1 cup frozen",
        calories: 120,
        micronutrients: { protein: 8, carbs: 21, fat: 0.6, fiber: 7, sodium: 240, vitaminC: 60, iron: 2.5, calcium: 43 }
      },
      {
        name: "soy sauce",
        amount: "3 tbsp",
        calories: 30,
        micronutrients: { protein: 3, carbs: 3, fat: 0, fiber: 0, sodium: 900, vitaminC: 0, iron: 0.8, calcium: 10 }
      },
      {
        name: "garlic",
        amount: "3 cloves minced",
        calories: 15,
        micronutrients: { protein: 0.6, carbs: 3, fat: 0.05, fiber: 0.2, sodium: 2, vitaminC: 3, iron: 0.15, calcium: 16 }
      },
      {
        name: "ginger",
        amount: "1 tbsp minced",
        calories: 5,
        micronutrients: { protein: 0.1, carbs: 1, fat: 0.05, fiber: 0.1, sodium: 1, vitaminC: 0.4, iron: 0.04, calcium: 1 }
      }
    ],
    dietTags: ["low-carb", "gluten-free", "vegetarian"],
    servings: 4,
    totalCalories: 530,
    micronutrients: {
      protein: 38,
      carbs: 62,
      fat: 17,
      fiber: 21,
      sodium: 1558,
      vitaminC: 300,
      iron: 8,
      calcium: 282
    },
    cookingInstructions: [
      "Rice cauliflower in a food processor until it resembles rice grains",
      "Heat oil in a large wok or skillet over high heat",
      "Scramble eggs and set aside",
      "Add garlic and ginger to the pan, stir-fry for 30 seconds",
      "Add carrots and peas, stir-fry for 3 minutes",
      "Add riced cauliflower and stir-fry for 5-6 minutes until tender",
      "Stir in scrambled eggs and soy sauce, toss to combine"
    ]
  },
  {
    title: "Spinach and Mushroom Frittata",
    description: "Protein-packed egg dish perfect for any meal",
    cuisineType: "Mediterranean",
    cookingTime: 30,
    ingredients: [
      {
        name: "eggs",
        amount: "8 large beaten",
        calories: 560,
        micronutrients: { protein: 48, carbs: 4, fat: 40, fiber: 0, sodium: 560, vitaminC: 0, iron: 7.2, calcium: 224 }
      },
      {
        name: "spinach",
        amount: "3 cups fresh",
        calories: 21,
        micronutrients: { protein: 2.6, carbs: 3.3, fat: 0.4, fiber: 2.1, sodium: 71, vitaminC: 25, iron: 2.4, calcium: 88 }
      },
      {
        name: "mushrooms",
        amount: "2 cups sliced",
        calories: 40,
        micronutrients: { protein: 5.6, carbs: 5.6, fat: 0.6, fiber: 2, sodium: 10, vitaminC: 4, iron: 1, calcium: 6 }
      },
      {
        name: "onions",
        amount: "1 medium diced",
        calories: 44,
        micronutrients: { protein: 1.2, carbs: 10, fat: 0.1, fiber: 1.8, sodium: 4, vitaminC: 8, iron: 0.2, calcium: 26 }
      },
      {
        name: "feta cheese",
        amount: "4 oz crumbled",
        calories: 300,
        micronutrients: { protein: 16, carbs: 4.8, fat: 24, fiber: 0, sodium: 1260, vitaminC: 0, iron: 0.7, calcium: 560 }
      },
      {
        name: "olive oil",
        amount: "2 tbsp",
        calories: 240,
        micronutrients: { protein: 0, carbs: 0, fat: 27, fiber: 0, sodium: 0, vitaminC: 0, iron: 0.1, calcium: 0 }
      }
    ],
    dietTags: ["vegetarian", "gluten-free", "low-carb"],
    servings: 4,
    totalCalories: 1205,
    micronutrients: {
      protein: 73,
      carbs: 28,
      fat: 92,
      fiber: 6,
      sodium: 1905,
      vitaminC: 37,
      iron: 12,
      calcium: 904
    },
    cookingInstructions: [
      "Preheat oven to 375°F",
      "Heat olive oil in an oven-safe skillet over medium heat",
      "Sauté onions until softened, about 3 minutes",
      "Add mushrooms and cook until they release their moisture, 5 minutes",
      "Add spinach and cook until wilted",
      "Pour beaten eggs over vegetables, sprinkle feta on top",
      "Cook on stovetop for 2-3 minutes until edges start to set",
      "Transfer to oven and bake for 15-20 minutes until center is set",
      "Let cool for 5 minutes, slice and serve"
    ]
  },
  {
    title: "Greek Lemon Chicken Soup",
    description: "Comforting lemon-infused chicken soup with orzo",
    cuisineType: "Greek",
    cookingTime: 35,
    ingredients: [
      {
        name: "chicken breast",
        amount: "12 oz diced",
        calories: 420,
        micronutrients: { protein: 78, carbs: 0, fat: 9, fiber: 0, sodium: 210, vitaminC: 0, iron: 1.8, calcium: 30 }
      },
      {
        name: "orzo pasta",
        amount: "1 cup uncooked",
        calories: 400,
        micronutrients: { protein: 14, carbs: 82, fat: 2.3, fiber: 4, sodium: 7, vitaminC: 0, iron: 2.7, calcium: 27 }
      },
      {
        name: "carrots",
        amount: "2 cups sliced",
        calories: 100,
        micronutrients: { protein: 2, carbs: 24, fat: 0.6, fiber: 7, sodium: 170, vitaminC: 14, iron: 0.8, calcium: 80 }
      },
      {
        name: "celery",
        amount: "1 cup diced",
        calories: 16,
        micronutrients: { protein: 0.7, carbs: 3, fat: 0.2, fiber: 1.6, sodium: 96, vitaminC: 3.5, iron: 0.2, calcium: 48 }
      },
      {
        name: "lemon",
        amount: "1/2 cup juice",
        calories: 25,
        micronutrients: { protein: 0.5, carbs: 9, fat: 0, fiber: 0.5, sodium: 0, vitaminC: 60, iron: 0.1, calcium: 10 }
      },
      {
        name: "eggs",
        amount: "3 large",
        calories: 210,
        micronutrients: { protein: 18, carbs: 1.5, fat: 15, fiber: 0, sodium: 210, vitaminC: 0, iron: 2.7, calcium: 84 }
      }
    ],
    dietTags: [],
    servings: 6,
    totalCalories: 1171,
    micronutrients: {
      protein: 113,
      carbs: 120,
      fat: 27,
      fiber: 13,
      sodium: 693,
      vitaminC: 78,
      iron: 8,
      calcium: 279
    },
    cookingInstructions: [
      "In a large pot, bring 8 cups of chicken broth to a boil",
      "Add diced chicken, carrots, and celery, simmer for 15 minutes",
      "Add orzo pasta and cook for 8-10 minutes until tender",
      "In a bowl, beat eggs with lemon juice",
      "Slowly ladle 1 cup of hot broth into egg mixture while whisking constantly",
      "Slowly pour egg mixture back into soup while stirring",
      "Remove from heat immediately and let stand for 5 minutes",
      "Season with salt, pepper, and fresh dill"
    ]
  }
];

// Check if ingredient is an allergen or conflicts with diet
function isIngredientAllowed(ingredient: string, dietSettings: DietSettings): boolean {
  const allergenCheck = [...dietSettings.allergies, ...dietSettings.customAllergies.toLowerCase().split(',').map(a => a.trim())];

  // Check for allergens
  for (const allergen of allergenCheck) {
    if (allergen && ingredient.toLowerCase().includes(allergen.toLowerCase())) {
      return false;
    }
  }

  return true;
}

// Check if recipe matches diet goals
function recipeMatchesDiet(recipe: Omit<GeneratedMeal, 'id' | 'dayOfWeek'>, dietSettings: DietSettings): boolean {
  const userGoals = [...dietSettings.goals];

  // If user has specific diet goals, recipe must have matching tags
  if (userGoals.length > 0) {
    return userGoals.some(goal => recipe.dietTags.includes(goal));
  }

  return true;
}

// Check if recipe contains allergens
function recipeContainsAllergens(recipe: Omit<GeneratedMeal, 'id' | 'dayOfWeek'>, dietSettings: DietSettings): boolean {
  return !recipe.ingredients.every(ing => isIngredientAllowed(ing.name, dietSettings));
}

// Feature 10: Check if recipe matches advanced filters (cuisine, calories, cooking time)
function recipeMatchesAdvancedFilters(recipe: Omit<GeneratedMeal, 'id' | 'dayOfWeek'>, dietSettings: DietSettings): boolean {
  // Check cuisine preferences
  if (dietSettings.cuisinePreferences && dietSettings.cuisinePreferences.length > 0) {
    const hasCuisineMatch = dietSettings.cuisinePreferences.some(cuisine =>
      recipe.cuisineType?.toLowerCase() === cuisine.toLowerCase()
    );
    if (!hasCuisineMatch) return false;
  }

  // Check max calories per meal
  if (dietSettings.maxCaloriesPerMeal && dietSettings.maxCaloriesPerMeal > 0) {
    const caloriesPerServing = recipe.totalCalories / recipe.servings;
    if (caloriesPerServing > dietSettings.maxCaloriesPerMeal) return false;
  }

  // Check max cooking time
  if (dietSettings.maxCookingTime && dietSettings.maxCookingTime > 0) {
    if (recipe.cookingTime && recipe.cookingTime > dietSettings.maxCookingTime) return false;
  }

  return true;
}

// Main AI simulation function
export function simulateAIGeneration(
  pantryItems: PantryItem[],
  dietSettings: DietSettings,
  timelineSettings: TimelineSettings
): { meals: GeneratedMeal[], groceryList: GroceryItem[], storeSuggestions: StoreSuggestion[], estimatedCost: number, budget: number } {

  // Filter recipes based on diet, allergies, and advanced filters
  const suitableRecipes = RECIPE_DATABASE.filter(recipe =>
    recipeMatchesDiet(recipe, dietSettings) &&
    !recipeContainsAllergens(recipe, dietSettings) &&
    recipeMatchesAdvancedFilters(recipe, dietSettings)
  );

  // Select meals based on cooking frequency
  const numberOfMeals = Math.min(timelineSettings.cookingFrequency, suitableRecipes.length);
  const selectedRecipes = suitableRecipes.slice(0, numberOfMeals);

  // Days of the week for assignment
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // Generate meal objects with IDs and day assignments
  const meals: GeneratedMeal[] = selectedRecipes.map((recipe, index) => ({
    ...recipe,
    id: `meal-${Date.now()}-${index}`,
    dayOfWeek: daysOfWeek[index % 7]
  }));

  // Collect all required ingredients
  const requiredIngredients = new Map<string, { quantity: number, unit: string, category: string }>();

  meals.forEach(meal => {
    meal.ingredients.forEach(ingredient => {
      if (!requiredIngredients.has(ingredient.name)) {
        requiredIngredients.set(ingredient.name, {
          quantity: 1,
          unit: categorizeUnit(ingredient.name),
          category: categorizeIngredient(ingredient.name)
        });
      } else {
        const current = requiredIngredients.get(ingredient.name)!;
        current.quantity += 1;
      }
    });
  });

  // Check what's already in pantry
  const pantryNames = new Set(pantryItems.map(item => item.name.toLowerCase()));

  // Generate grocery list (only items not in pantry)
  const groceryList: GroceryItem[] = [];
  requiredIngredients.forEach((details, ingredientName) => {
    if (!pantryNames.has(ingredientName.toLowerCase())) {
      const pricePerUnit = getPricePerUnit(details.category);
      const totalPrice = pricePerUnit * details.quantity;
      const imageUrl = getIngredientImage(ingredientName);
      const storeUrls = getStoreUrls(ingredientName);

      groceryList.push({
        id: `grocery-${Date.now()}-${ingredientName}`,
        name: ingredientName,
        quantity: details.quantity,
        unit: details.unit,
        category: details.category,
        pricePerUnit: pricePerUnit,
        totalPrice: Math.round(totalPrice * 100) / 100,
        imageUrl: imageUrl,
        storeUrls: storeUrls
      });
    }
  });

  // Calculate estimated cost based on grocery list
  const estimatedCost = calculateEstimatedCost(groceryList);

  // Level 2 requirement: Suggest Cheaper Store Splits (mock data)
  const storeSuggestions: StoreSuggestion[] = generateStoreSuggestions(groceryList);

  return { meals, groceryList, storeSuggestions, estimatedCost, budget: timelineSettings.budget };
}

// Get price per unit based on category
function getPricePerUnit(category: string): number {
  switch (category) {
    case 'Produce':
      return 2.5; // $2.50 per item
    case 'Protein':
      return 8.0; // $8.00 per lb
    case 'Grains':
      return 3.5; // $3.50 per unit
    case 'Dairy':
      return 4.0; // $4.00 per item
    default:
      return 3.0; // $3.00 default
  }
}

// Get ingredient image URL (using placeholder images from picsum.photos)
function getIngredientImage(ingredientName: string): string {
  // Map of ingredient names to image identifiers
  const imageMap: Record<string, string> = {
    // Produce
    'bell peppers': 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=200&h=200&fit=crop',
    'broccoli': 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=200&h=200&fit=crop',
    'carrots': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=200&h=200&fit=crop',
    'lettuce': 'https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?w=200&h=200&fit=crop',
    'tomatoes': 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=200&h=200&fit=crop',
    'cucumbers': 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=200&h=200&fit=crop',
    'zucchini': 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=200&h=200&fit=crop',
    'kale': 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=200&h=200&fit=crop',
    'asparagus': 'https://images.unsplash.com/photo-1565556245936-ce6b565d8abb?w=200&h=200&fit=crop',
    'onions': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200&h=200&fit=crop',
    'garlic': 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=200&h=200&fit=crop',
    'ginger': 'https://images.unsplash.com/photo-1615485207272-d87ba1ba5e03?w=200&h=200&fit=crop',
    'lemon': 'https://images.unsplash.com/photo-1590502593747-42a996133562?w=200&h=200&fit=crop',
    'basil': 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=200&h=200&fit=crop',
    'sweet potato': 'https://images.unsplash.com/photo-1589927986089-35812388d1f8?w=200&h=200&fit=crop',
    'bamboo shoots': 'https://images.unsplash.com/photo-1558030006-450f7c7f8043?w=200&h=200&fit=crop',
    'olives': 'https://images.unsplash.com/photo-1611100135552-6f5b9a7a5c85?w=200&h=200&fit=crop',
    'avocado': 'https://images.unsplash.com/photo-1601039641847-7857b994d704?w=200&h=200&fit=crop',
    'lime': 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=200&h=200&fit=crop',
    'cauliflower': 'https://images.unsplash.com/photo-1568584711743-99a0b71bac14?w=200&h=200&fit=crop',
    'spinach': 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=200&h=200&fit=crop',
    'mushrooms': 'https://images.unsplash.com/photo-1566227937957-e4e5d4d35c0a?w=200&h=200&fit=crop',
    'celery': 'https://images.unsplash.com/photo-1590740409085-91ce0f2e47b2?w=200&h=200&fit=crop',
    'peas': 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=200&h=200&fit=crop',

    // Protein
    'chicken breast': 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=200&h=200&fit=crop',
    'salmon': 'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=200&h=200&fit=crop',
    'ground turkey': 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=200&h=200&fit=crop',
    'chickpeas': 'https://images.unsplash.com/photo-1599909533047-aa8c3a5a8f87?w=200&h=200&fit=crop',
    'lentils': 'https://images.unsplash.com/photo-1583252362930-96f9f2fe4596?w=200&h=200&fit=crop',
    'kidney beans': 'https://images.unsplash.com/photo-1607961692048-504e3ba1ebb4?w=200&h=200&fit=crop',
    'tofu': 'https://images.unsplash.com/photo-1603324778997-49eebdea1e25?w=200&h=200&fit=crop',
    'black beans': 'https://images.unsplash.com/photo-1585583522399-9585a3fea909?w=200&h=200&fit=crop',
    'shrimp': 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=200&h=200&fit=crop',
    'eggs': 'https://images.unsplash.com/photo-1587486937736-e8192d32be9a?w=200&h=200&fit=crop',

    // Grains
    'rice': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop',
    'pasta': 'https://images.unsplash.com/photo-1551462147-37632ce7d6f1?w=200&h=200&fit=crop',
    'quinoa': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop',
    'bread': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop',
    'corn tortillas': 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=200&h=200&fit=crop',
    'orzo pasta': 'https://images.unsplash.com/photo-1551462147-37632ce7d6f1?w=200&h=200&fit=crop',

    // Dairy
    'parmesan': 'https://images.unsplash.com/photo-1589881133595-c94d5a07c097?w=200&h=200&fit=crop',
    'mozzarella': 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=200&h=200&fit=crop',
    'feta cheese': 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=200&h=200&fit=crop',
    'butter': 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=200&h=200&fit=crop',

    // Other
    'olive oil': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&h=200&fit=crop',
    'soy sauce': 'https://images.unsplash.com/photo-1606297829600-850e7722d431?w=200&h=200&fit=crop',
    'coconut milk': 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=200&h=200&fit=crop',
    'curry powder': 'https://images.unsplash.com/photo-1596040033229-a0b3b89f7dc8?w=200&h=200&fit=crop',
    'chili powder': 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=200&h=200&fit=crop',
    'balsamic vinegar': 'https://images.unsplash.com/photo-1596040033229-a0b3b89f7dc8?w=200&h=200&fit=crop',
    'tahini': 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=200&h=200&fit=crop',
    'red curry paste': 'https://images.unsplash.com/photo-1596040033229-a0b3b89f7dc8?w=200&h=200&fit=crop',
    'honey': 'https://images.unsplash.com/photo-1587049352847-e40ba1e98752?w=200&h=200&fit=crop',
    'white wine': 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=200&h=200&fit=crop'
  };

  // Return specific image or a default grocery item image
  return imageMap[ingredientName.toLowerCase()] || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=200&fit=crop';
}

// Generate store URLs for an ingredient
function getStoreUrls(ingredientName: string): Record<string, string> {
  // Encode ingredient name for URL
  const searchTerm = encodeURIComponent(ingredientName);

  return {
    'Walmart': `https://www.walmart.com/search?q=${searchTerm}`,
    'Target': `https://www.target.com/s?searchTerm=${searchTerm}`,
    'Kroger': `https://www.kroger.com/search?query=${searchTerm}`,
    'Whole Foods': `https://www.amazon.com/s?k=${searchTerm}&i=wholefoods`,
    'Trader Joe\'s': `https://www.traderjoes.com/home/search?q=${searchTerm}`,
    'Costco': `https://www.costco.com/CatalogSearch?keyword=${searchTerm}`,
    'Safeway': `https://www.safeway.com/shop/search-results.html?q=${searchTerm}`,
    'Albertsons': `https://www.albertsons.com/shop/search-results.html?q=${searchTerm}`
  };
}

// Calculate estimated cost for grocery list (now uses totalPrice from items)
function calculateEstimatedCost(groceryList: GroceryItem[]): number {
  const totalCost = groceryList.reduce((sum, item) => sum + item.totalPrice, 0);
  return Math.round(totalCost * 100) / 100; // Round to 2 decimal places
}

// Categorize ingredient into grocery category
function categorizeIngredient(ingredient: string): string {
  const produce = ['bell peppers', 'broccoli', 'carrots', 'lettuce', 'tomatoes', 'cucumbers',
                   'zucchini', 'kale', 'asparagus', 'onions', 'garlic', 'ginger', 'lemon',
                   'basil', 'sweet potato', 'bamboo shoots', 'olives', 'avocado', 'lime',
                   'cauliflower', 'spinach', 'mushrooms', 'celery', 'peas'];
  const protein = ['chicken breast', 'salmon', 'ground turkey', 'chickpeas', 'lentils', 'kidney beans',
                   'tofu', 'black beans', 'shrimp', 'eggs'];
  const grains = ['rice', 'pasta', 'quinoa', 'bread', 'corn tortillas', 'orzo pasta'];
  const dairy = ['parmesan', 'mozzarella', 'feta cheese', 'butter'];

  if (produce.some(p => ingredient.toLowerCase().includes(p))) return 'Produce';
  if (protein.some(p => ingredient.toLowerCase().includes(p))) return 'Protein';
  if (grains.some(g => ingredient.toLowerCase().includes(g))) return 'Grains';
  if (dairy.some(d => ingredient.toLowerCase().includes(d))) return 'Dairy';

  return 'Other';
}

// Determine unit for ingredient
function categorizeUnit(ingredient: string): string {
  const byPound = ['chicken breast', 'salmon', 'ground turkey'];
  const byCup = ['rice', 'quinoa', 'lentils'];
  const byPiece = ['bell peppers', 'tomatoes', 'cucumbers', 'lemon'];

  if (byPound.some(p => ingredient.toLowerCase().includes(p))) return 'lb';
  if (byCup.some(c => ingredient.toLowerCase().includes(c))) return 'cup';
  if (byPiece.some(p => ingredient.toLowerCase().includes(p))) return 'piece';

  return 'unit';
}

// Level 2 requirement: Generate cheaper store suggestions (mock data)
function generateStoreSuggestions(groceryList: GroceryItem[]): StoreSuggestion[] {
  const suggestions: StoreSuggestion[] = [];

  // Mock store price logic
  const produceItems = groceryList.filter(item => item.category === 'Produce');
  const proteinItems = groceryList.filter(item => item.category === 'Protein');
  const grainItems = groceryList.filter(item => item.category === 'Grains');

  if (produceItems.length > 0) {
    suggestions.push({
      item: `${produceItems.length} produce items`,
      store: "Farmer's Market",
      estimatedSavings: "$3-5"
    });
  }

  if (proteinItems.length > 0) {
    suggestions.push({
      item: proteinItems[0].name,
      store: "Costco",
      estimatedSavings: "$4-8"
    });
  }

  if (grainItems.length > 0) {
    suggestions.push({
      item: `${grainItems.length} grain items`,
      store: "Trader Joe's",
      estimatedSavings: "$2-4"
    });
  }

  return suggestions;
}
