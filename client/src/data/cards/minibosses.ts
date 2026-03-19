import type { MinibossCard } from '../types';

export const MINIBOSSES: MinibossCard[] = [
  // Level 1 Minibosses
  { id: 'mb_skeleton_warrior', name: 'Skeleton Warrior', level: 1, damage: 1, ability: null, promotedForm: 'mb_skeleton_lord', flavorText: 'Bone to pick.', expansion: 'minibosses', quantity: 2 },
  { id: 'mb_vampire_spawn', name: 'Vampire Spawn', level: 1, damage: 1, ability: null, promotedForm: 'mb_vampire_elder', flavorText: 'Young blood.', expansion: 'minibosses', quantity: 2 },
  { id: 'mb_imp', name: 'Imp', level: 1, damage: 1, ability: null, promotedForm: 'mb_demon_imp', flavorText: 'Devilish supervisor.', expansion: 'minibosses', quantity: 2 },
  { id: 'mb_dark_elf_scout', name: 'Dark Elf Scout', level: 1, damage: 1, ability: null, promotedForm: 'mb_dark_elf_master', flavorText: 'Silent death.', expansion: 'minibosses', quantity: 2 },
  { id: 'mb_cultist', name: 'Cultist', level: 1, damage: 1, ability: null, promotedForm: 'mb_high_cultist', flavorText: 'Ia! Ia!', expansion: 'minibosses', quantity: 2 },
  { id: 'mb_apprentice_witch', name: 'Apprentice Witch', level: 1, damage: 1, ability: null, promotedForm: 'mb_witch_coven', flavorText: 'Learning the dark arts.', expansion: 'minibosses', quantity: 2 },
  { id: 'mb_gargoyle', name: 'Gargoyle', level: 1, damage: 2, ability: null, promotedForm: 'mb_gargoyle_guardian', flavorText: 'Stone cold guard.', expansion: 'minibosses', quantity: 2 },
  { id: 'mb_shadow', name: 'Shadow', level: 1, damage: 1, ability: null, promotedForm: 'mb_shadow_lord', flavorText: 'In the shadows.', expansion: 'minibosses', quantity: 2 },
  { id: 'mb_minotaur', name: 'Minotaur', level: 1, damage: 2, ability: null, promotedForm: 'mb_minotaur_champion', flavorText: 'Lost in the maze.', expansion: 'minibosses', quantity: 2 },
  { id: 'mb_spectre', name: 'Spectre', level: 1, damage: 1, ability: null, promotedForm: 'mb_spectre_king', flavorText: 'Haunting presence.', expansion: 'minibosses', quantity: 2 },
  { id: 'mb_basilisk', name: 'Basilisk', level: 1, damage: 2, ability: null, promotedForm: 'mb_basilisk_king', flavorText: "Don't look!", expansion: 'minibosses', quantity: 2 },
  { id: 'mb_zombie', name: 'Zombie', level: 1, damage: 1, ability: null, promotedForm: 'mb_zombie_king', flavorText: 'They keep coming.', expansion: 'minibosses', quantity: 2 },
  { id: 'mb_kobold', name: 'Kobold', level: 1, damage: 1, ability: null, promotedForm: 'mb_kobold_king', flavorText: 'Trap experts.', expansion: 'minibosses', quantity: 2 },
  { id: 'mb_demon_spawn', name: 'Demon Spawn', level: 1, damage: 2, ability: null, promotedForm: 'mb_demon_prince', flavorText: 'Hellish offspring.', expansion: 'minibosses', quantity: 2 },

  // Level 2 Minibosses (promoted forms)
  { id: 'mb_skeleton_lord', name: 'Skeleton Lord', level: 2, damage: 2, ability: { trigger: 'passive', effect: 'bonusDamage', value: 1, description: '+1 damage to this room' }, flavorText: 'Lord of bones.', expansion: 'minibosses', quantity: 2 },
  { id: 'mb_vampire_elder', name: 'Vampire Elder', level: 2, damage: 2, ability: { trigger: 'onHeroKill', effect: 'healWound', value: 1, description: 'If a hero dies here, heal 1 wound' }, flavorText: 'Ancient bloodsucker.', expansion: 'minibosses', quantity: 2 },
  { id: 'mb_demon_imp', name: 'Demon Imp', level: 2, damage: 2, ability: { trigger: 'onHeroKill', effect: 'drawSpell', value: 1, description: 'If a hero dies here, draw a spell' }, flavorText: 'Promoted devil.', expansion: 'minibosses', quantity: 2 },
  { id: 'mb_dark_elf_master', name: 'Dark Elf Master', level: 2, damage: 2, ability: { trigger: 'passive', effect: 'thiefBonus', value: 1, description: '+1 damage to Thief heroes' }, flavorText: 'Master assassin.', expansion: 'minibosses', quantity: 2 },
  { id: 'mb_high_cultist', name: 'High Cultist', level: 2, damage: 2, ability: { trigger: 'onHeroKill', effect: 'gainCoins', value: 2, description: 'If a hero dies here, gain 2 coins' }, flavorText: 'Dark rituals.', expansion: 'minibosses', quantity: 2 },
  { id: 'mb_witch_coven', name: 'Witch Coven', level: 2, damage: 2, ability: { trigger: 'passive', effect: 'mageBonus', value: 1, description: '+1 damage to Mage heroes' }, flavorText: 'Triple trouble.', expansion: 'minibosses', quantity: 2 },
  { id: 'mb_gargoyle_guardian', name: 'Gargoyle Guardian', level: 2, damage: 3, ability: { trigger: 'passive', effect: 'bonusDamage', value: 1, description: '+1 damage to this room' }, flavorText: 'Eternal guardian.', expansion: 'minibosses', quantity: 2 },
  { id: 'mb_shadow_lord', name: 'Shadow Lord', level: 2, damage: 2, ability: { trigger: 'onHeroEnter', effect: 'deactivateRoom', target: 'opponent', description: 'When a hero enters, deactivate an opponent room' }, flavorText: 'Darkness incarnate.', expansion: 'minibosses', quantity: 2 },
  { id: 'mb_minotaur_champion', name: 'Minotaur Champion', level: 2, damage: 3, ability: { trigger: 'passive', effect: 'fighterBonus', value: 1, description: '+1 damage to Fighter heroes' }, flavorText: 'Undefeated in the maze.', expansion: 'minibosses', quantity: 2 },
  { id: 'mb_spectre_king', name: 'Spectre King', level: 2, damage: 2, ability: { trigger: 'passive', effect: 'clericBonus', value: 1, description: '+1 damage to Cleric heroes' }, flavorText: 'King of the dead.', expansion: 'minibosses', quantity: 2 },
  { id: 'mb_basilisk_king', name: 'Basilisk King', level: 2, damage: 3, ability: { trigger: 'onHeroEnter', effect: 'freezeHero', description: 'When a hero enters, freeze them (skip next room)' }, flavorText: 'Petrifying gaze.', expansion: 'minibosses', quantity: 2 },
  { id: 'mb_zombie_king', name: 'Zombie King', level: 2, damage: 2, ability: { trigger: 'onHeroKill', effect: 'drawRoom', value: 1, description: 'If a hero dies here, draw a room' }, flavorText: 'Rise again.', expansion: 'minibosses', quantity: 2 },
  { id: 'mb_kobold_king', name: 'Kobold King', level: 2, damage: 2, ability: { trigger: 'passive', effect: 'bonusDamage', value: 2, description: '+2 damage if this is a Trap room' }, flavorText: 'Master of traps.', expansion: 'minibosses', quantity: 2 },
  { id: 'mb_demon_prince', name: 'Demon Prince', level: 2, damage: 3, ability: { trigger: 'onHeroKill', effect: 'drawSpell', value: 1, description: 'If a hero dies here, draw a spell' }, flavorText: 'Heir of darkness.', expansion: 'minibosses', quantity: 2 },
];

export const TOTAL_MINIBOSS_CARDS = MINIBOSSES.reduce((sum, mb) => sum + mb.quantity, 0);
