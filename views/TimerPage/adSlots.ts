import { AdSlots } from "../../tab-utils/ads/slots";

export { adSlots };

const adSlots: AdSlots = [
  /*
  {
    slot_id: "1234567",
    slot_name: "ATF",
  },
  {
    slot_id: "12345678",
    slot_name: "BTF",
  },
  */
  /*
  {
    // Ezoic - TT Left-Side ATF - sidebar
    is_ezoic: true,
    slot_id: "ezoic-pub-ad-placeholder-101",
    slot_name: "LEFT_AD_ATF",
  },
  */
  {
    // Ezoic - TT Left-Side Floating - sidebar_floating_1
    is_ezoic: true,
    slot_id: "ezoic-pub-ad-placeholder-104",
    slot_name: "LEFT_AD_BTF",
    is_floating: true,
  },
  {
    // Ezoic - TT BTF - Settings Top - mid_content
    is_ezoic: true,
    slot_id: "ezoic-pub-ad-placeholder-105",
    slot_name: "BTF_2",
  },
];
