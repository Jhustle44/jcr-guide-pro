import { db } from "./db";
import { repairGuides, troubleshootingFlows, deviceComponents } from "@shared/schema";

const comprehensiveRepairGuides = [
  // LAPTOP HARDWARE GUIDES
  {
    title: "Replace Laptop RAM Memory",
    description: "Complete guide to upgrading or replacing laptop RAM memory modules for improved performance.",
    deviceType: "laptop",
    category: "hardware",
    difficulty: "easy",
    estimatedTime: "15-20 min",
    toolsRequired: ["Phillips head screwdriver", "Anti-static wrist strap", "Clean cloth"],
    safetyWarnings: [
      "Power off laptop and remove battery before starting",
      "Use anti-static protection to prevent component damage",
      "Handle RAM modules by edges only"
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Prepare the laptop",
        description: "Shut down completely, unplug power, and remove battery if removable",
        imageUrl: "/images/steps/laptop-preparation.svg",
        tips: ["Wait 5 minutes after shutdown to ensure complete power discharge"]
      },
      {
        stepNumber: 2,
        title: "Access RAM compartment",
        description: "Remove the bottom panel screws and locate RAM slots",
        imageUrl: "/images/steps/ram-access.svg",
        tips: ["Keep screws organized to avoid losing them"]
      },
      {
        stepNumber: 3,
        title: "Remove old RAM",
        description: "Gently push side clips and pull module at 45-degree angle",
        imageUrl: "/images/steps/ram-removal.svg",
        tips: ["If resistance is felt, double-check clip positions"]
      },
      {
        stepNumber: 4,
        title: "Install new RAM",
        description: "Insert new module at 45-degree angle and press down until clips engage",
        imageUrl: "/images/steps/ram-installation.svg",
        tips: ["Ensure module is fully seated and both clips are engaged"]
      }
    ],
    alternativeSolutions: "Consider upgrading to higher capacity modules if motherboard supports them",
    imageUrl: "/images/guides/laptop-ram-upgrade.svg"
  },
  {
    title: "Replace Laptop Hard Drive with SSD",
    description: "Step-by-step guide to replace traditional hard drive with faster SSD storage.",
    deviceType: "laptop",
    category: "hardware",
    difficulty: "medium",
    estimatedTime: "45-60 min",
    toolsRequired: ["Phillips head screwdriver", "SATA to USB adapter", "Cloning software", "Anti-static wrist strap"],
    safetyWarnings: [
      "Create data backup before starting procedure",
      "Ensure laptop is completely powered off",
      "Handle storage devices with care to prevent damage"
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Backup existing data",
        description: "Create complete backup of current hard drive using cloning software",
        imageUrl: "/images/steps/data-backup.svg",
        tips: ["Use reliable cloning software like Clonezilla or manufacturer tools"]
      },
      {
        stepNumber: 2,
        title: "Access hard drive bay",
        description: "Remove laptop bottom panel and locate hard drive compartment",
        imageUrl: "/images/steps/hdd-access.svg",
        tips: ["Some laptops have dedicated HDD access panels"]
      },
      {
        stepNumber: 3,
        title: "Remove old hard drive",
        description: "Disconnect SATA connector and remove mounting screws",
        imageUrl: "/images/steps/hdd-removal.svg",
        tips: ["Note orientation of drive for proper SSD installation"]
      },
      {
        stepNumber: 4,
        title: "Install SSD",
        description: "Mount SSD in same position and reconnect SATA connector",
        imageUrl: "/images/steps/ssd-installation.svg",
        tips: ["Ensure secure connection and proper mounting"]
      },
      {
        stepNumber: 5,
        title: "Restore data",
        description: "Boot from cloned drive or restore backup to new SSD",
        imageUrl: "/images/steps/data-restore.svg",
        tips: ["Verify all data transferred correctly before disposing old drive"]
      }
    ],
    alternativeSolutions: "Consider using external drive enclosure for old HDD as additional storage",
    imageUrl: "/images/guides/laptop-ssd-upgrade.svg"
  },
  {
    title: "Fix Laptop Screen Flickering",
    description: "Diagnose and repair common laptop screen flickering issues including cable connections.",
    deviceType: "laptop",
    category: "hardware",
    difficulty: "hard",
    estimatedTime: "60-90 min",
    toolsRequired: ["Phillips head screwdriver", "Plastic prying tools", "Multimeter", "Replacement LVDS cable"],
    safetyWarnings: [
      "LCD panels are fragile - handle with extreme care",
      "Ensure laptop is powered off and battery removed",
      "Be gentle with ribbon cables to prevent tearing"
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Initial diagnosis",
        description: "Test with external monitor to isolate display vs graphics issue",
        imageUrl: "/images/steps/external-monitor-test.svg",
        tips: ["If external display works fine, problem is likely in LCD assembly"]
      },
      {
        stepNumber: 2,
        title: "Access LCD assembly",
        description: "Remove screen bezel and access LCD panel connections",
        imageUrl: "/images/steps/lcd-bezel-removal.svg",
        tips: ["Use plastic tools to avoid scratching bezel"]
      },
      {
        stepNumber: 3,
        title: "Check LVDS cable",
        description: "Inspect and reseat the LVDS cable connection",
        imageUrl: "/images/steps/lvds-cable-check.svg",
        tips: ["Look for pinched, bent, or damaged cable sections"]
      },
      {
        stepNumber: 4,
        title: "Test connections",
        description: "Use multimeter to verify cable continuity if problem persists",
        imageUrl: "/images/steps/cable-continuity-test.svg",
        tips: ["Compare readings with known good cable if available"]
      },
      {
        stepNumber: 5,
        title: "Replace if necessary",
        description: "Install new LVDS cable if old one is damaged",
        imageUrl: "/images/steps/lvds-cable-replacement.svg",
        tips: ["Route new cable exactly as original to prevent future issues"]
      }
    ],
    alternativeSolutions: "If flickering persists, issue may be with LCD panel itself requiring replacement",
    imageUrl: "/images/guides/laptop-screen-repair.svg"
  },
  {
    title: "Replace Laptop Keyboard",
    description: "Complete guide to replacing damaged or non-functioning laptop keyboard.",
    deviceType: "laptop",
    category: "hardware",
    difficulty: "medium",
    estimatedTime: "30-45 min",
    toolsRequired: ["Phillips head screwdriver", "Plastic prying tools", "Replacement keyboard"],
    safetyWarnings: [
      "Power off laptop completely before starting",
      "Be gentle with ribbon cable connectors",
      "Keep track of small screws and clips"
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Remove keyboard screws",
        description: "Locate and remove screws securing keyboard (usually on bottom panel)",
        imageUrl: "/images/steps/keyboard-screws.svg",
        tips: ["Some keyboards have screws under battery compartment"]
      },
      {
        stepNumber: 2,
        title: "Lift keyboard",
        description: "Carefully lift keyboard from top edge and tilt forward",
        imageUrl: "/images/steps/keyboard-lift.svg",
        tips: ["Don't force - some models have additional clips"]
      },
      {
        stepNumber: 3,
        title: "Disconnect ribbon cable",
        description: "Carefully disconnect keyboard ribbon cable connector",
        imageUrl: "/images/steps/keyboard-disconnect.svg",
        tips: ["Note cable orientation for proper reconnection"]
      },
      {
        stepNumber: 4,
        title: "Install new keyboard",
        description: "Connect new keyboard cable and secure in proper position",
        imageUrl: "/images/steps/keyboard-install.svg",
        tips: ["Ensure cable is fully seated before closing connector"]
      }
    ],
    alternativeSolutions: "If only specific keys are problematic, consider individual key cap replacement",
    imageUrl: "/images/guides/laptop-keyboard-replacement.svg"
  },

  // LAPTOP SOFTWARE GUIDES
  {
    title: "Remove Malware and Viruses",
    description: "Comprehensive guide to detecting, removing, and preventing malware infections.",
    deviceType: "laptop",
    category: "software",
    difficulty: "medium",
    estimatedTime: "60-120 min",
    toolsRequired: ["Antivirus software", "Anti-malware scanner", "Recovery media", "Internet connection"],
    safetyWarnings: [
      "Disconnect from internet if actively infected",
      "Backup important data before cleaning",
      "Use reputable security software only"
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Boot into Safe Mode",
        description: "Restart computer and boot into Safe Mode to prevent malware from running",
        imageUrl: "/images/steps/safe-mode-boot.svg",
        tips: ["Press F8 during startup or use advanced startup options"]
      },
      {
        stepNumber: 2,
        title: "Run full system scan",
        description: "Use updated antivirus software to perform complete system scan",
        imageUrl: "/images/steps/antivirus-scan.svg",
        tips: ["Update virus definitions before scanning"]
      },
      {
        stepNumber: 3,
        title: "Use specialized tools",
        description: "Run additional anti-malware tools like Malwarebytes for thorough cleaning",
        imageUrl: "/images/steps/malware-removal.svg",
        tips: ["Use multiple tools as different software detects different threats"]
      },
      {
        stepNumber: 4,
        title: "Clean browser settings",
        description: "Reset browser settings and remove malicious extensions",
        imageUrl: "/images/steps/browser-cleanup.svg",
        tips: ["Check all installed browsers, not just the primary one"]
      },
      {
        stepNumber: 5,
        title: "Update and secure",
        description: "Install all system updates and configure security settings",
        imageUrl: "/images/steps/system-security.svg",
        tips: ["Enable automatic updates and configure firewall"]
      }
    ],
    alternativeSolutions: "For severe infections, consider complete OS reinstallation",
    imageUrl: "/images/guides/malware-removal.svg"
  },
  {
    title: "Fix Blue Screen of Death (BSOD)",
    description: "Troubleshoot and resolve Windows Blue Screen errors with systematic approach.",
    deviceType: "laptop",
    category: "software",
    difficulty: "hard",
    estimatedTime: "45-90 min",
    toolsRequired: ["Windows installation media", "Driver software", "System information tools"],
    safetyWarnings: [
      "Note exact error code before restarting",
      "Backup important data when possible",
      "Avoid repeated forced shutdowns"
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Record error information",
        description: "Note the stop code and any file names mentioned in BSOD",
        imageUrl: "/images/steps/bsod-error-code.svg",
        tips: ["Take photo of screen if error appears quickly"]
      },
      {
        stepNumber: 2,
        title: "Boot into Safe Mode",
        description: "Start computer in Safe Mode to access system for troubleshooting",
        imageUrl: "/images/steps/safe-mode-access.svg",
        tips: ["Use startup repair if Safe Mode won't load"]
      },
      {
        stepNumber: 3,
        title: "Check recent changes",
        description: "Review recently installed software, drivers, or hardware changes",
        imageUrl: "/images/steps/recent-changes-check.svg",
        tips: ["Use System Restore to undo recent changes"]
      },
      {
        stepNumber: 4,
        title: "Update or rollback drivers",
        description: "Update problematic drivers or rollback to previous versions",
        imageUrl: "/images/steps/driver-management.svg",
        tips: ["Focus on display, storage, and network drivers first"]
      },
      {
        stepNumber: 5,
        title: "Check hardware",
        description: "Run memory test and check hard drive for errors",
        imageUrl: "/images/steps/hardware-diagnostics.svg",
        tips: ["Use Windows Memory Diagnostic and chkdsk utility"]
      }
    ],
    alternativeSolutions: "Consider reinstalling Windows if BSOD persists after troubleshooting",
    imageUrl: "/images/guides/bsod-troubleshooting.svg"
  },
  {
    title: "Fix Laptop Won't Boot",
    description: "Systematic troubleshooting for laptops that fail to start or boot properly.",
    deviceType: "laptop",
    category: "software",
    difficulty: "medium",
    estimatedTime: "45-75 min",
    toolsRequired: ["Bootable USB drive", "Windows installation media", "External keyboard"],
    safetyWarnings: [
      "Try simple solutions first before advanced troubleshooting",
      "Have important data backed up before making changes",
      "Note any error messages or beep codes"
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Check power and hardware",
        description: "Verify power adapter, battery, and basic hardware connections",
        imageUrl: "/images/steps/power-check.svg",
        tips: ["Try with just AC adapter, no battery"]
      },
      {
        stepNumber: 2,
        title: "Access BIOS/UEFI",
        description: "Enter system setup to check hardware detection and boot order",
        imageUrl: "/images/steps/bios-access.svg",
        tips: ["Common keys: F2, F12, Del, Esc during startup"]
      },
      {
        stepNumber: 3,
        title: "Try safe boot options",
        description: "Attempt to boot using safe mode or last known good configuration",
        imageUrl: "/images/steps/safe-boot.svg",
        tips: ["Use F8 key during boot for advanced options"]
      },
      {
        stepNumber: 4,
        title: "Run startup repair",
        description: "Use Windows recovery tools to fix boot-related issues",
        imageUrl: "/images/steps/startup-repair.svg",
        tips: ["Boot from Windows installation media if needed"]
      },
      {
        stepNumber: 5,
        title: "Check hard drive",
        description: "Verify hard drive health and file system integrity",
        imageUrl: "/images/steps/hdd-check.svg",
        tips: ["Use command prompt to run chkdsk /f"]
      }
    ],
    alternativeSolutions: "If hardware failure suspected, professional diagnosis recommended",
    imageUrl: "/images/guides/boot-repair.svg"
  },
  {
    title: "Restore Corrupted System Files",
    description: "Use Windows built-in tools to repair corrupted or missing system files.",
    deviceType: "laptop",
    category: "software",
    difficulty: "medium",
    estimatedTime: "60-90 min",
    toolsRequired: ["Administrative access", "Windows installation media", "Internet connection"],
    safetyWarnings: [
      "Create system restore point before starting",
      "Ensure stable power during repair process",
      "Have Windows installation media available"
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Run System File Checker",
        description: "Use SFC command to scan and repair system files",
        imageUrl: "/images/steps/sfc-scan.svg",
        tips: ["Run 'sfc /scannow' in elevated command prompt"]
      },
      {
        stepNumber: 2,
        title: "Use DISM tool",
        description: "Run Deployment Image Servicing tool to repair Windows image",
        imageUrl: "/images/steps/dism-repair.svg",
        tips: ["Use 'DISM /Online /Cleanup-Image /RestoreHealth'"]
      },
      {
        stepNumber: 3,
        title: "Check Windows Update",
        description: "Install latest updates to replace corrupted files",
        imageUrl: "/images/steps/windows-update-repair.svg",
        tips: ["Some corrupted files are fixed by updates"]
      },
      {
        stepNumber: 4,
        title: "Reset Windows components",
        description: "Reset specific Windows components if issues persist",
        imageUrl: "/images/steps/component-reset.svg",
        tips: ["Focus on problematic components like Windows Store"]
      }
    ],
    alternativeSolutions: "Consider in-place Windows upgrade if corruption is extensive",
    imageUrl: "/images/guides/system-file-repair.svg"
  },
  {
    title: "Speed Up Slow Laptop Performance",
    description: "Comprehensive optimization to improve laptop speed and responsiveness.",
    deviceType: "laptop",
    category: "software",
    difficulty: "easy",
    estimatedTime: "45-60 min",
    toolsRequired: ["Disk cleanup tools", "Task Manager access", "Administrative privileges"],
    safetyWarnings: [
      "Create backup before making major changes",
      "Don't disable unknown services",
      "Monitor system stability after changes"
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Check storage space",
        description: "Free up disk space using built-in cleanup tools",
        imageUrl: "/images/steps/storage-cleanup.svg",
        tips: ["Aim for at least 15% free space on system drive"]
      },
      {
        stepNumber: 2,
        title: "Manage startup programs",
        description: "Disable unnecessary programs from starting with Windows",
        imageUrl: "/images/steps/startup-management.svg",
        tips: ["Keep only essential programs in startup"]
      },
      {
        stepNumber: 3,
        title: "Update drivers",
        description: "Install latest drivers for better hardware performance",
        imageUrl: "/images/steps/driver-updates.svg",
        tips: ["Focus on graphics, storage, and network drivers"]
      },
      {
        stepNumber: 4,
        title: "Adjust visual effects",
        description: "Optimize Windows visual effects for performance",
        imageUrl: "/images/steps/visual-optimization.svg",
        tips: ["Choose 'Adjust for best performance' in System Properties"]
      },
      {
        stepNumber: 5,
        title: "Scan for malware",
        description: "Run thorough malware scan to remove performance-affecting threats",
        imageUrl: "/images/steps/performance-scan.svg",
        tips: ["Use multiple scanning tools for best results"]
      }
    ],
    alternativeSolutions: "Consider hardware upgrades if software optimization isn't sufficient",
    imageUrl: "/images/guides/performance-optimization.svg"
  },

  // LAPTOP CLEANING GUIDES
  {
    title: "Deep Clean Laptop Internals",
    description: "Thorough cleaning of laptop internal components to improve cooling and performance.",
    deviceType: "laptop",
    category: "cleaning",
    difficulty: "medium",
    estimatedTime: "60-90 min",
    toolsRequired: ["Compressed air", "Soft brushes", "Isopropyl alcohol", "Cotton swabs", "Thermal paste"],
    safetyWarnings: [
      "Ensure laptop is completely powered off and unplugged",
      "Use only electronics-safe cleaning materials",
      "Allow complete drying before reassembly"
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Disassemble laptop",
        description: "Remove bottom panel and disconnect battery for safety",
        imageUrl: "/images/steps/laptop-disassembly.svg",
        tips: ["Take photos during disassembly for reference during reassembly"]
      },
      {
        stepNumber: 2,
        title: "Clean fans and vents",
        description: "Use compressed air to blow out dust from fans and air vents",
        imageUrl: "/images/steps/fan-cleaning.svg",
        tips: ["Hold fans stationary while blowing air to prevent overspeeding"]
      },
      {
        stepNumber: 3,
        title: "Clean heat sinks",
        description: "Remove accumulated dust from CPU and GPU heat sinks",
        imageUrl: "/images/steps/heatsink-cleaning.svg",
        tips: ["Use soft brush for stubborn dust buildup"]
      },
      {
        stepNumber: 4,
        title: "Replace thermal paste",
        description: "Clean old thermal paste and apply fresh paste to CPU",
        imageUrl: "/images/steps/thermal-paste-replacement.svg",
        tips: ["Use high-quality thermal paste and apply thin, even layer"]
      },
      {
        stepNumber: 5,
        title: "Clean other components",
        description: "Gently clean RAM, storage, and other accessible components",
        imageUrl: "/images/steps/component-cleaning.svg",
        tips: ["Use dry methods only for electronic components"]
      }
    ],
    alternativeSolutions: "For severe overheating, consider professional cleaning service",
    imageUrl: "/images/guides/laptop-deep-cleaning.svg"
  },
  {
    title: "Clean Laptop Screen and Exterior",
    description: "Safely clean laptop screen, keyboard, and exterior surfaces without damage.",
    deviceType: "laptop",
    category: "cleaning",
    difficulty: "easy",
    estimatedTime: "15-30 min",
    toolsRequired: ["Microfiber cloths", "Screen cleaner", "Isopropyl alcohol", "Cotton swabs", "Compressed air"],
    safetyWarnings: [
      "Power off laptop before cleaning",
      "Never spray liquids directly on screen",
      "Use only LCD-safe cleaning solutions"
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Prepare cleaning area",
        description: "Power off laptop and gather appropriate cleaning materials",
        imageUrl: "/images/steps/cleaning-prep.svg",
        tips: ["Let laptop cool down if it was recently used"]
      },
      {
        stepNumber: 2,
        title: "Clean keyboard",
        description: "Use compressed air and damp cloth to clean keys and spaces",
        imageUrl: "/images/steps/keyboard-cleaning.svg",
        tips: ["Turn laptop upside down and shake gently to remove debris"]
      },
      {
        stepNumber: 3,
        title: "Clean screen",
        description: "Use microfiber cloth with screen cleaner in circular motions",
        imageUrl: "/images/steps/screen-cleaning.svg",
        tips: ["Start from center and work outward, avoid excessive pressure"]
      },
      {
        stepNumber: 4,
        title: "Clean exterior",
        description: "Wipe down laptop exterior, ports, and ventilation areas",
        imageUrl: "/images/steps/exterior-cleaning.svg",
        tips: ["Use cotton swabs for hard-to-reach port areas"]
      }
    ],
    alternativeSolutions: "For stubborn stains, consider professional cleaning services",
    imageUrl: "/images/guides/laptop-screen-cleaning.svg"
  },
  {
    title: "Remove Liquid Spill Damage",
    description: "Emergency cleaning procedures for laptops with liquid spill damage.",
    deviceType: "laptop",
    category: "cleaning",
    difficulty: "hard",
    estimatedTime: "120-180 min",
    toolsRequired: ["Isopropyl alcohol", "Soft brushes", "Cotton swabs", "Distilled water", "Hair dryer"],
    safetyWarnings: [
      "Immediately power off and unplug laptop",
      "Remove battery if possible",
      "Work in well-ventilated area when using alcohol"
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Emergency shutdown",
        description: "Immediately turn off laptop and remove all power sources",
        imageUrl: "/images/steps/emergency-shutdown.svg",
        tips: ["Speed is critical - don't wait for proper shutdown"]
      },
      {
        stepNumber: 2,
        title: "Disassemble laptop",
        description: "Remove back panel, battery, and affected components",
        imageUrl: "/images/steps/spill-disassembly.svg",
        tips: ["Take photos to remember component placement"]
      },
      {
        stepNumber: 3,
        title: "Clean affected areas",
        description: "Use isopropyl alcohol to clean corrosion and residue",
        imageUrl: "/images/steps/corrosion-cleaning.svg",
        tips: ["Use 99% isopropyl alcohol for best results"]
      },
      {
        stepNumber: 4,
        title: "Dry thoroughly",
        description: "Ensure all components are completely dry before reassembly",
        imageUrl: "/images/steps/component-drying.svg",
        tips: ["Allow 24-48 hours drying time in dry environment"]
      },
      {
        stepNumber: 5,
        title: "Test components",
        description: "Reassemble and test each component before full assembly",
        imageUrl: "/images/steps/component-testing.svg",
        tips: ["Test with minimal components first"]
      }
    ],
    alternativeSolutions: "Severe damage may require professional data recovery services",
    imageUrl: "/images/guides/liquid-damage-repair.svg"
  },

  // DESKTOP HARDWARE GUIDES
  {
    title: "Build Custom Desktop PC",
    description: "Complete guide to building a desktop computer from individual components.",
    deviceType: "desktop",
    category: "hardware",
    difficulty: "hard",
    estimatedTime: "120-180 min",
    toolsRequired: ["Phillips head screwdriver", "Anti-static wrist strap", "Zip ties", "Thermal paste"],
    safetyWarnings: [
      "Use anti-static protection throughout build process",
      "Ensure PSU is switched off and unplugged",
      "Handle components by edges and avoid touching circuits"
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Prepare motherboard",
        description: "Install CPU, RAM, and M.2 storage on motherboard outside of case",
        imageUrl: "/images/steps/motherboard-preparation.svg",
        tips: ["Install components on flat, anti-static surface"]
      },
      {
        stepNumber: 2,
        title: "Install PSU and I/O shield",
        description: "Mount power supply and install motherboard I/O shield in case",
        imageUrl: "/images/steps/psu-io-installation.svg",
        tips: ["Orient PSU fan correctly based on case ventilation"]
      },
      {
        stepNumber: 3,
        title: "Mount motherboard",
        description: "Secure motherboard in case using proper standoffs",
        imageUrl: "/images/steps/motherboard-mounting.svg",
        tips: ["Don't overtighten screws - snug fit is sufficient"]
      },
      {
        stepNumber: 4,
        title: "Install graphics card",
        description: "Secure GPU in PCIe slot and connect power connectors",
        imageUrl: "/images/steps/gpu-installation.svg",
        tips: ["Ensure card is fully seated and rear bracket is secured"]
      },
      {
        stepNumber: 5,
        title: "Connect all cables",
        description: "Connect power, data, and front panel connectors",
        imageUrl: "/images/steps/cable-connections.svg",
        tips: ["Refer to motherboard manual for front panel connector layout"]
      },
      {
        stepNumber: 6,
        title: "First boot test",
        description: "Power on system and verify all components are detected",
        imageUrl: "/images/steps/first-boot-test.svg",
        tips: ["Enter BIOS to verify CPU, RAM, and storage are detected"]
      }
    ],
    alternativeSolutions: "Consider pre-built systems if building seems too complex",
    imageUrl: "/images/guides/desktop-pc-build.svg"
  },
  {
    title: "Upgrade Desktop Graphics Card",
    description: "Step-by-step guide to replacing or upgrading desktop GPU for better performance.",
    deviceType: "desktop",
    category: "hardware",
    difficulty: "medium",
    estimatedTime: "30-45 min",
    toolsRequired: ["Phillips head screwdriver", "Anti-static wrist strap"],
    safetyWarnings: [
      "Power off PC and unplug from wall before starting",
      "Ensure new GPU is compatible with PSU wattage",
      "Check physical clearance in case"
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Uninstall old drivers",
        description: "Use DDU (Display Driver Uninstaller) to remove existing graphics drivers",
        imageUrl: "/images/steps/driver-uninstall.svg",
        tips: ["Boot into safe mode for thorough driver removal"]
      },
      {
        stepNumber: 2,
        title: "Remove old GPU",
        description: "Disconnect power cables and unscrew rear bracket, then remove from PCIe slot",
        imageUrl: "/images/steps/gpu-removal.svg",
        tips: ["Press PCIe release tab while gently pulling card"]
      },
      {
        stepNumber: 3,
        title: "Install new GPU",
        description: "Insert new graphics card into PCIe slot and secure with screws",
        imageUrl: "/images/steps/new-gpu-install.svg",
        tips: ["Ensure card clicks securely into slot"]
      },
      {
        stepNumber: 4,
        title: "Connect power",
        description: "Attach required PCIe power connectors from PSU to graphics card",
        imageUrl: "/images/steps/gpu-power-connection.svg",
        tips: ["Use separate cables for each connector if possible"]
      },
      {
        stepNumber: 5,
        title: "Install new drivers",
        description: "Download and install latest drivers from manufacturer",
        imageUrl: "/images/steps/new-driver-install.svg",
        tips: ["Use manufacturer's official website for drivers"]
      }
    ],
    alternativeSolutions: "If performance issues persist, consider CPU or PSU bottlenecks",
    imageUrl: "/images/guides/desktop-gpu-upgrade.svg"
  },

  // DESKTOP SOFTWARE GUIDES
  {
    title: "Optimize Windows 11 Performance",
    description: "Comprehensive guide to optimize Windows 11 for better speed and responsiveness.",
    deviceType: "desktop",
    category: "software",
    difficulty: "easy",
    estimatedTime: "45-60 min",
    toolsRequired: ["Administrative access", "Disk cleanup tools"],
    safetyWarnings: [
      "Create system restore point before making changes",
      "Only disable services you understand",
      "Backup important data before major changes"
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Update Windows",
        description: "Install all available Windows updates and driver updates",
        imageUrl: "/images/steps/windows-update.svg",
        tips: ["Restart between major updates for best results"]
      },
      {
        stepNumber: 2,
        title: "Clean disk space",
        description: "Use Disk Cleanup and Storage Sense to remove unnecessary files",
        imageUrl: "/images/steps/disk-cleanup.svg",
        tips: ["Clean system files and temporary folders"]
      },
      {
        stepNumber: 3,
        title: "Disable startup programs",
        description: "Turn off unnecessary programs that start with Windows",
        imageUrl: "/images/steps/startup-programs.svg",
        tips: ["Keep only essential programs for faster boot times"]
      },
      {
        stepNumber: 4,
        title: "Adjust visual effects",
        description: "Optimize visual effects for performance over appearance",
        imageUrl: "/images/steps/visual-effects.svg",
        tips: ["Custom settings allow fine-tuning of specific effects"]
      },
      {
        stepNumber: 5,
        title: "Configure power settings",
        description: "Set power plan to High Performance for desktop PCs",
        imageUrl: "/images/steps/power-settings.svg",
        tips: ["Balanced mode is fine for most users"]
      }
    ],
    alternativeSolutions: "Consider SSD upgrade if system is still slow after optimization",
    imageUrl: "/images/guides/windows-optimization.svg"
  },

  // DESKTOP CLEANING GUIDES
  {
    title: "Clean Desktop PC Case and Components",
    description: "Thorough cleaning guide for desktop PC case, fans, and internal components.",
    deviceType: "desktop",
    category: "cleaning",
    difficulty: "easy",
    estimatedTime: "45-60 min",
    toolsRequired: ["Compressed air", "Soft brushes", "Microfiber cloths", "Isopropyl alcohol"],
    safetyWarnings: [
      "Power off and unplug PC before cleaning",
      "Ground yourself to prevent static discharge",
      "Allow complete drying before powering on"
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Remove side panels",
        description: "Open PC case by removing side panels for access to components",
        imageUrl: "/images/steps/case-opening.svg",
        tips: ["Some cases have thumbscrews, others require tools"]
      },
      {
        stepNumber: 2,
        title: "Clean case fans",
        description: "Use compressed air to blow dust from all case fans",
        imageUrl: "/images/steps/fan-dust-removal.svg",
        tips: ["Hold fan blades stationary while blowing air"]
      },
      {
        stepNumber: 3,
        title: "Clean dust filters",
        description: "Remove and wash dust filters in warm, soapy water",
        imageUrl: "/images/steps/filter-cleaning.svg",
        tips: ["Let filters dry completely before reinstalling"]
      },
      {
        stepNumber: 4,
        title: "Clean components",
        description: "Gently clean GPU, RAM, and other visible components",
        imageUrl: "/images/steps/component-dusting.svg",
        tips: ["Use soft brush for delicate components"]
      },
      {
        stepNumber: 5,
        title: "Clean case exterior",
        description: "Wipe down case exterior and ports with damp cloth",
        imageUrl: "/images/steps/case-exterior-clean.svg",
        tips: ["Use isopropyl alcohol for stubborn stains"]
      }
    ],
    alternativeSolutions: "Consider positive pressure case setup to reduce dust accumulation",
    imageUrl: "/images/guides/desktop-cleaning.svg"
  },
  {
    title: "Deep Clean Gaming PC Setup",
    description: "Comprehensive cleaning for gaming PCs including peripherals and cable management.",
    deviceType: "desktop",
    category: "cleaning",
    difficulty: "medium",
    estimatedTime: "90-120 min",
    toolsRequired: ["Compressed air", "Cable management tools", "Cleaning solutions", "Soft brushes"],
    safetyWarnings: [
      "Disconnect all power before starting",
      "Take photos of cable arrangements before disconnecting",
      "Use appropriate cleaning solutions for different materials"
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Document current setup",
        description: "Take photos of cable arrangements and component placement",
        imageUrl: "/images/steps/setup-documentation.svg",
        tips: ["This helps with reassembly and troubleshooting"]
      },
      {
        stepNumber: 2,
        title: "Remove components",
        description: "Carefully remove GPU, RAM, and other accessible components",
        imageUrl: "/images/steps/component-removal.svg",
        tips: ["Only remove components you're comfortable reinstalling"]
      },
      {
        stepNumber: 3,
        title: "Deep clean case",
        description: "Thoroughly clean case interior, fans, and all surfaces",
        imageUrl: "/images/steps/deep-case-cleaning.svg",
        tips: ["Pay attention to hard-to-reach areas behind motherboard"]
      },
      {
        stepNumber: 4,
        title: "Clean and reorganize cables",
        description: "Clean cables and improve cable management layout",
        imageUrl: "/images/steps/cable-management.svg",
        tips: ["Use velcro ties and routing holes for clean appearance"]
      },
      {
        stepNumber: 5,
        title: "Clean peripherals",
        description: "Clean keyboard, mouse, monitor, and other accessories",
        imageUrl: "/images/steps/peripheral-cleaning.svg",
        tips: ["Remove keycaps for thorough keyboard cleaning"]
      },
      {
        stepNumber: 6,
        title: "Reassemble and test",
        description: "Reinstall components and verify system functionality",
        imageUrl: "/images/steps/system-reassembly.svg",
        tips: ["Test each component as you reinstall it"]
      }
    ],
    alternativeSolutions: "Professional cleaning services available for complex builds",
    imageUrl: "/images/guides/gaming-pc-deep-clean.svg"
  },
  {
    title: "Clean and Maintain Water Cooling Loop",
    description: "Maintenance guide for custom water cooling systems including cleaning and fluid replacement.",
    deviceType: "desktop",
    category: "cleaning",
    difficulty: "hard",
    estimatedTime: "180-240 min",
    toolsRequired: ["Distilled water", "Coolant", "Soft tubing brush", "Fittings", "Towels"],
    safetyWarnings: [
      "Completely drain system before disassembly",
      "Use only appropriate coolants and cleaning solutions",
      "Check for leaks thoroughly before powering on"
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Drain cooling system",
        description: "Safely drain all coolant from the water cooling loop",
        imageUrl: "/images/steps/loop-draining.svg",
        tips: ["Use drain valve or remove lowest fitting to empty system"]
      },
      {
        stepNumber: 2,
        title: "Disassemble loop",
        description: "Carefully disconnect fittings and remove components",
        imageUrl: "/images/steps/loop-disassembly.svg",
        tips: ["Label connections and take photos for reference"]
      },
      {
        stepNumber: 3,
        title: "Clean radiators",
        description: "Flush radiators with distilled water and cleaning solution",
        imageUrl: "/images/steps/radiator-cleaning.svg",
        tips: ["Reverse flush direction multiple times for best results"]
      },
      {
        stepNumber: 4,
        title: "Clean water blocks",
        description: "Disassemble and clean CPU and GPU water blocks",
        imageUrl: "/images/steps/waterblock-cleaning.svg",
        tips: ["Use soft brush to remove buildup from micro-fins"]
      },
      {
        stepNumber: 5,
        title: "Replace tubing and fittings",
        description: "Install new soft tubing and check all fittings",
        imageUrl: "/images/steps/tubing-replacement.svg",
        tips: ["Replace tubing annually for best performance"]
      },
      {
        stepNumber: 6,
        title: "Refill and test",
        description: "Refill system with fresh coolant and test for leaks",
        imageUrl: "/images/steps/loop-refilling.svg",
        tips: ["Run pump without power to components during initial fill"]
      }
    ],
    alternativeSolutions: "Consider AIO coolers if custom loop maintenance is too complex",
    imageUrl: "/images/guides/watercooling-maintenance.svg"
  },

  // UPGRADE GUIDES FOR BOTH TYPES
  {
    title: "Upgrade to Windows 11",
    description: "Complete guide to upgrading from Windows 10 to Windows 11 safely.",
    deviceType: "laptop",
    category: "upgrades",
    difficulty: "medium",
    estimatedTime: "90-120 min",
    toolsRequired: ["Reliable internet connection", "8GB+ USB drive", "Windows 11 installation media"],
    safetyWarnings: [
      "Backup all important data before upgrading",
      "Ensure hardware meets Windows 11 requirements",
      "Have recovery media ready in case of issues"
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Check compatibility",
        description: "Run PC Health Check tool to verify Windows 11 compatibility",
        imageUrl: "/images/steps/compatibility-check.svg",
        tips: ["Enable TPM 2.0 and Secure Boot if required"]
      },
      {
        stepNumber: 2,
        title: "Backup data",
        description: "Create complete backup of important files and system",
        imageUrl: "/images/steps/data-backup-upgrade.svg",
        tips: ["Use Windows backup tool or third-party solution"]
      },
      {
        stepNumber: 3,
        title: "Update drivers",
        description: "Install latest drivers and Windows updates before upgrading",
        imageUrl: "/images/steps/pre-upgrade-updates.svg",
        tips: ["Focus on critical drivers like graphics and storage"]
      },
      {
        stepNumber: 4,
        title: "Start upgrade",
        description: "Run Windows 11 installation or use Windows Update",
        imageUrl: "/images/steps/windows11-upgrade.svg",
        tips: ["Choose to keep files and apps during upgrade"]
      },
      {
        stepNumber: 5,
        title: "Post-upgrade setup",
        description: "Configure Windows 11 settings and verify all programs work",
        imageUrl: "/images/steps/post-upgrade-setup.svg",
        tips: ["Check Device Manager for any driver issues"]
      }
    ],
    alternativeSolutions: "Consider clean installation if upgrade causes issues",
    imageUrl: "/images/guides/windows11-upgrade.svg"
  },
  {
    title: "Upgrade Laptop to SSD Storage",
    description: "Complete guide to upgrading from HDD to SSD for dramatic performance improvement.",
    deviceType: "laptop",
    category: "upgrades",
    difficulty: "medium",
    estimatedTime: "90-120 min",
    toolsRequired: ["SSD drive", "SATA to USB adapter", "Cloning software", "Phillips screwdriver"],
    safetyWarnings: [
      "Backup all data before starting upgrade",
      "Ensure SSD is compatible with laptop interface",
      "Handle storage devices carefully to prevent damage"
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Choose right SSD",
        description: "Select appropriate SSD size and interface for your laptop",
        imageUrl: "/images/steps/ssd-selection.svg",
        tips: ["Check current drive interface - SATA, M.2, or NVMe"]
      },
      {
        stepNumber: 2,
        title: "Clone existing drive",
        description: "Use cloning software to copy all data to new SSD",
        imageUrl: "/images/steps/drive-cloning.svg",
        tips: ["Use manufacturer cloning tools when available"]
      },
      {
        stepNumber: 3,
        title: "Install SSD",
        description: "Replace old drive with new SSD in laptop",
        imageUrl: "/images/steps/ssd-physical-install.svg",
        tips: ["Note cable orientation and mounting screw locations"]
      },
      {
        stepNumber: 4,
        title: "First boot test",
        description: "Boot from new SSD and verify system functionality",
        imageUrl: "/images/steps/ssd-first-boot.svg",
        tips: ["Check that all programs and files are accessible"]
      },
      {
        stepNumber: 5,
        title: "Optimize SSD settings",
        description: "Configure Windows settings for optimal SSD performance",
        imageUrl: "/images/steps/ssd-optimization.svg",
        tips: ["Enable TRIM, disable defragmentation for SSD"]
      }
    ],
    alternativeSolutions: "Keep old HDD as external storage using USB enclosure",
    imageUrl: "/images/guides/ssd-upgrade.svg"
  },
  {
    title: "Upgrade Laptop RAM Memory",
    description: "Step-by-step guide to increasing laptop memory for better multitasking performance.",
    deviceType: "laptop",
    category: "upgrades",
    difficulty: "easy",
    estimatedTime: "30-45 min",
    toolsRequired: ["Compatible RAM modules", "Phillips screwdriver", "Anti-static wrist strap"],
    safetyWarnings: [
      "Check maximum RAM capacity and speed supported",
      "Use anti-static protection when handling memory",
      "Power off laptop completely before installation"
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Check current RAM",
        description: "Identify current memory configuration and available slots",
        imageUrl: "/images/steps/ram-identification.svg",
        tips: ["Use System Information or CPU-Z to check current setup"]
      },
      {
        stepNumber: 2,
        title: "Purchase compatible RAM",
        description: "Buy memory modules matching laptop specifications",
        imageUrl: "/images/steps/ram-purchasing.svg",
        tips: ["Match speed, voltage, and form factor of existing RAM"]
      },
      {
        stepNumber: 3,
        title: "Install new memory",
        description: "Add or replace memory modules in laptop",
        imageUrl: "/images/steps/ram-physical-install.svg",
        tips: ["Insert at 45-degree angle and press down until clips engage"]
      },
      {
        stepNumber: 4,
        title: "Verify installation",
        description: "Boot laptop and confirm new memory is recognized",
        imageUrl: "/images/steps/ram-verification.svg",
        tips: ["Check System Properties to confirm total memory"]
      }
    ],
    alternativeSolutions: "Consider external storage if internal upgrades aren't possible",
    imageUrl: "/images/guides/ram-upgrade.svg"
  },
  {
    title: "Upgrade to Dual Monitor Setup",
    description: "Set up external monitor with laptop for improved productivity.",
    deviceType: "laptop",
    category: "upgrades",
    difficulty: "easy",
    estimatedTime: "20-30 min",
    toolsRequired: ["External monitor", "Video cable", "Docking station (optional)"],
    safetyWarnings: [
      "Check laptop video output compatibility",
      "Ensure monitor resolution is supported",
      "Use appropriate cables for best quality"
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Choose monitor and cable",
        description: "Select compatible monitor and connection type",
        imageUrl: "/images/steps/monitor-selection.svg",
        tips: ["HDMI, USB-C, or DisplayPort are common options"]
      },
      {
        stepNumber: 2,
        title: "Connect physical cables",
        description: "Connect monitor to laptop using appropriate cable",
        imageUrl: "/images/steps/monitor-connection.svg",
        tips: ["Ensure secure connections on both ends"]
      },
      {
        stepNumber: 3,
        title: "Configure display settings",
        description: "Set up display arrangement and resolution in Windows",
        imageUrl: "/images/steps/display-configuration.svg",
        tips: ["Use Windows + P for quick display mode selection"]
      },
      {
        stepNumber: 4,
        title: "Optimize workspace",
        description: "Arrange windows and set up taskbar for dual monitor use",
        imageUrl: "/images/steps/workspace-optimization.svg",
        tips: ["Consider using virtual desktops for better organization"]
      }
    ],
    alternativeSolutions: "Wireless display adapters available for cable-free setups",
    imageUrl: "/images/guides/dual-monitor-setup.svg"
  },
  {
    title: "Upgrade Desktop Graphics Card",
    description: "Complete guide to installing a new graphics card for gaming and professional work.",
    deviceType: "desktop",
    category: "upgrades",
    difficulty: "medium",
    estimatedTime: "45-60 min",
    toolsRequired: ["New graphics card", "Phillips screwdriver", "PCIe power cables"],
    safetyWarnings: [
      "Check PSU wattage requirements for new card",
      "Verify physical clearance in case",
      "Uninstall old drivers before hardware change"
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Choose compatible GPU",
        description: "Select graphics card compatible with motherboard and PSU",
        imageUrl: "/images/steps/gpu-selection.svg",
        tips: ["Check PCIe slot version and power requirements"]
      },
      {
        stepNumber: 2,
        title: "Prepare system",
        description: "Uninstall old graphics drivers and power down system",
        imageUrl: "/images/steps/gpu-preparation.svg",
        tips: ["Use DDU (Display Driver Uninstaller) for clean removal"]
      },
      {
        stepNumber: 3,
        title: "Install new card",
        description: "Mount graphics card in PCIe slot and connect power",
        imageUrl: "/images/steps/gpu-installation-desktop.svg",
        tips: ["Press firmly until card clicks into place"]
      },
      {
        stepNumber: 4,
        title: "Install new drivers",
        description: "Download and install latest drivers from manufacturer",
        imageUrl: "/images/steps/gpu-driver-install.svg",
        tips: ["Get drivers from NVIDIA, AMD, or Intel websites"]
      },
      {
        stepNumber: 5,
        title: "Test performance",
        description: "Run benchmarks and games to verify proper installation",
        imageUrl: "/images/steps/gpu-testing.svg",
        tips: ["Monitor temperatures during stress testing"]
      }
    ],
    alternativeSolutions: "Consider external GPU enclosures for laptops",
    imageUrl: "/images/guides/gpu-upgrade-desktop.svg"
  },
  {
    title: "Upgrade to NVMe M.2 SSD",
    description: "Install ultra-fast NVMe M.2 SSD for maximum storage performance.",
    deviceType: "desktop",
    category: "upgrades",
    difficulty: "easy",
    estimatedTime: "20-30 min",
    toolsRequired: ["NVMe M.2 SSD", "Small screwdriver", "Thermal pad (optional)"],
    safetyWarnings: [
      "Check motherboard M.2 slot compatibility",
      "Handle SSD carefully - avoid touching contacts",
      "Some slots may disable SATA ports when used"
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Locate M.2 slot",
        description: "Find available M.2 slot on motherboard",
        imageUrl: "/images/steps/m2-slot-location.svg",
        tips: ["Check motherboard manual for slot specifications"]
      },
      {
        stepNumber: 2,
        title: "Install SSD",
        description: "Insert M.2 SSD at 30-degree angle and secure with screw",
        imageUrl: "/images/steps/m2-installation.svg",
        tips: ["Don't force insertion - SSD should slide in easily"]
      },
      {
        stepNumber: 3,
        title: "Configure in BIOS",
        description: "Enable M.2 slot and set boot priority if needed",
        imageUrl: "/images/steps/m2-bios-config.svg",
        tips: ["Some motherboards require enabling M.2 in BIOS"]
      },
      {
        stepNumber: 4,
        title: "Initialize drive",
        description: "Format and partition new SSD in Windows Disk Management",
        imageUrl: "/images/steps/m2-initialization.svg",
        tips: ["Choose GPT partition style for drives over 2TB"]
      }
    ],
    alternativeSolutions: "PCIe to M.2 adapters available for older motherboards",
    imageUrl: "/images/guides/nvme-upgrade.svg"
  }
];

const comprehensiveTroubleshootingFlows = [
  {
    title: "Computer Won't Turn On",
    description: "Systematic troubleshooting for computers that won't power on",
    deviceType: "both",
    category: "hardware",
    difficulty: "medium",
    symptoms: ["No power", "No lights", "No fan noise", "Dead system"],
    steps: [
      {
        stepNumber: 1,
        title: "Check power source",
        description: "Verify power outlet and cable connections",
        possibleCauses: ["Faulty outlet", "Loose power cable", "Bad power adapter"],
        solutions: ["Test outlet with another device", "Reseat all power connections", "Try different power adapter"]
      },
      {
        stepNumber: 2,
        title: "Check battery (laptops)",
        description: "Test if battery is completely drained or faulty",
        possibleCauses: ["Dead battery", "Faulty battery", "Charging port issues"],
        solutions: ["Charge for 30+ minutes", "Try with adapter only", "Check charging port for damage"]
      },
      {
        stepNumber: 3,
        title: "Hardware reset",
        description: "Perform hard reset to clear any power issues",
        possibleCauses: ["Power state corruption", "Static buildup"],
        solutions: ["Hold power button 30+ seconds", "Remove battery and hold power", "Reseat RAM modules"]
      }
    ]
  },
  {
    title: "Slow Computer Performance",
    description: "Diagnose and fix slow computer performance issues",
    deviceType: "both",
    category: "software",
    difficulty: "easy",
    symptoms: ["Slow startup", "Programs lag", "General slowness", "Long loading times"],
    steps: [
      {
        stepNumber: 1,
        title: "Check available storage",
        description: "Verify sufficient free disk space",
        possibleCauses: ["Full hard drive", "Fragmented disk", "Too many files"],
        solutions: ["Delete unnecessary files", "Use Disk Cleanup", "Move files to external storage"]
      },
      {
        stepNumber: 2,
        title: "Review startup programs",
        description: "Check for too many programs starting with system",
        possibleCauses: ["Too many startup programs", "Resource-heavy software"],
        solutions: ["Disable unnecessary startup programs", "Uninstall unused software", "Use Task Manager"]
      },
      {
        stepNumber: 3,
        title: "Scan for malware",
        description: "Check for viruses and malware affecting performance",
        possibleCauses: ["Virus infection", "Malware", "Adware"],
        solutions: ["Run full antivirus scan", "Use anti-malware tools", "Update security software"]
      }
    ]
  },
  {
    title: "Internet Connection Problems",
    description: "Troubleshoot network and internet connectivity issues",
    deviceType: "both",
    category: "software",
    difficulty: "easy",
    symptoms: ["No internet", "Slow internet", "Intermittent connection", "Can't connect to Wi-Fi"],
    steps: [
      {
        stepNumber: 1,
        title: "Check physical connections",
        description: "Verify all cables and wireless connections",
        possibleCauses: ["Loose cables", "Disabled Wi-Fi", "Router issues"],
        solutions: ["Check Ethernet cables", "Ensure Wi-Fi is enabled", "Restart router/modem"]
      },
      {
        stepNumber: 2,
        title: "Reset network settings",
        description: "Reset network adapters and configurations",
        possibleCauses: ["Corrupted network settings", "Wrong IP configuration"],
        solutions: ["Run network troubleshooter", "Reset TCP/IP stack", "Flush DNS cache"]
      },
      {
        stepNumber: 3,
        title: "Update network drivers",
        description: "Ensure network drivers are current",
        possibleCauses: ["Outdated drivers", "Corrupted drivers"],
        solutions: ["Update network adapter drivers", "Reinstall network drivers", "Use manufacturer drivers"]
      }
    ]
  }
];

const comprehensiveDeviceComponents = [
  // Laptop Components
  {
    name: "Laptop CPU",
    description: "Central Processing Unit - the main processor of the laptop",
    deviceType: "laptop",
    componentType: "processor",
    commonIssues: ["Overheating", "Performance degradation", "Complete failure"],
    replacementDifficulty: "hard",
    averageCost: "$200-800",
    toolsRequired: ["Advanced tools", "Thermal paste", "Heat gun"],
    imageUrl: "/images/components/laptop-cpu.svg"
  },
  {
    name: "Laptop RAM",
    description: "Random Access Memory modules for temporary data storage",
    deviceType: "laptop",
    componentType: "memory",
    commonIssues: ["System crashes", "Memory errors", "Slow performance"],
    replacementDifficulty: "easy",
    averageCost: "$50-200",
    toolsRequired: ["Phillips screwdriver", "Anti-static wrist strap"],
    imageUrl: "/images/components/laptop-ram.svg"
  },
  {
    name: "Laptop Battery",
    description: "Rechargeable battery providing portable power",
    deviceType: "laptop",
    componentType: "power",
    commonIssues: ["Won't hold charge", "Swollen battery", "Not charging"],
    replacementDifficulty: "easy",
    averageCost: "$50-150",
    toolsRequired: ["Phillips screwdriver"],
    imageUrl: "/images/components/laptop-battery.svg"
  },
  {
    name: "Laptop Hard Drive",
    description: "Storage device for operating system and user data",
    deviceType: "laptop",
    componentType: "storage",
    commonIssues: ["Clicking sounds", "Slow performance", "Boot failures"],
    replacementDifficulty: "medium",
    averageCost: "$50-300",
    toolsRequired: ["Phillips screwdriver", "SATA cable"],
    imageUrl: "/images/components/laptop-hdd.svg"
  },
  {
    name: "Laptop Screen",
    description: "LCD or LED display panel",
    deviceType: "laptop",
    componentType: "display",
    commonIssues: ["Cracked screen", "Dead pixels", "Flickering", "No display"],
    replacementDifficulty: "hard",
    averageCost: "$100-400",
    toolsRequired: ["Phillips screwdriver", "Plastic prying tools"],
    imageUrl: "/images/components/laptop-screen.svg"
  },
  {
    name: "Laptop Keyboard",
    description: "Input device for typing and system control",
    deviceType: "laptop",
    componentType: "input",
    commonIssues: ["Stuck keys", "Non-responsive keys", "Liquid damage"],
    replacementDifficulty: "medium",
    averageCost: "$30-100",
    toolsRequired: ["Phillips screwdriver", "Plastic tools"],
    imageUrl: "/images/components/laptop-keyboard.svg"
  },
  {
    name: "Laptop Trackpad",
    description: "Touch-sensitive pointing device",
    deviceType: "laptop",
    componentType: "input",
    commonIssues: ["Erratic cursor movement", "Non-responsive", "Clicking issues"],
    replacementDifficulty: "medium",
    averageCost: "$25-75",
    toolsRequired: ["Phillips screwdriver", "Ribbon cable tools"],
    imageUrl: "/images/components/laptop-trackpad.svg"
  },
  {
    name: "Laptop Wi-Fi Card",
    description: "Wireless network adapter for internet connectivity",
    deviceType: "laptop",
    componentType: "networking",
    commonIssues: ["No Wi-Fi detected", "Slow speeds", "Frequent disconnections"],
    replacementDifficulty: "easy",
    averageCost: "$20-60",
    toolsRequired: ["Phillips screwdriver"],
    imageUrl: "/images/components/laptop-wifi.svg"
  },

  // Desktop Components
  {
    name: "Desktop CPU",
    description: "Central Processing Unit for desktop computers",
    deviceType: "desktop",
    componentType: "processor",
    commonIssues: ["Overheating", "Performance bottlenecks", "Socket damage"],
    replacementDifficulty: "medium",
    averageCost: "$100-1000",
    toolsRequired: ["Thermal paste", "CPU cooler"],
    imageUrl: "/images/components/desktop-cpu.svg"
  },
  {
    name: "Desktop RAM",
    description: "Desktop memory modules (DIMM)",
    deviceType: "desktop",
    componentType: "memory",
    commonIssues: ["Blue screens", "Memory errors", "System instability"],
    replacementDifficulty: "easy",
    averageCost: "$30-300",
    toolsRequired: ["None - tool-free installation"],
    imageUrl: "/images/components/desktop-ram.svg"
  },
  {
    name: "Graphics Card",
    description: "Dedicated GPU for gaming and graphics processing",
    deviceType: "desktop",
    componentType: "graphics",
    commonIssues: ["Artifacts on screen", "Overheating", "Driver crashes"],
    replacementDifficulty: "easy",
    averageCost: "$150-2000",
    toolsRequired: ["Phillips screwdriver", "PCIe power cables"],
    imageUrl: "/images/components/desktop-gpu.svg"
  },
  {
    name: "Power Supply",
    description: "Converts AC power to DC power for computer components",
    deviceType: "desktop",
    componentType: "power",
    commonIssues: ["No power", "Shutdowns under load", "Loud fan noise"],
    replacementDifficulty: "medium",
    averageCost: "$50-300",
    toolsRequired: ["Phillips screwdriver", "Cable management"],
    imageUrl: "/images/components/desktop-psu.svg"
  },
  {
    name: "Motherboard",
    description: "Main circuit board connecting all components",
    deviceType: "desktop",
    componentType: "mainboard",
    commonIssues: ["Won't boot", "Component not detected", "Port failures"],
    replacementDifficulty: "hard",
    averageCost: "$100-500",
    toolsRequired: ["Full tool kit", "Thermal paste", "Cable management"],
    imageUrl: "/images/components/desktop-motherboard.svg"
  },
  {
    name: "Desktop Hard Drive",
    description: "Traditional spinning disk storage",
    deviceType: "desktop",
    componentType: "storage",
    commonIssues: ["Clicking noises", "Slow performance", "Bad sectors"],
    replacementDifficulty: "easy",
    averageCost: "$50-200",
    toolsRequired: ["SATA cables", "Phillips screwdriver"],
    imageUrl: "/images/components/desktop-hdd.svg"
  },
  {
    name: "SSD (Solid State Drive)",
    description: "Fast flash-based storage device",
    deviceType: "desktop",
    componentType: "storage",
    commonIssues: ["Sudden failure", "Performance degradation", "Not detected"],
    replacementDifficulty: "easy",
    averageCost: "$50-400",
    toolsRequired: ["SATA cables", "Phillips screwdriver"],
    imageUrl: "/images/components/desktop-ssd.svg"
  }
];

export async function seedDatabase() {
  try {
    console.log("Seeding repair guides...");
    for (const guide of comprehensiveRepairGuides) {
      await db.insert(repairGuides).values({
        ...guide,
        viewCount: Math.floor(Math.random() * 1000),
        isBookmarked: Math.random() > 0.8
      }).onConflictDoNothing();
    }

    console.log("Seeding troubleshooting flows...");
    for (const flow of comprehensiveTroubleshootingFlows) {
      const { category, ...flowData } = flow;
      await db.insert(troubleshootingFlows).values({
        ...flowData,
        type: category, // Map category to type field
        steps: flowData.steps.map(step => ({
          id: `step-${step.stepNumber}`,
          question: step.description,
          answers: [{
            text: step.solutions?.join(', ') || "Check solutions",
            nextStepId: step.stepNumber < flowData.steps.length ? `step-${step.stepNumber + 1}` : undefined
          }]
        }))
      }).onConflictDoNothing();
    }

    console.log("Seeding device components...");
    for (const component of comprehensiveDeviceComponents) {
      const { componentType, commonIssues, ...componentData } = component;
      await db.insert(deviceComponents).values({
        ...componentData,
        category: componentType, // Map componentType to category
        safetyNotes: commonIssues // Map commonIssues to safetyNotes
      }).onConflictDoNothing();
    }

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}