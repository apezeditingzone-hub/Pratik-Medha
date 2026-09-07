export interface BootConfiguration {
  BOOT_ENABLED: boolean;
  BOOT_DURATION: number; // in milliseconds (e.g. 5000ms = 5s)
  SHOW_EVERY_VISIT: boolean;
  VOICE_ENABLED_BY_DEFAULT: boolean;
  PARTICLE_COUNT: number;
}

export const BOOT_CONFIG: BootConfiguration = {
  BOOT_ENABLED: true,
  BOOT_DURATION: 5000,
  SHOW_EVERY_VISIT: true,
  VOICE_ENABLED_BY_DEFAULT: false,
  PARTICLE_COUNT: 350,
};

export const SYSTEM_MESSAGES = [
  "> INITIALIZING SYSTEM...",
  "> CONNECTING CORE...",
  "> LOADING PORTFOLIO...",
  "> SCANNING PROJECTS...",
  "> EXPERIENCE LOADED...",
  "> CREATIVE ENGINE ONLINE...",
  "> ALL SYSTEMS READY"
];

export const SCAN_STEPS = [
  { label: "IDENTITY", value: "CREATIVE DEVELOPER" },
  { label: "PROJECTS", value: "SYNCHRONIZED" },
  { label: "SKILLS", value: "LOADED [FULL STACK]" },
  { label: "STATUS", value: "ALL SYSTEMS OPERATIONAL" }
];
