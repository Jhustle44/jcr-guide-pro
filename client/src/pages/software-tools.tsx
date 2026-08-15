import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import SoftwareLinks from "@/components/repair/software-links";

export default function SoftwareTools() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", name: "All Tools", icon: "apps" },
    { id: "diagnostics", name: "Hardware Diagnostics", icon: "monitor_heart" },
    { id: "recovery", name: "Data Recovery", icon: "restore" },
    { id: "security", name: "Security & Malware", icon: "security" },
    { id: "system", name: "System Utilities", icon: "settings" },
    { id: "drivers", name: "Driver Tools", icon: "update" },
  ];

  const allSoftware = [
    // Hardware Diagnostics
    {
      name: "HWiNFO64",
      description: "Comprehensive hardware analysis, monitoring, and reporting tool for system diagnostics",
      url: "https://www.hwinfo.com/",
      category: "diagnostics",
      icon: "monitor_heart",
      free: true,
      features: ["Real-time monitoring", "Detailed hardware info", "Sensor data logging"],
    },
    {
      name: "CrystalDiskInfo",
      description: "Monitor hard drive health with S.M.A.R.T. data analysis and temperature tracking",
      url: "https://crystalmark.info/en/software/crystaldiskinfo/",
      category: "diagnostics",
      icon: "storage",
      free: true,
      features: ["Health status", "Temperature monitoring", "S.M.A.R.T. analysis"],
    },
    {
      name: "MemTest86",
      description: "Industry-standard memory testing tool for detecting RAM defects and stability issues",
      url: "https://www.memtest86.com/",
      category: "diagnostics",
      icon: "memory",
      free: true,
      features: ["Boot from USB", "Comprehensive testing", "Error detection"],
    },
    {
      name: "GPU-Z",
      description: "Graphics card information utility with real-time monitoring and validation",
      url: "https://www.techpowerup.com/gpuz/",
      category: "diagnostics",
      icon: "videogame_asset",
      free: true,
      features: ["GPU specifications", "Real-time monitoring", "BIOS backup"],
    },
    {
      name: "Prime95",
      description: "CPU stress testing tool for stability testing and thermal validation",
      url: "https://www.mersenne.org/download/",
      category: "diagnostics",
      icon: "speed",
      free: true,
      features: ["CPU stress test", "Temperature monitoring", "Stability verification"],
    },
    
    // Data Recovery & Backup
    {
      name: "Recuva",
      description: "File recovery tool for deleted files from hard drives, memory cards, and USB drives",
      url: "https://www.ccleaner.com/recuva",
      category: "recovery",
      icon: "restore",
      free: true,
      features: ["Deleted file recovery", "Deep scan mode", "Secure deletion"],
    },
    {
      name: "PhotoRec",
      description: "Free data recovery software for lost files including photos, documents, and archives",
      url: "https://www.cgsecurity.org/wiki/PhotoRec",
      category: "recovery",
      icon: "photo_library",
      free: true,
      features: ["File carving", "Multiple formats", "Cross-platform"],
    },
    {
      name: "Clonezilla",
      description: "Free disk imaging and cloning solution for backup and system deployment",
      url: "https://clonezilla.org/",
      category: "recovery",
      icon: "content_copy",
      free: true,
      features: ["Disk cloning", "Image creation", "Network deployment"],
    },
    {
      name: "Macrium Reflect",
      description: "Professional disk imaging software with incremental backup and scheduling",
      url: "https://www.macrium.com/reflectfree",
      category: "recovery",
      icon: "backup",
      free: true,
      features: ["Disk imaging", "Incremental backup", "Boot rescue media"],
    },

    // Security & Malware
    {
      name: "Malwarebytes",
      description: "Advanced anti-malware protection with real-time threat detection",
      url: "https://www.malwarebytes.com/",
      category: "security",
      icon: "security",
      free: false,
      features: ["Real-time protection", "Malware removal", "Web protection"],
    },
    {
      name: "ESET Online Scanner",
      description: "Free online antivirus scanner for detecting and removing malware",
      url: "https://www.eset.com/us/home/online-scanner/",
      category: "security",
      icon: "verified_user",
      free: true,
      features: ["On-demand scanning", "No installation", "Cloud-based detection"],
    },
    {
      name: "RootkitRevealer",
      description: "Microsoft tool for detecting rootkits and other malicious software",
      url: "https://docs.microsoft.com/en-us/sysinternals/downloads/rootkitrevealer",
      category: "security",
      icon: "search",
      free: true,
      features: ["Rootkit detection", "System comparison", "Advanced scanning"],
    },

    // System Utilities
    {
      name: "Sysinternals Suite",
      description: "Microsoft's collection of advanced system utilities and troubleshooting tools",
      url: "https://docs.microsoft.com/en-us/sysinternals/",
      category: "system",
      icon: "settings",
      free: true,
      features: ["Process monitoring", "System analysis", "Registry tools"],
    },
    {
      name: "Nirsoft Utilities",
      description: "Collection of small utilities for Windows system analysis and troubleshooting",
      url: "https://www.nirsoft.net/",
      category: "system",
      icon: "build",
      free: true,
      features: ["Password recovery", "Network monitoring", "System information"],
    },
    {
      name: "CCleaner",
      description: "System cleaning and optimization tool for removing junk files and registry errors",
      url: "https://www.ccleaner.com/",
      category: "system",
      icon: "cleaning_services",
      free: true,
      features: ["Junk file cleanup", "Registry cleaning", "Startup management"],
    },
    {
      name: "TreeSize",
      description: "Disk space analyzer to visualize and manage storage usage",
      url: "https://www.jam-software.com/treesize/",
      category: "system",
      icon: "folder",
      free: true,
      features: ["Disk space analysis", "Visual representation", "File management"],
    },

    // Driver Tools
    {
      name: "DDU (Display Driver Uninstaller)",
      description: "Complete graphics driver removal tool for clean driver installations",
      url: "https://www.guru3d.com/files-details/display-driver-uninstaller-download.html",
      category: "drivers",
      icon: "cleaning_services",
      free: true,
      features: ["Clean driver removal", "Safe mode operation", "Multiple GPU support"],
    },
    {
      name: "DriverBooster",
      description: "Automatic driver update tool for keeping system drivers current",
      url: "https://www.iobit.com/en/driver-booster.php",
      category: "drivers",
      icon: "update",
      free: true,
      features: ["Automatic updates", "Driver backup", "Game optimization"],
    },
    {
      name: "Snappy Driver Installer",
      description: "Offline driver installer with comprehensive driver database",
      url: "https://sdi-tool.org/",
      category: "drivers",
      icon: "offline_bolt",
      free: true,
      features: ["Offline installation", "No internet required", "Driver packs"],
    },

    // Bootable Media & Recovery
    {
      name: "Rufus",
      description: "Create bootable USB drives for OS installation and system recovery",
      url: "https://rufus.ie/",
      category: "recovery",
      icon: "usb",
      free: true,
      features: ["Bootable USB creation", "ISO support", "UEFI/Legacy support"],
    },
    {
      name: "Hiren's BootCD PE",
      description: "Bootable rescue disk with comprehensive diagnostic and repair tools",
      url: "https://www.hirensbootcd.org/",
      category: "recovery",
      icon: "disc_full",
      free: true,
      features: ["Boot from USB/DVD", "Multiple tools included", "Windows PE based"],
    },
  ];

  const filteredSoftware = selectedCategory === "all" 
    ? allSoftware 
    : allSoftware.filter(software => software.category === selectedCategory);

  const handleDownload = (url: string, name: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 amoled:bg-black">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-8">
          <h1 className="text-2xl font-medium text-gray-900 dark:text-white mb-2">Software Tools</h1>
          <p className="text-gray-600 dark:text-gray-300">Essential diagnostic, repair, and recovery software for computer troubleshooting</p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category.id
                    ? "bg-primary-700 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <i className="material-icons text-sm">{category.icon}</i>
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Software Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSoftware.map((software, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-material hover:shadow-material-lg transition-shadow p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <i className={`material-icons text-primary-700 text-2xl`}>{software.icon}</i>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{software.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">{software.category}</span>
                      {software.free ? (
                        <span className="flex items-center text-xs text-success-600">
                          <i className="material-icons text-xs mr-1">check_circle</i>
                          Free
                        </span>
                      ) : (
                        <span className="flex items-center text-xs text-warning-700">
                          <i className="material-icons text-xs mr-1">paid</i>
                          Paid
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {software.description}
              </p>

              {software.features && (
                <div className="mb-4">
                  <h4 className="text-xs font-medium text-gray-900 dark:text-white mb-2">Key Features:</h4>
                  <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                    {software.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <i className="material-icons text-xs text-primary-700 mr-2">check</i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <button
                onClick={() => handleDownload(software.url, software.name)}
                className="w-full px-4 py-2 bg-primary-700 text-white text-sm rounded-lg hover:bg-primary-900 transition-colors flex items-center justify-center space-x-2"
              >
                <i className="material-icons text-sm">download</i>
                <span>Download / Visit</span>
              </button>
            </div>
          ))}
        </div>

        {/* Safety Information */}
        <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <i className="material-icons text-primary-700 text-2xl mt-1">info</i>
            <div>
              <h3 className="font-medium text-primary-900 dark:text-primary-300 mb-3">Important Safety Guidelines</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-primary-800 dark:text-primary-200">
                <div>
                  <h4 className="font-medium mb-2">Before Downloading:</h4>
                  <ul className="space-y-1">
                    <li>• Always download from official sources</li>
                    <li>• Check digital signatures when available</li>
                    <li>• Read user reviews and ratings</li>
                    <li>• Scan downloads with antivirus software</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Before Running Tools:</h4>
                  <ul className="space-y-1">
                    <li>• Create full system backup</li>
                    <li>• Close unnecessary programs</li>
                    <li>• Run as administrator when required</li>
                    <li>• Have recovery plan ready</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Contact Support Section */}
        <section className="mt-8 bg-white dark:bg-gray-800 amoled:bg-black rounded-xl shadow-material p-6">
          <div className="text-center">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-3 flex items-center justify-center">
              <i className="material-icons text-primary-700 mr-2">support_agent</i>
              Need Help Finding the Right Tool?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Can't find the software you need or need assistance with tool selection? Contact our app creator for personalized recommendations.
            </p>
            <a 
              href="mailto:JCRguideproofficial@gmail.com"
              className="inline-flex items-center bg-primary-700 hover:bg-primary-800 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              <i className="material-icons text-sm mr-2">email</i>
              Contact Support: JCRguideproofficial@gmail.com
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}