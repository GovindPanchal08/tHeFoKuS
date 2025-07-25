export const products = [
  {
    name: "Strawberry Watermelon",
    desc: "No Added Sugar • Made with Coconut Water",
    details:
      "A refreshing blend of ripe strawberries and juicy watermelon, crafted with hydrating coconut water. Perfect for a post-workout boost or a sunny afternoon chill.",
    image: "Bottles/bottle!.webp",
    gradient: "linear-gradient(135deg, #F33931, #FF9068)",
    color: "#FF9068",
    classname1:
      "absolute lg:top-1/4 lg:left-[57rem] md:top-1/4 md:left-[33rem]  -z-0",
    classname2:
      "absolute lg:top-1/4 z-20 lg:left-[59rem] md:top-1/4  md:left-[35rem]  ",
  },
  {
    name: "Mango Pineapple",
    desc: "100% Organic • Summer Fresh",
    details:
      "Tropical delight in a bottle – sun-ripened mangoes fused with exotic passion fruit. Packed with vitamin C and the real taste of summer in every sip.",
    image: "Bottles/bottle2.webp",
    color: "#FFA500",
    gradient: "linear-gradient(135deg, #FFD700, #FFA500)",
    classname1:
      "absolute lg:top-1/4  lg:left-[32%] md:top-1/4  md:left-[18rem] -z-0",
    classname2:
      "absolute lg:top-1/4 z-20 lg:left-[34rem] md:top-1/4  md:left-[20rem] ",
  },
  {
    name: "  Kiwi Lamonade",
    desc: "Zero Preservatives • Chilled",
    details:
      "Cool down instantly with our zesty lemonade infused with fresh garden mint. Clean, crisp, and made without any preservatives — just real refreshment.",
    image: "Bottles/bottle3.webp",
    color: "#56CC9D",
    gradient: "linear-gradient(135deg, #D1F7C4, #56CC9D)",
    classname1:
      "absolute lg:top-1/4 lg:left-[14rem] md:top-1/4 md:left-[7rem] -z-0 ",
    classname2:
      "absolute lg:top-1/4 z-20 lg:left-[16rem] md:top-1/4 z-20 md:left-[8rem] ",
  },
];

export const flavors = {
  mango: {
    name: "Mango Pineapple",
    color: "from-yellow-400 via-yellow-400 to-yelllow-500",
    accent: "bg-[#FFDD40]",
    textColor: "text-orange-800",
    image: "🥭",
    img: "Bottles/bottle2.webp",
  },
  kiwi: {
    name: "Kiwi Lemon",
    color: "from-green-400 via-lime-400 to-green-500",
    accent: "bg-[#7CD038]",
    textColor: "text-green-800",
    image: "🥝",
    img: "Bottles/bottle3.webp",
  },
  strawberry: {
    name: "Strawberry Watermelon",
    color: "from-red-400 via-red-400 to-red-500",
    accent: "bg-[#F54E46]",
    textColor: "text-pink-800",
    image: "🍓",
    img: "Bottles/bottle!.webp",
  },
};
