export type BrandAddress = {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  postalCode?: string;
};

export type BrandHours = {
  weekdays: string;
  sunday: string;
};

export const brand = {
  name: "Villa Bella",
  legalName: "Villa Bella Floricultura",
  locationLabel: "Araguaína - TO",
  address: {
    street: "Av. Amazonas",
    number: "529",
    neighborhood: "St. Central",
    city: "Araguaína",
    state: "TO",
    postalCode: "77804-010",
  } satisfies BrandAddress,
  hours: {
    weekdays: "Seg - Sáb: 8h às 18h",
    sunday: "Dom: 8h às 12h",
  } satisfies BrandHours,
  delivery: {
    promiseShort: "Entrega em até 3 horas",
    expressEta: "Em até 3 horas",
    sameDayCutoff: "Para pedidos realizados até às 15h, entregamos no mesmo dia!",
  },
  contact: {
    email: "contato@villabella.com.br",
    whatsapp: {
      numberE164: "5563992379935",
      numberDisplay: "+55 63 99237-9935",
      defaultMessage: "Olá! Vim pelo site e gostaria de mais informações.",
    },
  },
  links: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    developer: "https://mtsferreira.dev",
  },
  maps: {
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3922.9086850458287!2d-48.20507908520961!3d-7.186908894819897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92d90c1e4f0c4a6d%3A0x2f5c2e0f7e6e2d0e!2sAv.%20Amazonas%2C%20529%20-%20St.%20Central%2C%20Aragua%C3%ADna%20-%20TO!5e0!3m2!1spt-BR!2sbr!4v1703123456789!5m2!1spt-BR!2sbr",
  },
} as const;

export function getWhatsAppUrl(message?: string) {
  const text = encodeURIComponent(message ?? brand.contact.whatsapp.defaultMessage);
  return `https://wa.me/${brand.contact.whatsapp.numberE164}?text=${text}`;
}

export function getAddressLine() {
  return `${brand.address.street}, ${brand.address.number} - ${brand.address.neighborhood}`;
}
