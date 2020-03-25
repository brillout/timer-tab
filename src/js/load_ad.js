import load_ad from '../../tab-utils/load_ad';

export default () => {
  const AD_SLOTS = [
    {
      slotID: 'div-gpt-ad-1583509610935-0',
      slotName: '/21735472908/TIMER-TAB_leaderboard_ATF_desktop',
      slotSize: [728, 90],
    },
    {
      slotID: 'div-gpt-ad-1583509734584-0',
      slotName: '/21735472908/TIMER-TAB_leaderboard_ATF_mobile',
      slotSize: [320, 50],
    },
    {
      slotID: 'div-gpt-ad-1584356029392-0',
      slotName: '/21735472908/TIMER-TAB_leaderboard_BTF_desktop',
      slotSize: [728, 90],
    },
    {
      slotID: 'div-gpt-ad-1584356153147-0',
      slotName: '/21735472908/TIMER-TAB_leaderboard_BTF_mobile',
      slotSize: [320, 50],
    },
  ];

  load_ad(AD_SLOTS);
};

