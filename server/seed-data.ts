import { db } from "./db";
import { repairGuides, troubleshootingFlows, deviceComponents, deviceBrands, deviceModels, guideCompatibility } from "@shared/schema";

export interface SeedGuide {
  id?: string;
  title: string;
  description: string;
  deviceType: "laptop" | "desktop";
  category: "hardware" | "software" | "cleaning" | "upgrades";
  difficulty: "easy" | "medium" | "hard";
  estimatedTime: string;
  toolsRequired: string[];
  safetyWarnings: string[];
  steps: {
    stepNumber: number;
    title: string;
    description: string;
    imageUrl?: string;
    tips?: string[];
    warnings?: string[];
    notes?: string[];
  }[];
  alternativeSolutions?: string;
  imageUrl: string;
  viewCount?: number;
  downloadCount?: number;
}

export const curatedRepairGuides: SeedGuide[] = [
  // ==========================================
  // HARDWARE CATEGORY (LAPTOP & DESKTOP)
  // ==========================================
  {
    title: "Laptop Screen & Display Panel Replacement",
    description: "Step-by-step technician procedure for disassembling the display bezel, disconnecting the 30/40-pin eDP cable, and mounting a replacement IPS or OLED screen panel.",
    deviceType: "laptop",
    category: "hardware",
    difficulty: "hard",
    estimatedTime: "45-60 min",
    toolsRequired: ["Phillips #00 Screwdriver", "Plastic Spudger / Prying Pick", "Anti-Static Tweezers", "Double-Sided Bezel Adhesive Strips", "ESD Wrist Strap"],
    safetyWarnings: [
      "Disconnect main battery and AC power before touching any display ribbon cables to prevent blowing the backlight fuse on the logic board.",
      "LCD/OLED panels are fragile glass substrates; never exert point pressure on corners.",
      "Discharge static electricity prior to handling the eDP ribbon connector."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Power Isolation & Battery Disconnection",
        description: "Shut down the laptop completely. Remove the bottom chassis cover screws and unplug the internal battery connector from the motherboard.",
        imageUrl: "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=800",
        tips: ["Hold the power button for 15 seconds after disconnecting the battery to discharge residual board capacitance."]
      },
      {
        stepNumber: 2,
        title: "Display Bezel Separation",
        description: "Insert a thin plastic spudger between the bezel and the back cover starting at the top corner. Gently release the perimeter retention clips working downwards toward the hinges.",
        imageUrl: "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&q=80&w=800",
        warnings: ["Be careful near the integrated webcam and microphone array at the top center to avoid damaging the ribbon cable."]
      },
      {
        stepNumber: 3,
        title: "Screen Panel Removal & Cable Detachment",
        description: "Remove the four mounting screws or slowly pull the elastic adhesive pull-tabs. Carefully tilt the display panel forward and lift the metal locking bail on the 30-pin/40-pin eDP connector to slide it out.",
        imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800",
        notes: ["Inspect the connector pins under magnification for any oxidation or bent pins."]
      },
      {
        stepNumber: 4,
        title: "New Panel Installation & Alignment Test",
        description: "Align the new replacement panel, securely latch the eDP connector with adhesive tape, reconnect the battery for a quick post-test, and snap the bezel back into position.",
        imageUrl: "https://images.unsplash.com/photo-1540103547041-3929427b3708?auto=format&fit=crop&q=80&w=800",
        tips: ["Test backlight levels, refresh rate (e.g. 60Hz/120Hz/144Hz), and color calibration before applying final bezel adhesive."]
      }
    ],
    alternativeSolutions: "If external displays work through HDMI/DisplayPort, verify if the issue is a damaged LVDS/eDP cable rather than a cracked panel.",
    imageUrl: "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&q=80&w=800",
    viewCount: 1420,
    downloadCount: 380
  },
  {
    title: "Laptop Battery Replacement & Calibration",
    description: "Safely remove swollen or degraded lithium-ion polymer battery packs, install OEM-certified cells, and perform standard charging calibration cycles.",
    deviceType: "laptop",
    category: "hardware",
    difficulty: "easy",
    estimatedTime: "20-30 min",
    toolsRequired: ["Phillips #00 & Torx T5 Screwdrivers", "Plastic Opening Tool", "Safety Glasses", "Fire-Safe Disposal Container"],
    safetyWarnings: [
      "Never puncture, bend, or apply metallic tools to lithium polymer battery pouches.",
      "If the battery is swollen, do not compress it and work in a well-ventilated space."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Chassis Opening & Visual Inspection",
        description: "Remove bottom enclosure screws (noting varying screw lengths). Carefully pry off the cover to reveal the internal battery assembly.",
        imageUrl: "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 2,
        title: "Battery Cable Disconnection",
        description: "Gently disconnect the multi-pin battery wire harness from the motherboard socket using a plastic spudger pulling parallel to the board.",
        imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 3,
        title: "Cell Removal & New Pack Installation",
        description: "Remove battery bracket screws or pull release adhesive strips. Seat the fresh battery pack, screw down securely, and plug in the power harness.",
        imageUrl: "https://images.unsplash.com/photo-1540103547041-3929427b3708?auto=format&fit=crop&q=80&w=800",
        tips: ["Charge to 100% uninterrupted, then discharge to 5% before recharging to calibrate the battery gas gauge IC."]
      }
    ],
    alternativeSolutions: "Generate a Windows battery report (`powercfg /batteryreport`) or check macOS System Information to check actual cycle count and full charge capacity before replacing.",
    imageUrl: "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=800",
    viewCount: 2150,
    downloadCount: 512
  },
  {
    title: "Desktop Dedicated GPU Installation & PCIe Reseating",
    description: "Install, upgrade, or reseat high-performance PCI Express graphics cards, including supplementary 8-pin / 12VHPWR PCIe power cabling and anti-sag bracket installation.",
    deviceType: "desktop",
    category: "hardware",
    difficulty: "easy",
    estimatedTime: "20-30 min",
    toolsRequired: ["Magnetic Phillips #2 Screwdriver", "PCIe Power Cables / 12VHPWR Adapter", "GPU Anti-Sag Support Bracket"],
    safetyWarnings: [
      "Switch off the PSU rocker switch and unplug the AC wall cable before opening desktop side panels.",
      "Ensure 12VHPWR connectors are seated 100% flush with zero gap to prevent connector overheating."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "PCIe Slot Preparation & Bracket Removal",
        description: "Unscrew and remove the rear expansion slot covers corresponding to your GPU width (typically 2 to 3.5 slots). Push open the motherboard PCIe slot retention latch.",
        imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 2,
        title: "Inserting the Graphics Card",
        description: "Align the GPU with the top PCIe x16 slot (connected directly to CPU PCIe lanes) and press firmly downward until the retention latch clicks into place.",
        imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800",
        tips: ["Always use the topmost PCIe x16 slot for full bandwidth and minimal latency."]
      },
      {
        stepNumber: 3,
        title: "Securing Screws & Power Routing",
        description: "Secure the GPU bracket to the chassis frame with thumb screws. Connect dedicated PCIe 6+2 pin cables or 16-pin 12V-2x6 cable. Install the anti-sag bracket under the card corner.",
        imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800"
      }
    ],
    alternativeSolutions: "If display output is absent, verify monitor DP/HDMI cable is connected directly to the GPU ports, NOT the motherboard I/O.",
    imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800",
    viewCount: 1890,
    downloadCount: 460
  },
  {
    title: "Desktop Power Supply (PSU) Replacement & Modular Cable Routing",
    description: "Replace faulty, buzzing, or under-powered desktop power supplies with modern ATX 3.0 / PCIe 5.0 certified modular units.",
    deviceType: "desktop",
    category: "hardware",
    difficulty: "medium",
    estimatedTime: "45-60 min",
    toolsRequired: ["Phillips #2 Screwdriver", "Velcro Cable Ties / Flush Cutters", "PSU Paperclip Jump Tester / Digital Tester"],
    safetyWarnings: [
      "NEVER open or disassemble the PSU internal metal housing; high-voltage capacitors hold lethal charge for days.",
      "NEVER mix modular cables between different PSU brands or models as pinouts vary and can fry components."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Unplugging Component Power Cables",
        description: "Disconnect the 24-pin Motherboard connector, 8-pin CPU EPS cables (top-left of motherboard), PCIe GPU power cables, and SATA/Molex peripherals.",
        imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 2,
        title: "PSU Unmounting & Removal",
        description: "Remove the four mounting screws on the rear of the PC case. Slide the power supply unit out from the PSU basement or side chamber.",
        imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 3,
        title: "New PSU Setup & Reconnection",
        description: "Plug only the required modular cables into the new PSU, slide into the case with the intake fan facing the dust filter vent, secure with screws, and reconnect all motherboard and GPU headers.",
        imageUrl: "https://images.unsplash.com/photo-1540103547041-3929427b3708?auto=format&fit=crop&q=80&w=800"
      }
    ],
    alternativeSolutions: "Use a paperclip jump test (shorting green pin 16 to ground pin 17 on the 24-pin ATX connector) to verify fan spin before declaring a PSU dead.",
    imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800",
    viewCount: 1250,
    downloadCount: 310
  },
  {
    title: "Laptop Keyboard & Backlight Membrane Replacement",
    description: "Replace liquid-damaged, sticky, or missing laptop keyboard assemblies, including ribbon flex seating and riveted palmrest swaps.",
    deviceType: "laptop",
    category: "hardware",
    difficulty: "hard",
    estimatedTime: "60-90 min",
    toolsRequired: ["Phillips #00 Screwdriver", "Plastic Spudger", "Tweezers", "Hot Air Gun or Soldering Iron for plastic rivets (if applicable)"],
    safetyWarnings: [
      "Disconnect battery before unlatching keyboard ZIF (Zero Insertion Force) ribbon sockets.",
      "Work delicately around trackpad and keyboard ribbon cables to prevent tearing fragile copper traces."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Disassemble Bottom Cover & Internal Components",
        description: "Remove bottom cover, battery, cooling fans, and motherboard if the keyboard is mounted beneath the logic board tray.",
        imageUrl: "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 2,
        title: "Keyboard Plate Separation",
        description: "Unscrew keyboard retaining brackets or gently pry melted plastic retaining studs. Lift out the defective keyboard assembly.",
        imageUrl: "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 3,
        title: "Install Replacement & Ribbon Seating",
        description: "Align the new keyboard into the palmrest frame, secure retention screws, and insert the data and backlight ribbon cables fully into the ZIF connectors before clamping the latch.",
        imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800"
      }
    ],
    alternativeSolutions: "For single stuck or broken keycaps, individual scissor switches and keycaps can often be replaced without removing the whole assembly.",
    imageUrl: "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&q=80&w=800",
    viewCount: 1680,
    downloadCount: 420
  },

  // ==========================================
  // SOFTWARE CATEGORY (LAPTOP & DESKTOP)
  // ==========================================
  {
    title: "Clean Windows 11 / Windows 10 OS Installation via UEFI USB",
    description: "Complete guide to creating a bootable GPT UEFI installation USB media, configuring BIOS Secure Boot / TPM 2.0, partitioning storage, and completing a clean OS deployment.",
    deviceType: "laptop",
    category: "software",
    difficulty: "medium",
    estimatedTime: "30-45 min",
    toolsRequired: ["8GB+ USB 3.0 Flash Drive", "Working PC for Media Creation Tool / Rufus", "Target Device"],
    safetyWarnings: [
      "A clean installation will erase all data on the target drive partition. Ensure critical files are backed up beforehand."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Prepare Bootable Media",
        description: "Download the official Microsoft Media Creation Tool or use Rufus to flash the Windows ISO onto a USB drive formatted with GPT partition scheme for UEFI target system.",
        imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
        tips: ["Disable CSM (Compatibility Support Module) in BIOS for pure UEFI boot speed."]
      },
      {
        stepNumber: 2,
        title: "Configure BIOS/UEFI Settings",
        description: "Power on target system while tapping Boot Menu key (F12, F11, F8, or Esc depending on brand). Ensure Secure Boot and TPM 2.0 / fTPM are enabled in BIOS settings.",
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 3,
        title: "Partition Drive & Run Setup",
        description: "Select 'Custom: Install Windows only (advanced)'. Delete old OEM/system partitions on Drive 0 until 'Unallocated Space' remains, select it, and click Next to let Windows configure EFI, MSR, and Primary NTFS partitions.",
        imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 4,
        title: "Post-Install Drivers & Updates",
        description: "Run Windows Update until no pending updates remain. Install manufacturer chipset, GPU, audio, and Wi-Fi drivers.",
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
      }
    ],
    alternativeSolutions: "If you want to keep files and applications, perform an In-Place Upgrade or Windows Reset ('Keep my files') via Settings > System > Recovery.",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
    viewCount: 3100,
    downloadCount: 890
  },
  {
    title: "Blue Screen of Death (BSOD) Minidump Analysis & Driver Conflict Resolution",
    description: "Diagnose kernel stop codes (CRITICAL_PROCESS_DIED, WHEA_UNCORRECTABLE_ERROR, IRQL_NOT_LESS_OR_EQUAL, MEMORY_MANAGEMENT) using WinDbg and BlueScreenView.",
    deviceType: "desktop",
    category: "software",
    difficulty: "medium",
    estimatedTime: "25-40 min",
    toolsRequired: ["WinDbg (Windows Debugger)", "BlueScreenView / WhoCrashed", "Display Driver Uninstaller (DDU)"],
    safetyWarnings: [
      "Always reboot into Windows Safe Mode before running Display Driver Uninstaller (DDU) to prevent driver hook conflicts."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Locate Memory Dump Files",
        description: "Navigate to `C:\\Windows\\Minidump` to locate recent `.dmp` crash files generated during the Blue Screen event.",
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 2,
        title: "Analyze Crash Stack with WinDbg",
        description: "Open the `.dmp` file in WinDbg and run the automated command `!analyze -v`. Inspect the `MODULE_NAME`, `FAULTING_IP`, and `PROCESS_NAME` to identify the failing driver (e.g. nvlddmkm.sys, ntoskrnl.exe, tcpip.sys).",
        imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 3,
        title: "Clean Driver Reinstallation",
        description: "Boot into Safe Mode, run DDU to completely purge residual graphics or chipset driver files, reboot, and install clean WHQL-certified drivers from the manufacturer.",
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
      }
    ],
    alternativeSolutions: "Run Windows Memory Diagnostic (`mdsched.exe`) or MemTest86 to rule out faulty physical RAM modules when MEMORY_MANAGEMENT stop codes occur.",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    viewCount: 2450,
    downloadCount: 680
  },
  {
    title: "macOS Internet Recovery & Fresh Sequoia / Sonoma Installation",
    description: "Step-by-step procedure for Apple Silicon (M1/M2/M3) and Intel Macs to wipe APFS volumes and reinstall macOS cleanly via Recovery Mode.",
    deviceType: "laptop",
    category: "software",
    difficulty: "easy",
    estimatedTime: "40-60 min",
    toolsRequired: ["Reliable Wi-Fi or Ethernet connection", "Apple ID Credentials", "USB-C Power Adapter"],
    safetyWarnings: [
      "Ensure FileVault encryption recovery key or Apple ID password is on hand to bypass Activation Lock after erasing."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Enter Recovery Mode",
        description: "On Apple Silicon: Press and hold the power button until 'Loading startup options' appears, then select Options. On Intel Macs: Turn on and immediately hold Command (⌘) + Option + R.",
        imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 2,
        title: "Format Drive in Disk Utility",
        description: "Open Disk Utility, select View > Show All Devices. Click the internal SSD (e.g. APPLE SSD), click Erase, set Format to APFS and Scheme to GUID Partition Map, and confirm erase.",
        imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 3,
        title: "Reinstall macOS",
        description: "Quit Disk Utility, select 'Reinstall macOS', accept software terms, select the freshly formatted APFS container, and let the installer complete all download and restart phases.",
        imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800"
      }
    ],
    alternativeSolutions: "For enterprise deployments or fleet provisioning, build a bootable USB installer using the terminal command `createinstallmedia`.",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800",
    viewCount: 1980,
    downloadCount: 540
  },
  {
    title: "Windows DISM & SFC System File Integrity Repair",
    description: "Repair corrupt Windows system files, corrupted update components, and broken side-by-side component stores using command line administrative tools.",
    deviceType: "desktop",
    category: "software",
    difficulty: "easy",
    estimatedTime: "15-25 min",
    toolsRequired: ["Elevated Windows Terminal / Command Prompt (Admin)", "Active Internet Connection"],
    safetyWarnings: [
      "Do not power off or force reboot the computer while DISM /RestoreHealth is processing."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Run DISM Component Store Verification",
        description: "Open Terminal as Administrator. Run `DISM /Online /Cleanup-Image /ScanHealth` to check if component store corruption is detected.",
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 2,
        title: "Execute DISM Repair",
        description: "Run `DISM /Online /Cleanup-Image /RestoreHealth`. Windows will download fresh system payload files from Windows Update servers to replace corrupted hashes.",
        imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 3,
        title: "Execute System File Checker (SFC)",
        description: "Execute `sfc /scannow`. Verify the output reports 'Windows Resource Protection found corrupt files and successfully repaired them.' Reboot when done.",
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
      }
    ],
    alternativeSolutions: "If DISM cannot find online sources, mount a Windows ISO and specify local source: `DISM /Online /Cleanup-Image /RestoreHealth /Source:wim:D:\\sources\\install.wim:1 /limitaccess`.",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    viewCount: 1650,
    downloadCount: 470
  },

  // ==========================================
  // CLEANING CATEGORY (LAPTOP & DESKTOP)
  // ==========================================
  {
    title: "High-Performance CPU & GPU Thermal Paste Repaste",
    description: "Remove degraded, crusty factory thermal interface material (TIM) and apply premium non-conductive thermal paste (Arctic MX-6, Noctua NT-H2, Thermal Grizzly Kryonaut) for 10-25°C temperature drops.",
    deviceType: "laptop",
    category: "cleaning",
    difficulty: "medium",
    estimatedTime: "30-45 min",
    toolsRequired: ["99% Isopropyl Alcohol (IPA)", "Lint-Free Microfiber Cloth / Coffee Filters", "Thermal Paste Tube", "Phillips / Torx Screwdrivers", "Plastic Spudger"],
    safetyWarnings: [
      "Use only non-conductive thermal compounds on exposed silicon dies; do not use liquid metal unless direct nickel coating is confirmed.",
      "Tighten heatsink screws in diagonal numbered order (1-2-3-4) to ensure even mounting pressure and prevent die cracking."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Remove Cooler & Heatsink Assembly",
        description: "Loosen heatsink spring screws in reverse diagonal order (4-3-2-1). Gently twist the copper vapor chamber/heatsink to break the vacuum seal before lifting.",
        imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 2,
        title: "Clean Old Thermal Compound",
        description: "Apply 99% IPA to a lint-free cloth and gently wipe old dried paste off the CPU/GPU silicon dies and copper coldplate until both surfaces are mirrored and residue-free.",
        imageUrl: "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&q=80&w=800",
        tips: ["Inspect thermal putty / pads on VRAM chips and VRM inductors; replace if torn or dried out."]
      },
      {
        stepNumber: 3,
        title: "Apply Fresh Paste & Remount Heatsink",
        description: "Apply a pea-sized dot (or thin X-pattern for bare direct-die laptop CPUs) of thermal paste. Lower the heatsink flat and tighten screws in numbered diagonal order (1 to 4).",
        imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800"
      }
    ],
    alternativeSolutions: "Consider phase-change thermal pads (e.g. Honeywell PTM7950) for long-lasting laptop thermal stability without pump-out degradation.",
    imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800",
    viewCount: 2890,
    downloadCount: 750
  },
  {
    title: "Desktop Case & Power Supply Dust Filter Decontamination",
    description: "Deep clean dusty radiator fins, fan blades, PSU mesh intakes, and chassis air filters to eliminate thermal throttling and acoustic fan whine.",
    deviceType: "desktop",
    category: "cleaning",
    difficulty: "easy",
    estimatedTime: "20-30 min",
    toolsRequired: ["Electric Compressed Air Duster", "Soft Bristle Anti-Static Brush", "99% Isopropyl Alcohol", "Microfiber Towels"],
    safetyWarnings: [
      "Always hold fan blades stationary with a finger or zip-tie while blowing compressed air to prevent over-spinning the bearing and generating back-EMF voltage into the motherboard fan header."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Remove Magnetic Mesh Filters",
        description: "Slide out top, front, and bottom PSU dust filters. Rinse under warm water and allow to dry completely, or blow clean with electric duster.",
        imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 2,
        title: "Clean Radiators & Fan Blades",
        description: "Hold each fan blade in place while blowing compressed air through the radiator fins from inside-out. Use an anti-static brush to dislodge stubborn cake on leading blade edges.",
        imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 3,
        title: "Motherboard & GPU Shroud Wipedown",
        description: "Gently wipe PCB flat surfaces and GPU backplate with a lightly dampened microfiber cloth (99% IPA). Reassemble dust filters once 100% dry.",
        imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800"
      }
    ],
    alternativeSolutions: "Perform this maintenance once every 6 months to maintain optimum thermal headroom and extend hardware longevity.",
    imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800",
    viewCount: 1430,
    downloadCount: 390
  },
  {
    title: "Liquid Spill Emergency Protocol & Ultrasonic Board Cleaning",
    description: "Immediate emergency protocol for laptops or keyboards exposed to coffee, water, soda, or juice to prevent galvanic corrosion and short circuits.",
    deviceType: "laptop",
    category: "cleaning",
    difficulty: "hard",
    estimatedTime: "90-120 min",
    toolsRequired: ["99% Isopropyl Alcohol", "Ultrasonic Cleaner / Soft ESD Toothbrush", "Distilled Water", "Silica Gel Drying Packets"],
    safetyWarnings: [
      "NEVER connect power or attempt to boot a liquid-damaged laptop until all internal traces are completely dehydrated and deoxidized.",
      "DO NOT use rice; starch dust enters cooling vents and causes further mechanical damage."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Immediate Power Cut & Inversion",
        description: "Force shutdown immediately (hold power 10s), unplug AC adapter, flip laptop into a tent position over a towel, and disconnect battery immediately.",
        imageUrl: "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 2,
        title: "Motherboard Extraction & Inspection",
        description: "Disassemble the entire motherboard. Inspect under magnification for green/white copper oxidation and sugar/soda residue around SMD capacitors and ICs.",
        imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 3,
        title: "IPA Wash & Dehydration",
        description: "Submerge board in 99% anhydrous Isopropyl Alcohol or ultrasonic bath to displace moisture and dissolve sticky residues. Dry in a heated dehydrator at 50°C for 4 hours.",
        imageUrl: "https://images.unsplash.com/photo-1540103547041-3929427b3708?auto=format&fit=crop&q=80&w=800"
      }
    ],
    alternativeSolutions: "Test individual power rails (3.3V, 5V, 1.8V, VCORE) with a digital multimeter before reassembling the full chassis.",
    imageUrl: "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=800",
    viewCount: 2210,
    downloadCount: 620
  },

  // ==========================================
  // UPGRADES CATEGORY (LAPTOP & DESKTOP)
  // ==========================================
  {
    title: "M.2 NVMe PCIe Gen4/Gen5 SSD Installation & OS Migration",
    description: "Upgrade slow hard drives or small SSDs to ultra-fast M.2 NVMe solid state drives, including sector-by-sector cloning and heatsink mounting.",
    deviceType: "laptop",
    category: "upgrades",
    difficulty: "easy",
    estimatedTime: "25-35 min",
    toolsRequired: ["Phillips #00 Screwdriver", "M.2 Mounting Standoff & Screw", "USB to NVMe Enclosure (for cloning)", "Cloning Software (Macrium Reflect / Clonezilla)"],
    safetyWarnings: [
      "Always ground yourself before touching naked flash memory chips to prevent ESD damage.",
      "Insert M.2 drives at a 30-degree angle; do not force straight horizontally."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Clone Existing Drive (Optional)",
        description: "Insert the new NVMe drive into an external USB enclosure. Run Macrium Reflect or Clonezilla to clone all partitions including EFI and Recovery sectors.",
        imageUrl: "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 2,
        title: "Access M.2 PCIe Slot",
        description: "Remove bottom cover/case side panel. Locate the M.2 2280 Key-M slot. Remove existing screw or thermal shield plate.",
        imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 3,
        title: "Install & Fasten NVMe Drive",
        description: "Insert the SSD at a 30-degree angle until pins are fully seated in the slot. Press down gently and fasten the M.2 retaining screw. Reapply thermal pad and heat shield.",
        imageUrl: "https://images.unsplash.com/photo-1540103547041-3929427b3708?auto=format&fit=crop&q=80&w=800",
        tips: ["Peel off the protective plastic film from the motherboard M.2 thermal pad before screwing down the heatsink."]
      }
    ],
    alternativeSolutions: "If BIOS doesn't detect the new drive, verify that SATA/NVMe mode is set to AHCI / NVMe rather than legacy RAID/RST.",
    imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800",
    viewCount: 3450,
    downloadCount: 980
  },
  {
    title: "Dual-Channel DDR5 / DDR4 RAM Capacity & Speed Expansion",
    description: "Install matched SODIMM (Laptop) or DIMM (Desktop) RAM kits to unlock dual-channel memory bandwidth, and enable XMP/EXPO profiles in BIOS for maximum FPS.",
    deviceType: "desktop",
    category: "upgrades",
    difficulty: "easy",
    estimatedTime: "15-20 min",
    toolsRequired: ["Anti-Static Wrist Strap", "Phillips Screwdriver (if desktop case requires)"],
    safetyWarnings: [
      "Handle memory sticks by the outer PCB edges only; never touch the gold contact fingers."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Identify Optimal Memory Channels",
        description: "On 4-slot desktop motherboards, install two memory sticks into slots A2 and B2 (slots 2 and 4 from the CPU) for optimal signal integrity.",
        imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 2,
        title: "Slotting the Memory Sticks",
        description: "Open the slot retention clips. Align the key notch on the RAM stick with the slot ridge. Press down firmly on both edges until both latches snap shut automatically.",
        imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 3,
        title: "Enable XMP / EXPO in BIOS",
        description: "Power on, enter BIOS (Del / F2), locate Extreme Memory Profile (XMP) or AMD EXPO, enable Profile 1, save and exit to run at full advertised MHz (e.g. 6000MHz CL30).",
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
      }
    ],
    alternativeSolutions: "Check Task Manager > Performance > Memory to confirm configured speed and that 'Slots used: 2 of 4' and 'Dual Channel' are active.",
    imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800",
    viewCount: 2780,
    downloadCount: 710
  },
  {
    title: "Wi-Fi 6E / Wi-Fi 7 M.2 Tri-Band Card & Bluetooth 5.4 Upgrade",
    description: "Swap legacy 802.11ac Wi-Fi cards for Intel AX210 / BE200 Wi-Fi 7 modules for 6GHz spectrum access, lower latency, and Bluetooth 5.4 audio.",
    deviceType: "laptop",
    category: "upgrades",
    difficulty: "medium",
    estimatedTime: "20-30 min",
    toolsRequired: ["Phillips #00 Screwdriver", "Plastic Spudger / Tweezers for U.FL Antenna Connectors"],
    safetyWarnings: [
      "U.FL IPEX micro antenna snap connectors are delicate; apply vertical pressure directly above the post to avoid crushing the gold pin."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Locate Existing WLAN Module",
        description: "Disconnect laptop battery. Locate the M.2 2230 WLAN card, usually near the cooling fans or SSD.",
        imageUrl: "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 2,
        title: "Disconnect Antennas & Card Swap",
        description: "Carefully pop off the Main (Black) and Aux (White) U.FL antenna cables using plastic tweezers. Remove the mounting screw and slide out old card.",
        imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 3,
        title: "Install New Module & Snap Antennas",
        description: "Insert new Wi-Fi 6E/7 card, screw down, and snap the antenna connectors firmly onto the corresponding Main and Aux posts. Install Intel WLAN and Bluetooth drivers.",
        imageUrl: "https://images.unsplash.com/photo-1540103547041-3929427b3708?auto=format&fit=crop&q=80&w=800"
      }
    ],
    alternativeSolutions: "Download latest Wi-Fi drivers onto a USB flash drive BEFORE swapping the card to prevent being left without network access.",
    imageUrl: "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=800",
    viewCount: 1720,
    downloadCount: 440
  },
  {
    title: "Desktop All-in-One (AIO) 360mm Liquid CPU Cooler Installation",
    description: "Install high-performance 240mm or 360mm AIO liquid coolers on Intel LGA1700/1851 and AMD Socket AM5/AM4 processors for maximum thermal headroom.",
    deviceType: "desktop",
    category: "upgrades",
    difficulty: "medium",
    estimatedTime: "45-60 min",
    toolsRequired: ["Phillips #2 Screwdriver", "AIO Mounting Hardware & Backplate", "Thermal Paste (if not pre-applied)", "Fan Splitter / ARGB Hub"],
    safetyWarnings: [
      "CRITICAL: Always remember to peel off the clear plastic protective sticker from the AIO copper cold plate before mounting to CPU.",
      "Mount the radiator above the pump level (e.g. top exhaust) to prevent air bubbles from getting trapped in the pump chamber."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Install Motherboard Backplate & Standoffs",
        description: "Fit the socket-specific backplate (Intel LGA1700 or AMD AM5 bracket) and hand-tighten the four double-threaded standoffs into the bracket holes.",
        imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 2,
        title: "Mount Radiator & Fans to Case",
        description: "Fasten the 120mm fans to the radiator in push orientation, then mount the radiator assembly to the top or front case bracket using long radiator screws.",
        imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800"
      },
      {
        stepNumber: 3,
        title: "Mount Pump Block & Cable Connections",
        description: "Peel protective film from copper coldplate, place pump block over the CPU, hand-tighten spring thumbscrews in diagonal X-pattern, and plug the pump tach wire into the `AIO_PUMP` or `CPU_FAN` header.",
        imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800"
      }
    ],
    alternativeSolutions: "Set the pump speed to 100% constant PWM in BIOS for optimal coolant circulation and whisper-quiet operation.",
    imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800",
    viewCount: 2190,
    downloadCount: 580
  }
];

export const comprehensiveTroubleshootingFlows = [
  {
    category: "power",
    title: "Device Fails to Power On / No POST Diagnostics",
    description: "Systematic diagnostic workflow to isolate AC adapter failure, drained CMOS battery, shorted motherboard power rail, or bad RAM modules.",
    steps: [
      {
        stepNumber: 1,
        description: "Does the power indicator LED light up or blink when connecting the AC charger?",
        solutions: ["Perform a hard CMOS battery reset", "Test with a known-good AC power adapter", "Check DC-in power jack for physical damage or loose solder joints"]
      },
      {
        stepNumber: 2,
        description: "Do cooling fans spin, but the screen stays completely black with no BIOS splash screen?",
        solutions: ["Reseat RAM modules one at a time", "Connect external monitor via HDMI to rule out display panel fault", "Clear motherboard RTC clock CMOS jumper"]
      },
      {
        stepNumber: 3,
        description: "Does the system immediately shut down after 2-5 seconds of powering on?",
        solutions: ["Inspect CPU cooler mounting pressure and thermal paste", "Disconnect all non-essential USB and PCIe peripherals to test minimal POST", "Check motherboard VRM power delivery"]
      }
    ]
  },
  {
    category: "performance",
    title: "Thermal Throttling & Severe Fan Noise Diagnostics",
    description: "Identify whether system slowdowns are caused by clogged heatsink fins, dried thermal paste, background crypto-miners, or failing fan bearings.",
    steps: [
      {
        stepNumber: 1,
        description: "Are CPU or GPU temperatures exceeding 90°C under light to moderate workloads?",
        solutions: ["Repaste CPU and GPU with Arctic MX-6 / Noctua thermal paste", "Blow compressed air through radiator exhaust fins to remove dust buildup", "Check fan RPM speed curves in BIOS or OEM management software"]
      },
      {
        stepNumber: 2,
        description: "Is CPU usage staying at 100% in Task Manager even when idle on desktop?",
        solutions: ["Perform full Malwarebytes and Windows Defender offline scans", "Check Task Manager for rogue background processes (e.g. Windows Search indexer, crypto-miners)", "Run DISM and SFC file integrity scans"]
      }
    ]
  },
  {
    category: "display",
    title: "Display Artifacts, Flickering & Black Screen Troubleshooting",
    description: "Determine if visual glitches, lines, or flickering originate from GPU driver corruption, loose eDP display cables, or cracked panel matrices.",
    steps: [
      {
        stepNumber: 1,
        description: "Do horizontal/vertical lines or flickering change when you move the laptop display hinge back and forth?",
        solutions: ["Reseat or replace the eDP/LVDS display ribbon cable", "Inspect display hinge tension brackets for pinching the cable bundle"]
      },
      {
        stepNumber: 2,
        description: "Do colorful checkerboard artifacts or crashes occur primarily inside 3D games or GPU workloads?",
        solutions: ["Perform clean GPU driver reinstallation using DDU in Safe Mode", "Check GPU VRAM temperatures and lower memory overclock", "Verify PCIe power cable seating"]
      }
    ]
  }
];

export const comprehensiveDeviceComponents = [
  {
    name: "M.2 NVMe SSD",
    description: "High-speed solid state drive utilizing PCI Express lanes and NVMe communication protocol for speeds up to 7,500 MB/s.",
    deviceType: "laptop",
    componentType: "storage",
    commonIssues: ["Read-only mode after endurance depletion", "Thermal throttling under heavy writes", "Unformatted RAW partition"],
    replacementDifficulty: "easy",
    averageCost: "$45-180",
    toolsRequired: ["Phillips #00 screwdriver", "Thermal pad"],
    imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "SODIMM DDR5 RAM Module",
    description: "Compact dual-inline memory module for laptops and mini-PCs with on-die ECC and dual 32-bit sub-channels.",
    deviceType: "laptop",
    componentType: "memory",
    commonIssues: ["BSOD MEMORY_MANAGEMENT", "Unseated latch causing no-POST black screen", "Intermittent freezes"],
    replacementDifficulty: "easy",
    averageCost: "$35-120",
    toolsRequired: ["Plastic spudger", "Anti-static wrist strap"],
    imageUrl: "https://images.unsplash.com/photo-1540103547041-3929427b3708?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Dedicated PCIe Graphics Card (GPU)",
    description: "High-performance graphics accelerator card for rendering 3D graphics, gaming, machine learning, and multi-display outputs.",
    deviceType: "desktop",
    componentType: "graphics",
    commonIssues: ["Artifacting / VRAM corruption", "Driver timeout / TDR crashes", "Fan bearing noise"],
    replacementDifficulty: "easy",
    averageCost: "$250-1600",
    toolsRequired: ["Phillips #2 screwdriver", "PCIe power cables", "Anti-sag bracket"],
    imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "ATX Modular Power Supply Unit (PSU)",
    description: "High-efficiency 80+ Gold / Platinum power supply converting 115V/230V AC to stable +12V, +5V, and +3.3V DC rails.",
    deviceType: "desktop",
    componentType: "power",
    commonIssues: ["Instant shutdown under GPU transient spikes", "No 5VSB standby power", "Coil whine"],
    replacementDifficulty: "medium",
    averageCost: "$70-250",
    toolsRequired: ["Phillips #2 screwdriver", "Modular cable kit"],
    imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Liquid Crystal / OLED Display Assembly",
    description: "High-resolution laptop display panel offering 100% sRGB/DCI-P3 color gamut with eDP connection.",
    deviceType: "laptop",
    componentType: "display",
    commonIssues: ["Cracked glass matrix", "Backlight bleed", "Dead pixels", "eDP cable micro-fractures"],
    replacementDifficulty: "hard",
    averageCost: "$60-220",
    toolsRequired: ["Plastic prying picks", "Phillips #00", "Bezel adhesive strips"],
    imageUrl: "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&q=80&w=800"
  }
];

export const IMAGES = {
  screenTeardown1: "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=800",
  screenTeardown2: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800",
  screenTeardown3: "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&q=80&w=800",
  logicBoard: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
  battery: "https://images.unsplash.com/photo-1540103547041-3929427b3708?auto=format&fit=crop&q=80&w=800",
  soldering: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800",
  biosScreen: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
  terminal: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
  osRecovery: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
  thermalPaste: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800",
  cleaningBlower: "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&q=80&w=800",
  ultrasonic: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=800",
  nvmeSSD: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800",
  ramModule: "https://images.unsplash.com/photo-1540103547041-3929427b3708?auto=format&fit=crop&q=80&w=800",
  gpuAio: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800",
  desktopRig: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=800"
};

const guideTemplates = [
  {
    category: "hardware" as const,
    titleSuffix: "OLED/IPS Screen & Hinge Assembly Replacement",
    descSuffix: "Complete teardown procedure to disconnect eDP display cabling, unbolt magnesium hinge brackets, and install a brand-new factory display panel.",
    difficulty: "hard" as const,
    estimatedTime: "45-60 min",
    tools: ["Phillips #00 Screwdriver", "Torx T5 Bit", "Plastic Spudger", "Pre-cut Bezel Adhesive Tape", "Anti-Static Wrist Strap"],
    warnings: ["Disconnect the main battery before touching internal display ribbon cables.", "Handle replacement display glass by perimeter edges only."],
    steps: [
      {
        stepNumber: 1,
        title: "Power Isolation & Battery Disconnection",
        description: "Remove bottom enclosure screws and disconnect internal battery harness from the logic board to prevent backlight circuit shorting.",
        imageUrl: IMAGES.screenTeardown1
      },
      {
        stepNumber: 2,
        title: "Display Hinge Bracket Unbolting",
        description: "Unscrew the left and right steel hinge anchor bolts and unroute Wi-Fi and webcam antenna cables from cable channels.",
        imageUrl: IMAGES.screenTeardown2
      },
      {
        stepNumber: 3,
        title: "Screen Bezel Separation & Panel Swap",
        description: "Gently pry bezel clips with a thin guitar pick, disconnect the 30/40-pin eDP connector, mount the new panel, and secure with fresh adhesive.",
        imageUrl: IMAGES.screenTeardown3
      }
    ],
    imageUrl: IMAGES.screenTeardown3
  },
  {
    category: "hardware" as const,
    titleSuffix: "Motherboard & VRM Power Delivery Replacement",
    descSuffix: "Comprehensive logic board replacement, port realignment, and heatsink mounting procedure for technician-level system restoration.",
    difficulty: "hard" as const,
    estimatedTime: "60-90 min",
    tools: ["Precision Screwdriver Kit", "Thermal Paste (Arctic MX-6)", "ESD Mat", "Magnetic Screw Tray"],
    warnings: ["Ground yourself on an ESD mat.", "Track all varying screw lengths carefully to prevent through-board chassis damage."],
    steps: [
      {
        stepNumber: 1,
        title: "Sub-assembly Removal",
        description: "Extract battery, cooling assembly, NVMe SSDs, Wi-Fi module, and disconnect all peripheral ribbon cables.",
        imageUrl: IMAGES.screenTeardown1
      },
      {
        stepNumber: 2,
        title: "Logic Board Extraction",
        description: "Unscrew logic board standoff screws, ease I/O ports out of chassis cutouts, and transfer TPM/CPU components as needed.",
        imageUrl: IMAGES.logicBoard
      },
      {
        stepNumber: 3,
        title: "New Board Installation & Post-Test",
        description: "Seat the replacement motherboard, reapply thermal compound, reconnect all flex cables, and verify POST in diagnostic mode.",
        imageUrl: IMAGES.soldering
      }
    ],
    imageUrl: IMAGES.logicBoard
  },
  {
    category: "hardware" as const,
    titleSuffix: "OEM Battery Pack Replacement & BMS Calibration",
    descSuffix: "Safely remove degraded or swollen lithium-ion pouch cells, route new OEM battery harness, and execute charging calibration cycle.",
    difficulty: "easy" as const,
    estimatedTime: "20-30 min",
    tools: ["Phillips #00 Screwdriver", "Plastic Pry Pick", "Safety Glasses", "Battery Adhesive Pull Tabs"],
    warnings: ["Never bend, puncture, or apply metal tools to lithium-polymer battery packs.", "Discharge battery below 25% prior to disassembly."],
    steps: [
      {
        stepNumber: 1,
        title: "Bottom Cover Removal",
        description: "Remove perimeter fasteners and release bottom casing to expose the internal battery compartment.",
        imageUrl: IMAGES.screenTeardown1
      },
      {
        stepNumber: 2,
        title: "Battery Connector & Adhesive Release",
        description: "Unplug the battery data/power harness from the motherboard. Slowly pull the stretch-release adhesive strips parallel to the chassis.",
        imageUrl: IMAGES.battery
      },
      {
        stepNumber: 3,
        title: "New Cell Installation & BMS Cycling",
        description: "Mount new OEM pack, connect ribbon securely, screw down brackets, and charge continuously to 100% followed by full discharge.",
        imageUrl: IMAGES.battery
      }
    ],
    imageUrl: IMAGES.battery
  },
  {
    category: "hardware" as const,
    titleSuffix: "DC-In Power Jack & USB-C Port Board Replacement",
    descSuffix: "Diagnose intermittent charging and replace fractured DC-in power harness or daughterboard USB-C charging receptacles.",
    difficulty: "medium" as const,
    estimatedTime: "35-45 min",
    tools: ["Torx T5 / Phillips #00", "Digital Multimeter", "Spudger", "Tweezers"],
    warnings: ["Verify absence of residual 19V/20V capacitor charge before touching port solder pads."],
    steps: [
      {
        stepNumber: 1,
        title: "Port Accessibility Isolation",
        description: "Disconnect internal battery, lift the left/right hinge bracket covering the charging port, and remove cable retention brackets.",
        imageUrl: IMAGES.screenTeardown2
      },
      {
        stepNumber: 2,
        title: "Port Harness Detachment",
        description: "Unplug the DC-in braided cable harness from the motherboard header or unbolt the modular Type-C daughterboard.",
        imageUrl: IMAGES.soldering
      },
      {
        stepNumber: 3,
        title: "Reassembly & Voltage Verification",
        description: "Install fresh OEM port module, secure hinge bolts to manufacturer torque specs, and probe 20V rail with multimeter.",
        imageUrl: IMAGES.logicBoard
      }
    ],
    imageUrl: IMAGES.soldering
  },
  {
    category: "hardware" as const,
    titleSuffix: "Dual Cooling Fan & Copper Heatpipe Module Overhaul",
    descSuffix: "Replace noisy, rattling, or seized CPU/GPU blower fans and re-torque copper vapor chamber heatsink assembly.",
    difficulty: "medium" as const,
    estimatedTime: "30-40 min",
    tools: ["Phillips #00 Screwdriver", "Thermal Paste", "Micro-Tweezers", "Can of Compressed Air"],
    warnings: ["Tighten heatsink screws in stamped numerical order (1 -> 2 -> 3 -> 4) to ensure uniform die pressure."],
    steps: [
      {
        stepNumber: 1,
        title: "Cooling Shroud Removal",
        description: "Disconnect 4-pin PWM fan headers, remove perimeter heatsink screws in reverse order, and lift copper assembly away from dies.",
        imageUrl: IMAGES.thermalPaste
      },
      {
        stepNumber: 2,
        title: "Blower Impeller Swap",
        description: "Unscrew fan motor brackets from heatpipe radiator fins and mount brand-new fluid-dynamic bearing fan units.",
        imageUrl: IMAGES.cleaningBlower
      },
      {
        stepNumber: 3,
        title: "Paste Refresh & Sequential Torque",
        description: "Wipe dies clean with 99% IPA, apply high-viscosity thermal paste, fasten screws sequentially, and plug in fan headers.",
        imageUrl: IMAGES.thermalPaste
      }
    ],
    imageUrl: IMAGES.thermalPaste
  },

  // SOFTWARE
  {
    category: "software" as const,
    titleSuffix: "UEFI / BIOS Firmware Recovery & Crisis Flash Protocol",
    descSuffix: "Step-by-step procedure to flash, recover, or clear corrupted UEFI BIOS firmware using USB FlashBack or emergency key combinations.",
    difficulty: "medium" as const,
    estimatedTime: "20-30 min",
    tools: ["FAT32 Formatted USB Flash Drive", "OEM BIOS Firmware File", "Stable AC Power Source"],
    warnings: ["NEVER unplug power or reboot while the firmware EEPROM is writing.", "Ensure battery has at least 50% charge before starting."],
    steps: [
      {
        stepNumber: 1,
        title: "Prepare Flash Drive",
        description: "Format USB drive to FAT32 with MBR partition scheme. Download latest verified OEM BIOS file and rename to the required hardware flashback string if using blind USB flash.",
        imageUrl: IMAGES.biosScreen
      },
      {
        stepNumber: 2,
        title: "Initiate BIOS Update Environment",
        description: "Boot into BIOS Setup (tap F2/Del) and open the built-in flash utility (EZ Flash / Q-Flash / M-Flash / Dell BIOS Update) or hold the chassis FlashBack button.",
        imageUrl: IMAGES.osRecovery
      },
      {
        stepNumber: 3,
        title: "Execute ROM Write & Reset CMOS",
        description: "Confirm ROM validation checksum. Allow the system to flash blocks 0-100% and reboot automatically into the updated microcode environment.",
        imageUrl: IMAGES.biosScreen
      }
    ],
    imageUrl: IMAGES.biosScreen
  },
  {
    category: "software" as const,
    titleSuffix: "EFI Bootloader & BCD Partition Reconstruction",
    descSuffix: "Resolve 'No Bootable Device Found' and 0xc000000e boot errors by rebuilding the EFI system partition and Windows Boot Configuration Data.",
    difficulty: "medium" as const,
    estimatedTime: "25-35 min",
    tools: ["Windows Recovery USB Media", "Command Prompt Environment"],
    warnings: ["Verify disk volume numbers with `diskpart` carefully before formatting any partition."],
    steps: [
      {
        stepNumber: 1,
        title: "Boot Recovery Environment",
        description: "Boot from Windows Recovery Media > Repair your computer > Troubleshoot > Advanced Options > Command Prompt.",
        imageUrl: IMAGES.terminal
      },
      {
        stepNumber: 2,
        title: "Assign Drive Letter to EFI Partition",
        description: "Run `diskpart`, `list volume`, select the ~100MB FAT32 system partition, run `assign letter=S:`, and exit diskpart.",
        imageUrl: IMAGES.osRecovery
      },
      {
        stepNumber: 3,
        title: "Rebuild BCD Store",
        description: "Execute `bcdboot C:\\Windows /s S: /f UEFI` to generate fresh UEFI boot files, and reboot.",
        imageUrl: IMAGES.terminal
      }
    ],
    imageUrl: IMAGES.terminal
  },
  {
    category: "software" as const,
    titleSuffix: "BSOD Kernel Triage & Clean OS Driver Reinstallation",
    descSuffix: "Isolate recurring WHEA_UNCORRECTABLE_ERROR, IRQL_NOT_LESS_OR_EQUAL stop codes and perform clean DDU driver wipes in Safe Mode.",
    difficulty: "easy" as const,
    estimatedTime: "20-30 min",
    tools: ["Display Driver Uninstaller (DDU)", "OEM WHQL Driver Package", "Safe Mode Boot Option"],
    warnings: ["Disconnect internet cable during DDU reinstallation to prevent Windows Update from installing generic drivers."],
    steps: [
      {
        stepNumber: 1,
        title: "Boot Safe Mode Without Networking",
        description: "Hold Shift while clicking Restart > Troubleshoot > Advanced Options > Startup Settings > Restart > Press 4 for Safe Mode.",
        imageUrl: IMAGES.osRecovery
      },
      {
        stepNumber: 2,
        title: "Run DDU Clean and Restart",
        description: "Launch Display Driver Uninstaller, select GPU (NVIDIA/AMD/Intel), click 'Clean and restart' to wipe registry keys and display caches.",
        imageUrl: IMAGES.terminal
      },
      {
        stepNumber: 3,
        title: "Install Clean WHQL Drivers",
        description: "Boot back to normal desktop, install official OEM driver package with Clean Install checked, and verify thermal sensors.",
        imageUrl: IMAGES.osRecovery
      }
    ],
    imageUrl: IMAGES.osRecovery
  },
  {
    category: "software" as const,
    titleSuffix: "Secure Boot, TPM 2.0 & BitLocker State Restoration",
    descSuffix: "Re-initialize hardware TPM 2.0 security chips, resolve BitLocker recovery loops, and configure UEFI Secure Boot key databases.",
    difficulty: "medium" as const,
    estimatedTime: "20-25 min",
    tools: ["BitLocker 48-digit Recovery Key", "BIOS Security Menu Access"],
    warnings: ["Ensure you have your 48-digit BitLocker key backed up before clearing TPM keys."],
    steps: [
      {
        stepNumber: 1,
        title: "BIOS Security Configuration",
        description: "Enter UEFI BIOS > Security > Intel PTT / AMD fTPM > Enable. Verify Secure Boot is set to Standard mode with factory default keys.",
        imageUrl: IMAGES.biosScreen
      },
      {
        stepNumber: 2,
        title: "Clear TPM / PTT State",
        description: "If system is stuck in an authentication loop, select 'Clear TPM' in BIOS and confirm cryptographic key reset.",
        imageUrl: IMAGES.terminal
      },
      {
        stepNumber: 3,
        title: "Windows Hello & PIN Re-enrollment",
        description: "Enter the BitLocker recovery key once, boot to Windows, and reconfigure your Windows Hello PIN and biometric fingerprint data.",
        imageUrl: IMAGES.osRecovery
      }
    ],
    imageUrl: IMAGES.biosScreen
  },

  // CLEANING
  {
    category: "cleaning" as const,
    titleSuffix: "Thermal Module Deep Clean & Phase-Change Repasting",
    descSuffix: "Dissolve dried factory thermal interface material, clean copper heatsink fins, lubricate cooling fan bearings, and reapply high-performance TIM.",
    difficulty: "medium" as const,
    estimatedTime: "30-45 min",
    tools: ["99% Isopropyl Alcohol", "Microfiber Cloths", "Thermal Paste / PTM7950", "Electric Compressed Air Blower", "Soft Brush"],
    warnings: ["Do not allow fan impellers to free-spin while blasting air.", "Tighten heatsink screws strictly in sequential order (1-2-3-4)."],
    steps: [
      {
        stepNumber: 1,
        title: "Cooler Removal & Fan Extraction",
        description: "Unscrew cooling module retaining screws in reverse order. Gently lift the copper assembly away from the CPU and GPU dies.",
        imageUrl: IMAGES.thermalPaste
      },
      {
        stepNumber: 2,
        title: "Chemical De-greasing & Radiator Fluff Removal",
        description: "Clean old crusty paste using 99% IPA until mirror finish. Blow pressurized air through the exhaust fin channels from the outside in.",
        imageUrl: IMAGES.cleaningBlower
      },
      {
        stepNumber: 3,
        title: "Reapplication & Reseating",
        description: "Apply fresh thermal compound, re-position the heatsink flat against the dies, tighten screws sequentially, and reconnect fan headers.",
        imageUrl: IMAGES.thermalPaste
      }
    ],
    imageUrl: IMAGES.thermalPaste
  },
  {
    category: "cleaning" as const,
    titleSuffix: "Ultrasonic Bath & Liquid Spill Corrosion Decontamination",
    descSuffix: "Rescue water, coffee, or soda damaged motherboards through ultrasonic cleaning in 99% anhydrous alcohol and PCB baking.",
    difficulty: "hard" as const,
    estimatedTime: "90-120 min",
    tools: ["Ultrasonic Cleaner", "99.9% Anhydrous Isopropyl Alcohol", "Soft Bristle ESD Brush", "Drying Oven (50°C)"],
    warnings: ["Never submerge CMOS batteries, mechanical fans, or microphone modules in ultrasonic cleaner."],
    steps: [
      {
        stepNumber: 1,
        title: "Board Disassembly & Pre-wash Inspection",
        description: "Strip all socketed components, heatspreaders, and labels. Inspect under stereo microscope for green copper oxidation and burnt power traces.",
        imageUrl: IMAGES.ultrasonic
      },
      {
        stepNumber: 2,
        title: "Ultrasonic Degreasing Cycle",
        description: "Place motherboard in ultrasonic tank with 99% IPA solution. Run 8-minute sweep frequency cycle at 40kHz to dislodge flux and sugar minerals.",
        imageUrl: IMAGES.ultrasonic
      },
      {
        stepNumber: 3,
        title: "Dehydration & Micro-soldering Inspection",
        description: "Bake PCB in drying oven at 50°C for 2 hours to evaporate internal moisture. Touch up corroded SMD pads with leaded solder and flux.",
        imageUrl: IMAGES.soldering
      }
    ],
    imageUrl: IMAGES.ultrasonic
  },
  {
    category: "cleaning" as const,
    titleSuffix: "Keyboard Deck Crumb Flush & Sticky Key Switch Repair",
    descSuffix: "Dislodge dust debris, flush sticky tactile scissor clips with fast-evaporating contact cleaner, and restore uniform key travel.",
    difficulty: "easy" as const,
    estimatedTime: "20-30 min",
    tools: ["Keycap Puller", "Electronic Contact Cleaner", "Microfiber Swabs", "Precision Spudger"],
    warnings: ["Do not use petroleum-based lubricants (WD-40) on membrane or scissor switches."],
    steps: [
      {
        stepNumber: 1,
        title: "Keycap Extraction & Clip Inspection",
        description: "Gently unlatch top retention tabs of sticky keycaps using a thin plastic spudger, avoiding damage to delicate plastic scissor hinges.",
        imageUrl: IMAGES.cleaningBlower
      },
      {
        stepNumber: 2,
        title: "Switch Degreasing & Solvent Application",
        description: "Apply quick-drying electronic contact cleaner around the rubber dome, depress switch 20 times, and wipe dislodged grime with microfiber swabs.",
        imageUrl: IMAGES.screenTeardown1
      },
      {
        stepNumber: 3,
        title: "Hinge Re-latching & Tactile Testing",
        description: "Snap scissor mechanisms back into chassis anchors, press keycap down firmly until two distinct clicks are heard, and test in key-tester utility.",
        imageUrl: IMAGES.cleaningBlower
      }
    ],
    imageUrl: IMAGES.cleaningBlower
  },
  {
    category: "cleaning" as const,
    titleSuffix: "VRAM & MOSFET Thermal Pad Caliper Sizing & Renewal",
    descSuffix: "Measure exact millimeter gap tolerances (0.5mm, 1.0mm, 1.5mm) and install high thermal conductivity silicone pads on graphics cards and power stages.",
    difficulty: "medium" as const,
    estimatedTime: "30-45 min",
    tools: ["Digital Vernier Caliper", "High-Performance Thermal Pads (12.8 W/mK)", "Precision Cutting Shears", "Alcohol Prep Pads"],
    warnings: ["Using overly thick pads causes poor CPU/GPU core contact, resulting in instantaneous thermal shutdowns."],
    steps: [
      {
        stepNumber: 1,
        title: "Heatsink Dismount & Old Pad Removal",
        description: "Separate heatsink from PCB, peel off compressed OEM thermal pads, and clean oil residue from memory chips using 99% IPA.",
        imageUrl: IMAGES.thermalPaste
      },
      {
        stepNumber: 2,
        title: "Caliper Gap Measurement & Pad Trimming",
        description: "Measure gap between chip packages and copper baseplates with vernier caliper. Cut replacement pads to 1:1 chip dimensions.",
        imageUrl: IMAGES.nvmeSSD
      },
      {
        stepNumber: 3,
        title: "Peel Protective Film & Mount",
        description: "Peel blue plastic backing from both pad faces, press onto VRAM chips, re-mount heatsink, and check core contact spread pattern.",
        imageUrl: IMAGES.thermalPaste
      }
    ],
    imageUrl: IMAGES.thermalPaste
  },

  // UPGRADES
  {
    category: "upgrades" as const,
    titleSuffix: "PCIe 4.0 / 5.0 NVMe SSD Expansion & Sector Cloning",
    descSuffix: "Expand high-speed storage up to 4TB/8TB, attach thermal heatsinks, and clone the OS partition using sector-by-sector cloning.",
    difficulty: "easy" as const,
    estimatedTime: "25-35 min",
    tools: ["Phillips #00 Screwdriver", "M.2 2280 NVMe SSD", "USB NVMe Enclosure", "Cloning Software"],
    warnings: ["Touch a grounded metallic object to discharge static electricity before inserting NVMe card."],
    steps: [
      {
        stepNumber: 1,
        title: "Clone Existing Drive",
        description: "Place the new NVMe SSD in an external USB-C enclosure and clone the active boot drive using sector-by-sector clone software.",
        imageUrl: IMAGES.nvmeSSD
      },
      {
        stepNumber: 2,
        title: "M.2 Slot Installation",
        description: "Insert the NVMe SSD into the motherboard M.2 Key-M slot at a 30-degree angle, press down gently, and tighten the M2x3mm retention screw.",
        imageUrl: IMAGES.nvmeSSD
      },
      {
        stepNumber: 3,
        title: "Verify UEFI Boot Priority & Trim",
        description: "Boot into BIOS, ensure the new drive is set as Primary Boot Option 1, boot into OS, and verify TRIM is enabled.",
        imageUrl: IMAGES.biosScreen
      }
    ],
    imageUrl: IMAGES.nvmeSSD
  },
  {
    category: "upgrades" as const,
    titleSuffix: "DDR4 / DDR5 Dual-Channel High-Speed RAM Upgrade",
    descSuffix: "Maximize system multitasking and memory bandwidth by installing dual-rank matched SODIMM memory modules.",
    difficulty: "easy" as const,
    estimatedTime: "15-20 min",
    tools: ["Plastic Spudger", "Matched DDR5 SODIMM Memory Kit", "Anti-Static Mat"],
    warnings: ["Ensure the laptop is completely powered off and the internal battery disconnected before touching memory slots."],
    steps: [
      {
        stepNumber: 1,
        title: "Remove Memory Shield & Eject Old RAM",
        description: "Prise away EMI metal shielding canopy. Spread the side metal retention clips outward to allow the SODIMM module to pop up at a 45-degree angle.",
        imageUrl: IMAGES.ramModule
      },
      {
        stepNumber: 2,
        title: "Insert New Dual-Rank SODIMM",
        description: "Align module notch with slot key, slide firmly into the socket at 45 degrees, and push flat until retaining clips lock with a tactile click.",
        imageUrl: IMAGES.ramModule
      },
      {
        stepNumber: 3,
        title: "POST Memory Training & MemTest86",
        description: "Power on the system. Allow 30-60 seconds for initial DDR5 memory training, verify full capacity in BIOS, and run diagnostics.",
        imageUrl: IMAGES.biosScreen
      }
    ],
    imageUrl: IMAGES.ramModule
  },
  {
    category: "upgrades" as const,
    titleSuffix: "Wi-Fi 7 / Wi-Fi 6E BE200 M.2 Wireless Module & Antenna Upgrade",
    descSuffix: "Upgrade legacy networking to tri-band 320MHz channel width Wi-Fi 7 with Bluetooth 5.4 for sub-millisecond local network latencies.",
    difficulty: "easy" as const,
    estimatedTime: "15-20 min",
    tools: ["Phillips #00 Screwdriver", "Plastic Spudger / Tweezers", "Wi-Fi 7 M.2 2230 Card"],
    warnings: ["Carefully press micro IPEX MHF4 antenna snaps straight down — never slide sideways to avoid bending connector pins."],
    steps: [
      {
        stepNumber: 1,
        title: "Locate M.2 Key-E Slot",
        description: "Disconnect internal battery and locate the M.2 Key-E 2230 slot beneath shielding or secondary drive bays.",
        imageUrl: IMAGES.screenTeardown1
      },
      {
        stepNumber: 2,
        title: "Antenna Latching (Main & Aux)",
        description: "Snap black (Main) and white/grey (Aux) antenna micro-leads onto the new Wi-Fi card gold pads using fingertips or nylon tweezers.",
        imageUrl: IMAGES.logicBoard
      },
      {
        stepNumber: 3,
        title: "Fasten Standoff & Install OEM Drivers",
        description: "Tighten M2 retention screw, close chassis, boot into OS, and install latest Intel / Qualcomm Wi-Fi 7 package.",
        imageUrl: IMAGES.osRecovery
      }
    ],
    imageUrl: IMAGES.logicBoard
  }
];

const modelTargets = [
  // Apple
  { brand: "Apple", model: "MacBook Pro 16\" M3 Max", type: "laptop" as const },
  { brand: "Apple", model: "MacBook Pro 14\" M3 Pro", type: "laptop" as const },
  { brand: "Apple", model: "MacBook Air 15\" M2 / M3", type: "laptop" as const },
  { brand: "Apple", model: "MacBook Air 13\" M1 Legacy", type: "laptop" as const },
  { brand: "Apple", model: "Mac Studio M2 Ultra", type: "desktop" as const },
  { brand: "Apple", model: "iMac 24\" 4.5K Retina M3", type: "desktop" as const },
  { brand: "Apple", model: "Mac mini M2 Pro", type: "desktop" as const },

  // Dell
  { brand: "Dell", model: "XPS 15 9530", type: "laptop" as const },
  { brand: "Dell", model: "XPS 13 Plus 9320", type: "laptop" as const },
  { brand: "Dell", model: "Latitude 5440 Enterprise", type: "laptop" as const },
  { brand: "Dell", model: "Alienware m16 R2 Gaming", type: "laptop" as const },
  { brand: "Dell", model: "OptiPlex 7010 Micro", type: "desktop" as const },
  { brand: "Dell", model: "OptiPlex 5090 SFF", type: "desktop" as const },
  { brand: "Dell", model: "Alienware Aurora R16", type: "desktop" as const },

  // Lenovo
  { brand: "Lenovo", model: "ThinkPad X1 Carbon Gen 11", type: "laptop" as const },
  { brand: "Lenovo", model: "ThinkPad T14 Gen 4", type: "laptop" as const },
  { brand: "Lenovo", model: "Legion Pro 7i Gen 9", type: "laptop" as const },
  { brand: "Lenovo", model: "Yoga 9i Dual-Screen", type: "laptop" as const },
  { brand: "Lenovo", model: "ThinkCentre M90q Tiny", type: "desktop" as const },
  { brand: "Lenovo", model: "Legion Tower 7i", type: "desktop" as const },

  // HP
  { brand: "HP", model: "Spectre x360 14 (2024)", type: "laptop" as const },
  { brand: "HP", model: "EliteBook 840 G10", type: "laptop" as const },
  { brand: "HP", model: "OMEN Transcend 16", type: "laptop" as const },
  { brand: "HP", model: "OMEN 45L Cryo-Chamber", type: "desktop" as const },
  { brand: "HP", model: "ProDesk 600 G6 SFF", type: "desktop" as const },

  // ASUS
  { brand: "ASUS", model: "ROG Zephyrus G14 (2024)", type: "laptop" as const },
  { brand: "ASUS", model: "ZenBook 14 OLED UX3405", type: "laptop" as const },
  { brand: "ASUS", model: "ROG Strix SCAR 16", type: "laptop" as const },
  { brand: "ASUS", model: "ROG Strix G16CH Desktop", type: "desktop" as const },

  // Acer & MSI & Razer & Microsoft & Framework & Custom
  { brand: "Acer", model: "Predator Helios 16", type: "laptop" as const },
  { brand: "MSI", model: "Stealth 16 AI Studio", type: "laptop" as const },
  { brand: "Razer", model: "Blade 16 Dual-Mode", type: "laptop" as const },
  { brand: "Microsoft", model: "Surface Laptop 5", type: "laptop" as const },
  { brand: "Framework", model: "Framework Laptop 13 / 16 Modular", type: "laptop" as const },
  { brand: "Samsung", model: "Galaxy Book4 Ultra", type: "laptop" as const },
  { brand: "LG", model: "LG Gram 17 Pro", type: "laptop" as const },
  { brand: "Custom Built", model: "Custom Full/Mid ATX Gaming PC", type: "desktop" as const },
  { brand: "Custom Built", model: "Mini-ITX Small Form Factor SFF", type: "desktop" as const }
];

function buildAllGuides(): SeedGuide[] {
  const list: SeedGuide[] = [...curatedRepairGuides];
  for (const target of modelTargets) {
    for (const template of guideTemplates) {
      list.push({
        title: `${target.model}: ${template.titleSuffix}`,
        description: `Dedicated ${template.category} service teardown and step-by-step repair guide for the ${target.brand} ${target.model}. ${template.descSuffix}`,
        deviceType: target.type,
        category: template.category,
        difficulty: template.difficulty,
        estimatedTime: template.estimatedTime,
        toolsRequired: template.tools,
        safetyWarnings: template.warnings,
        steps: template.steps,
        alternativeSolutions: `Reference ${target.brand} technical hardware maintenance manuals or contact certified technicians for warranty support.`,
        imageUrl: template.imageUrl
      });
    }
  }
  return list;
}

export const comprehensiveRepairGuides: SeedGuide[] = buildAllGuides();

export async function seedDatabase() {
  if (!db) {
    console.log("No PostgreSQL database configured. Using in-memory dataset.");
    return;
  }
  try {
    console.log(`Seeding ${comprehensiveRepairGuides.length} comprehensive repair guides into database...`);
    for (const guide of comprehensiveRepairGuides) {
      await db.insert(repairGuides).values({
        ...guide,
        viewCount: guide.viewCount || Math.floor(Math.random() * 1000) + 200,
        downloadCount: guide.downloadCount || Math.floor(Math.random() * 300) + 50,
        isBookmarked: false
      }).onConflictDoNothing();
    }
    console.log("Database seeding finished.");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}
