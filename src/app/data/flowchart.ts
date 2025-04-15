// data/flowchart.ts

export interface Option {
  text: string;
  next: string;
}

interface BaseNode {
  id: string;
}

export interface QuestionNode extends BaseNode {
  type: 'question';
  text: string;
  options: Option[];
  image?: string;
  imageIsLink?: boolean;
}

export interface ResultNode extends BaseNode {
  type: 'result';
  title: string;
  text: string;
  image?: string;
  imageIsLink?: boolean;
}

export type FlowNode = QuestionNode | ResultNode;

export type Flowchart = Record<string, FlowNode>;

export const flowchart: Flowchart = {
  // Start node
  start: {
    id: 'start',
    type: 'question',
    text: 'Do you think you have mold?',
    options: [
      { text: 'Yes', next: 'color_check' },
      { text: 'No', next: 'prevention' },
      { text: 'Check the database', next: 'NAVIGATE_TO_DB' },
    ],
    image: 'got_mold.png',
  },

  // Prevention result
  prevention: {
    id: 'prevention',
    type: 'result',
    title: 'Prevention Tips',
    text: "Mold can impact your health and can make the environment you live in get worse for everyone involved. To make sure you do not get mold, get a dehumidifier and set it to 50%. Keep windows open and air flowing. Generally, mold grows due to water in the air; by using a dehumidifier, you can remove that water. Also, regular cleaning (especially with vinegar) helps.",
    image: 'prevent_mold.png',
  },

  // Result nodes
  mildew_result: {
    id: 'mildew_result',
    type: 'result',
    title: 'Potential Mildew',
    text: 'Mildew is fungi that looks flat and powdery. Just clean it off and you should be fine; otherwise it can spread and become more problematic.',
    image: 'mildew.jpg',
  },
  black_mold_result: {
    id: 'black_mold_result',
    type: 'result',
    title: 'Potential Black Mold or similar',
    text: 'The most common type is Stachybotrys chartarum (dark green/black) caused by water damage. Use common household cleaners like bleach, hydrogen peroxide, baking soda, or vinegar to clean small areas. For larger ones, consult a professional.',
    image: 'black_mold.jpg',
  },
  aspergillus_result: {
    id: 'aspergillus_result',
    type: 'result',
    title: 'Potential Aspergillus',
    text: 'Powdery mold, often yellow-green or black, growing on various surfaces. Clean smaller areas (non-porous) using bleach (1 cup to 1 gallon of water) or vinegar or 3% hydrogen peroxide in well-ventilated areas. For large or porous areas (drywall, carpet), consult a professional.',
    image: 'aspergillus.jpg',
  },
  penicillium_instructs: {
    id: 'penicillium_instructs',
    type: 'result',
    title: 'Potential penicillium',
    text: 'Often blue-green with a velvety texture; common on water-damaged materials and food. For small non-porous areas, clean with soap and water, then disinfect with bleach (1 cup/gallon) or vinegar/peroxide. For porous materials (drywall, carpet) or large areas, consult a professional. Address the root cause (like leaks), use dehumidifiers and good ventilation.',
    image: 'penicillium.jpg',
  },
  cladosporium_results: {
    id: 'cladosporium_results',
    type: 'result',
    title: 'Potential: Cladosporium',
    text: 'Can appear as dark green, brown, or black patches on soil, decaying plants, wood, wallpaper, or carpet. Improve ventilation, control humidity, and use cleaners designed for mold. For big problems, consult professionals.',
    image: 'cladosporium.jpg',
  },
  fusarium_result: {
    id: 'fusarium_result',
    type: 'result',
    title: 'Potential Fusarium',
    text: 'Often pink, reddish, or white, grows on water-damaged carpets, drywall, and food. Similar cleaning instructions to penicillium. Discard any affected food. For large or porous areas, consult professionals. Always fix the underlying moisture source.',
    image: 'fusarium.jpg',
  },
  mildew_aspergillus_uncertain: {
    id: 'mildew_aspergillus_uncertain',
    type: 'result',
    title: 'Potential: Mildew or Aspergillus (Uncertain)',
    text: 'Bathroom mold is common due to moisture. Clean with bathroom products and then a bleach solution (1 cup/gallon) or vinegar. Keep the bathroom well-ventilated and check for leaks.',
    image: 'mildew.jpg',
  },
  aspergillus_penicillium_instructs: {
    id: 'aspergillus_penicillium_instructs',
    type: 'result',
    title: 'Potential: Aspergillus or Penicillium',
    text: 'Mold behind fridges or under sinks often relates to condensation or leaks. Clean thoroughly, fix leaks, ensure appliances work properly.',
    image: 'aspergillus.jpg',
  },
  black_mold_cladosporium_result: {
    id: 'black_mold_cladosporium_result',
    type: 'result',
    title: 'Potential: Black Mold (Stachybotrys) or Cladosporium',
    text: 'Basements/crawl spaces are prone to dampness. Could be Stachybotrys or Cladosporium. Fix moisture sources, improve ventilation, consider a dehumidifier. For big areas, consult professionals.',
    image: 'black_mold.jpg',
  },
  cladosporium_aspergillus_result: {
    id: 'cladosporium_aspergillus_result',
    type: 'result',
    title: 'Potential: Cladosporium or Aspergillus',
    text: 'Mold in HVAC systems can spread spores. Do NOT run HVAC if you suspect mold. Professional inspection/cleaning highly recommended. Change filters regularly.',
    image: 'cladosporium.jpg',
  },
  fusarium_black_mold_result: {
    id: 'fusarium_black_mold_result',
    type: 'result',
    title: 'Potential: Fusarium or Black Mold (Stachybotrys)',
    text: 'Water-damaged carpet or drywall is prime for molds like Fusarium or Stachybotrys. Wet carpet/drywall often need removal. Address water sources. Professional remediation recommended.',
    image: 'fusarium.jpg',
  },
  penicillium_rhizopus_result: {
    id: 'penicillium_rhizopus_result',
    type: 'result',
    title: 'Potential: Penicillium or Rhizopus',
    text: 'Common food spoilage molds. Discard affected food. Don\'t scrape mold off soft foods. Clean the storage area thoroughly.',
    image: 'rhizopus.jpg',
  },
  unknown_consult: {
    id: 'unknown_consult',
    type: 'result',
    title: 'Identification Unclear / Consult Professional',
    text: "It's difficult to pinpoint the exact type or conditions. For accuracy, especially in larger areas or if health concerns exist, consult a professional.",
    image: 'got_mold.png',
  },

  // Questions
  color_check: {
    id: 'color_check',
    type: 'question',
    text: 'What is the approximate color?',
    options: [
      { text: 'Yellow / Gray', next: 'flat_powdery_check' },
      { text: 'Other (Black, Green, Brown, Pink, etc.)', next: 'slimy_check' },
    ],
    image: '',
  },
  flat_powdery_check: {
    id: 'flat_powdery_check',
    type: 'question',
    text: 'Is it flat, powdery, and relatively easy to wipe away?',
    options: [
      { text: 'Yes', next: 'mildew_result' },
      { text: 'No', next: 'slimy_check' },
    ],
    image: '',
  },
  slimy_check: {
    id: 'slimy_check',
    type: 'question',
    text: 'Is it slimy, wet, dark black, or greenish-black?',
    options: [
      { text: 'Yes', next: 'black_mold_result' },
      { text: 'No', next: 'powdery_yellowgreen_black_check' },
    ],
    image: '',
  },
  powdery_yellowgreen_black_check: {
    id: 'powdery_yellowgreen_black_check',
    type: 'question',
    text: 'Is it powdery, often yellow-green or black?',
    options: [
      { text: 'Yes', next: 'aspergillus_result' },
      { text: 'No', next: 'mc_color_detailed' },
    ],
    image: '',
  },
  mc_color_detailed: {
    id: 'mc_color_detailed',
    type: 'question',
    text: 'Select the best color description:',
    options: [
      { text: 'Green / Blue-Green', next: 'penicillium_instructs' },
      { text: 'Brown / Olive / Dark', next: 'cladosporium_results' },
      { text: 'Pink / White / Reddish', next: 'fusarium_result' },
      { text: 'Other / Unsure', next: 'mc_location' },
    ],
    image: '',
  },
  mc_location: {
    id: 'mc_location',
    type: 'question',
    text: 'Where is the mold located primarily?',
    options: [
      { text: 'Bathroom (Tiles, Shower, Sink area)', next: 'mildew_aspergillus_uncertain' },
      { text: 'Kitchen (Behind fridge, Under sink)', next: 'aspergillus_penicillium_instructs' },
      { text: 'None of the above / Somewhere else', next: 'mc_location_general' },
    ],
    image: '',
  },
  mc_location_general: {
    id: 'mc_location_general',
    type: 'question',
    text: 'Select the general location:',
    options: [
      { text: 'Basement / Crawl space', next: 'black_mold_cladosporium_result' },
      { text: 'HVAC / Air vent', next: 'cladosporium_aspergillus_result' },
      { text: 'Carpet or Drywall (visibly water damaged)', next: 'fusarium_black_mold_result' },
      { text: 'Other Location', next: 'is_it_food_check' },
    ],
    image: '',
  },
  is_it_food_check: {
    id: 'is_it_food_check',
    type: 'question',
    text: 'Is the mold growing on food?',
    options: [
      { text: 'Yes', next: 'penicillium_rhizopus_result' },
      { text: 'No', next: 'unknown_consult' },
    ],
    image: '',
  },
};
