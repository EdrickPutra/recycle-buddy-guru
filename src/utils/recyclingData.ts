
export interface RecyclingItem {
  suggestions: string[];
  howTo: string;
}

export interface RecyclingDatabase {
  [key: string]: RecyclingItem;
}

export const recyclingDatabase: RecyclingDatabase = {
  "water bottle": {
    suggestions: [
      "Cut the bottom off to create a small planter for herbs or succulents",
      "Use as a bird feeder by cutting holes and adding perches",
      "Fill with water and freeze to make an ice pack",
      "Create a self-watering system for plants by poking holes in the cap"
    ],
    howTo: "Clean thoroughly before reusing. For planters, cut the bottle horizontally and use the bottom part."
  },
  "paper": {
    suggestions: [
      "Make homemade recycled paper for crafts",
      "Create paper mache art projects",
      "Shred for packaging material or pet bedding",
      "Compost it to enrich your garden soil"
    ],
    howTo: "For paper mache, tear into strips and mix with a solution of water and glue. For composting, tear into small pieces to speed decomposition."
  },
  "cardboard": {
    suggestions: [
      "Create storage boxes or organizers",
      "Make children's toys like playhouses or cars",
      "Use as garden mulch or weed barrier",
      "Create DIY wall art or photo frames"
    ],
    howTo: "For garden use, remove any tape or labels and lay flat under a layer of soil or mulch."
  },
  "glass jar": {
    suggestions: [
      "Storage containers for pantry items",
      "Make candle holders or vases",
      "Create terrariums for small plants",
      "Use as drinking glasses or for homemade preserves"
    ],
    howTo: "Remove labels by soaking in warm soapy water. For candle holders, decorate with paint, twine, or decoupage."
  },
  "t-shirt": {
    suggestions: [
      "Cut into cleaning rags",
      "Make a reusable shopping bag (no-sew option available)",
      "Create a pillow cover",
      "Make a pet toy by braiding strips"
    ],
    howTo: "For a no-sew bag, cut off the sleeves and collar, then cut fringe at the bottom and tie the strips together."
  },
  "plastic bag": {
    suggestions: [
      "Reuse for trash or pet waste",
      "Crochet into a durable tote bag",
      "Use as padding when shipping packages",
      "Make plastic yarn (plarn) for crafts"
    ],
    howTo: "To make plarn, flatten bags, cut into strips, and loop together to form a continuous strand for crocheting or knitting."
  },
  "aluminum can": {
    suggestions: [
      "Create decorative lanterns",
      "Make wind chimes or garden ornaments",
      "Use as small planters for succulents",
      "Create storage containers for small items"
    ],
    howTo: "Clean thoroughly and remove sharp edges. For planters, punch drainage holes in the bottom."
  },
  "wine bottle": {
    suggestions: [
      "Create decorative vases",
      "Make outdoor torches",
      "Use as rolling pins for baking",
      "Create self-watering planters"
    ],
    howTo: "For torch conversion, wrap cotton around a metal tube, insert into bottle and fill with citronella oil."
  }
};

// Find the closest match in our database
export const findBestMatch = (item: string): [string, number] => {
  let bestMatch = "";
  let highestScore = 0;
  
  const normalizedItem = item.toLowerCase().trim();
  
  if (!normalizedItem) {
    return ["", 0];
  }
  
  for (const key in recyclingDatabase) {
    if (normalizedItem === key) {
      return [key, 1]; // Perfect match
    }
    
    if (normalizedItem.includes(key) || key.includes(normalizedItem)) {
      const score = Math.min(normalizedItem.length, key.length) / Math.max(normalizedItem.length, key.length);
      if (score > highestScore) {
        highestScore = score;
        bestMatch = key;
      }
    }
  }
  
  return [bestMatch, highestScore];
};
