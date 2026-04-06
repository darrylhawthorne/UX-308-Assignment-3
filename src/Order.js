// src/Order.js
let order = { item: "", size: "", spice: "", upsell: "" };

export function handleInput(sInput) {
  return currentState(sInput);
}

export function clearInput() {
  currentState = welcoming;
  order = { item: "", size: "", spice: "", upsell: "" };
}

function welcoming(sInput) {
  currentState = choosingItem;
  return [
    "Welcome to Fuego's Flame Grill!", 
    "What are you craving? 'Sandwich' or 'Bone-in'?"
  ];
}

function choosingItem(sInput) {
  if (sInput.toLowerCase().includes("sandwich")) {
    order.item = "Chicken Sandwich";
  } else if (sInput.toLowerCase().includes("bone")) {
    order.item = "Bone-in Chicken";
  } else {
    return ["Please choose 'Sandwich' or 'Bone-in'."];
  }
  currentState = choosingSize;
  return [`A ${order.item}. What size? (Regular/Large)`];
}

function choosingSize(sInput) {
  order.size = sInput;
  currentState = choosingSpice;
  return ["How spicy? (Lemon Herb, Medium, or Hot)"];
}

function choosingSpice(sInput) {
  order.spice = sInput;
  currentState = choosingUpsell;
  return ["Add Peri-Peri Fries for $3? (Yes/No)"];
}

function choosingUpsell(sInput) {
  const isWithFries = sInput.toLowerCase().startsWith('y');
  const receipt = `Order confirmed: ${order.size} ${order.item} (${order.spice}) ${isWithFries ? 'with' : 'without'} fries.`;
  clearInput(); 
  return [receipt, "Your meal will be ready soon!", "ORDER_COMPLETE"]; 
}

let currentState = welcoming;