export const EVENT_TEMPLATES: Record<string, string[]> = {
  ROKA: ["Venue", "Photography", "Catering", "Decor", "Cake", "Invitations"],
  ENGAGEMENT: ["Venue", "Photography", "Videography", "Decor", "Catering", "DJ", "Rings/Jewellery"],
  MAIYAN_BRIDE: ["Venue", "Decor", "Mehndi Artist (hands)", "Catering", "Photography"],
  MAIYAN_GROOM: ["Venue", "Decor", "Dhol Player", "Catering", "Photography"],
  MEHNDI: ["Venue", "Mehndi Artist", "Decor", "DJ", "Dhol Player", "Catering", "Photography", "Videography", "Lighting"],
  JAGGO_BRIDE: ["Dhol Player", "Decorated Pot/Lights", "Transport", "Catering", "Photography"],
  JAGGO_GROOM: ["Dhol Player", "Decorated Pot/Lights", "Transport", "Catering", "Photography"],
  CHOORA: ["Venue", "Choora Set", "Kalire", "Photography", "Decor", "Catering"],
  ANAND_KARAJ: [
    "Gurdwara Booking",
    "Reception Hall",
    "Photography",
    "Videography",
    "Drone Coverage",
    "Decor",
    "Flowers",
    "Stage Decor",
    "Entertainment",
    "Dhol Player",
    "DJ",
    "Wedding Cars",
    "Coach Hire",
    "Catering",
    "Desserts",
    "Drinks",
    "Security",
    "Cleaning",
  ],
  RECEPTION: ["Venue", "Decor", "DJ", "Band", "Catering", "Bar/Drinks", "Photography", "Videography", "Cake", "Lighting"],
  CIVIL_CEREMONY: ["Registrar Booking", "Venue", "Photography", "Decor"],
};

export function getTemplateItems(eventType: string): string[] {
  return EVENT_TEMPLATES[eventType] ?? [];
}
